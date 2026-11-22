// Um arquivo do SketchUp (SKP) lido pelo SketchUp instalado no PC (G8, 20/11/2026): o editor manda os bytes para
// `/_skp` (no servidor de desenvolvimento e no programa do Windows), eles vão para uma pasta temporária, o
// `ler-skp.ps1` roda escondido (sem janela) e devolve o modelo em JSON (faces em milímetros, grupos, componentes e
// camadas). Sem SketchUp no PC, ou fora do Windows, volta `{"erro": ...}` e o editor diz isso.

import { execFile } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { mkdtemp, readFile, rmdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Onde fica o `ler-skp.ps1`: ao lado deste arquivo (no programa instalado, fora do pacote). */
const here = dirname(fileURLToPath(import.meta.url)).replace(/app\.asar([\\/])/, 'app.asar.unpacked$1');
/** Quanto a leitura pode levar: um projeto grande do arquiteto leva segundos; mais que isto, desistiu. */
const WAIT = 5 * 60 * 1000;

/** Uma resposta em JSON: o texto já lido do arquivo, como está, ou um objeto escrito. */
const json = (body) => ({
	status: 200,
	type: 'application/json; charset=utf-8',
	body: body instanceof Uint8Array ? Buffer.from(body) : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body))
});

/** Se há um SketchUp instalado com o leitor dele (o mesmo lugar que o `ler-skp.ps1` procura). */
export function hasSketchup() {
	if (process.platform !== 'win32') return false;
	for (const base of [process.env.ProgramFiles, process.env.ProgramW6432]) {
		const folder = base && join(base, 'SketchUp');
		if (!folder || !existsSync(folder)) continue;
		try {
			if (readdirSync(folder).some((version) => existsSync(join(folder, version, 'SketchUpAPI.dll')))) return true;
		} catch {
			// Sem acesso à pasta: como se não houvesse.
		}
	}
	return false;
}

/** A resposta a `/_skp` sem arquivo: se este PC lê SKP. */
export const skpReady = () => json({ sketchup: hasSketchup() });

/** Lê os bytes de um SKP; devolve a resposta para a página: o modelo em JSON, ou `{"erro": ...}`. */
export async function readSkp(bytes) {
	if (process.platform !== 'win32') return json({ erro: 'so-windows' });
	const folder = await mkdtemp(join(tmpdir(), 'praiamob-skp-'));
	const model = join(folder, 'modelo.skp');
	const out = join(folder, 'modelo.json');
	try {
		await writeFile(model, bytes);
		const shell = join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
		await new Promise((done) => {
			execFile(
				shell,
				['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', join(here, 'ler-skp.ps1')],
				// Sem janela: nada aparece sobre o que ele está fazendo.
				{ windowsHide: true, timeout: WAIT, env: { ...process.env, SKP_ARQUIVO: model, SKP_SAIDA: out }, maxBuffer: 4 * 1024 * 1024 },
				() => done()
			);
		});
		try {
			return json(await readFile(out));
		} catch {
			return json({ erro: 'falhou' });
		}
	} finally {
		// Uma a uma: apagar a pasta de uma vez falha calado em caminhos com acento.
		for (const file of [model, out]) await unlink(file).catch(() => {});
		await rmdir(folder).catch(() => {});
	}
}
