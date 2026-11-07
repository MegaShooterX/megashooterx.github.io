// Where the editor keeps its work on this computer: one folder, the same for
// every window that shows the editor. The Windows program and the pages the
// development server serves, at whatever address, all keep their projects,
// their tabs and every setting there, so that what is done in one is there in
// all the others. A browser keeps what a page stores apart for each address
// it was opened at; kept there, the same editor opened at two addresses was
// two editors, each with its own projects and its own settings.
//
// The folder holds `chaves/` (each thing kept, by its name, as text), `arquivos/`
// (the files of Promob a project came from, whole) and `carimbo`, the moment of
// the last change, which tells a window whether another one changed something
// since it last looked.
//
// Nothing written here is ever lost: before a thing kept is written over or taken away, what it was is put in
// `historico/<its name>/<the moment it was written>.txt` (`.bin` for a file of Promob), the last ones of each
// kept, so that any of them can be brought back.
//
// The editor's server (Vite, in development) answers `/_dados` with this, and
// the Windows program the same things through its bridge (see `preload.cjs`).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** The folder of the work of the program on this computer, where the program itself keeps it. */
export function defaultDataFolder() {
	const home = os.homedir();
	const base =
		process.platform === 'win32'
			? process.env.APPDATA || path.join(home, 'AppData', 'Roaming')
			: process.platform === 'darwin'
				? path.join(home, 'Library', 'Application Support')
				: process.env.XDG_CONFIG_HOME || path.join(home, '.config');
	return path.join(base, 'PraiaMob', 'dados');
}

/** The name of a file for a thing kept: letters, digits, `.`, `_` and `-` as they are, every other byte as `%XX`. */
function fileNameOf(key) {
	let name = '';
	for (const byte of new TextEncoder().encode(key)) {
		const char = String.fromCharCode(byte);
		name += /[A-Za-z0-9._-]/.test(char) ? char : `%${byte.toString(16).toUpperCase().padStart(2, '0')}`;
	}
	return name;
}

/** The thing kept a file is for, by its name. */
function keyOf(name) {
	try {
		return decodeURIComponent(name);
	} catch {
		return null;
	}
}

/** Waits so long, without letting anything else run: between tries at a file another program holds. */
function pause(milliseconds) {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

/** Makes a folder and those over it, one by one (the recursive call fails silently on some paths with accents). */
function makeFolder(folder) {
	if (fs.existsSync(folder)) return;
	makeFolder(path.dirname(folder));
	try {
		fs.mkdirSync(folder);
	} catch (error) {
		if (!fs.existsSync(folder)) throw error;
	}
}

/**
 * Writes a file whole: beside itself first, then put in its place, so that a
 * write cut short, or read halfway by another window, never leaves half a file.
 */
function writeWhole(file, data) {
	const beside = `${file}.${process.pid}.${Math.random().toString(36).slice(2)}.novo`;
	fs.writeFileSync(beside, data);
	for (let attempt = 0; ; attempt++) {
		try {
			fs.renameSync(beside, file);
			return;
		} catch (error) {
			// Held for a moment by another program, as an antivirus does with a file just written.
			if (attempt < 8) {
				pause(25 * (attempt + 1));
				continue;
			}
			try {
				fs.writeFileSync(file, data);
			} finally {
				fs.rmSync(beside, { force: true });
			}
			if (error && !fs.existsSync(file)) throw error;
			return;
		}
	}
}

/** How many earlier versions of each thing kept are kept; of a file of Promob, which is large, fewer. */
const HISTORY_KEPT = 60;
const ARCHIVE_HISTORY_KEPT = 4;
/**
 * What is written again every few seconds (the stage of a window, the project of a tab as it is worked on) keeps an
 * earlier version at most this often, so that its history reaches back hours and not minutes.
 */
const OFTEN = /^(praiamob\.palco\.|furniturecad\.autosave)/;
const OFTEN_EVERY = 2 * 60_000;

/** The things kept in a folder, one file each, with what is in each of them. */
export function createDataStore(folder = defaultDataFolder()) {
	const keys = path.join(folder, 'chaves');
	const archives = path.join(folder, 'arquivos');
	const history = path.join(folder, 'historico');
	const stampFile = path.join(folder, 'carimbo');
	makeFolder(keys);
	makeFolder(archives);
	makeFolder(history);

	/**
	 * Puts what a file holds now in its history, before it is written over or taken away: unless it is what the last
	 * version kept already holds, or, for what is written again every few seconds, one was kept a moment ago. The
	 * oldest go once there are more than `most`.
	 */
	function keepAside(file, name, key, most) {
		try {
			if (!fs.existsSync(file)) return;
			const place = path.join(history, name);
			makeFolder(place);
			const extension = path.extname(file);
			const versions = fs
				.readdirSync(place)
				.filter((each) => each.endsWith(extension))
				.sort((a, b) => Number(a.slice(0, -extension.length)) - Number(b.slice(0, -extension.length)));
			const now = fs.readFileSync(file);
			const last = versions.at(-1);
			if (last) {
				const lastAt = Number(last.slice(0, -extension.length));
				if (OFTEN.test(key) && Date.now() - lastAt < OFTEN_EVERY) return;
				if (fs.readFileSync(path.join(place, last)).equals(now)) return;
			}
			writeWhole(path.join(place, `${Math.round(fs.statSync(file).mtimeMs)}${extension}`), now);
			for (const old of versions.slice(0, Math.max(0, versions.length + 1 - most))) fs.rmSync(path.join(place, old), { force: true });
		} catch {
			// The history is kept as far as it can be; the write itself goes on all the same.
		}
	}
	// What a write that was cut short left beside a file.
	for (const place of [folder, keys, archives]) {
		for (const name of fs.readdirSync(place)) {
			if (!name.endsWith('.novo')) continue;
			try {
				if (Date.now() - fs.statSync(path.join(place, name)).mtimeMs > 60_000) fs.rmSync(path.join(place, name), { force: true });
			} catch {
				// Gone already.
			}
		}
	}

	/** The moment of the last change, as a count of milliseconds; nought before the first. */
	function stamp() {
		try {
			return Number(fs.readFileSync(stampFile, 'utf8')) || 0;
		} catch {
			return 0;
		}
	}

	/** Marks a change: says what the moment of the last change was before it, and what it is now. */
	function changed() {
		const before = stamp();
		const now = Math.max(Date.now(), before + 1);
		writeWhole(stampFile, String(now));
		return { antes: before, carimbo: now };
	}

	return {
		folder,
		stampFile,
		/** Everything kept, by name, and the moment of the last change. */
		read() {
			const chaves = {};
			/** When each was last written, in milliseconds: for the cloud to be told which is newer, here or there. */
			const momentos = {};
			for (const name of fs.readdirSync(keys)) {
				if (!name.endsWith('.txt')) continue;
				const key = keyOf(name.slice(0, -'.txt'.length));
				if (key === null) continue;
				try {
					const file = path.join(keys, name);
					chaves[key] = fs.readFileSync(file, 'utf8');
					momentos[key] = Math.round(fs.statSync(file).mtimeMs);
				} catch {
					// Taken away while it was being read.
				}
			}
			return { chaves, momentos, carimbo: stamp() };
		},
		/**
		 * Keeps each thing given, or takes it away where it is given as `null`. `quiet`, for what is a window's own
		 * (the tab in front of it), it is kept without marking a change: no other window loads again for it.
		 */
		write(changes, quiet = false) {
			for (const [key, text] of Object.entries(changes ?? {})) {
				const name = fileNameOf(key);
				const file = path.join(keys, `${name}.txt`);
				if (text !== null && typeof text !== 'string') continue;
				// Written again as it is, it is not written: nothing changes, and no earlier version is needed.
				try {
					if (text !== null && fs.readFileSync(file, 'utf8') === text) continue;
				} catch {
					// Not there yet.
				}
				keepAside(file, name, key, HISTORY_KEPT);
				if (text === null) fs.rmSync(file, { force: true });
				else writeWhole(file, text);
			}
			if (!quiet) return changed();
			const now = stamp();
			return { antes: now, carimbo: now };
		},
		/** The file of Promob a tab's project came from, as it was kept; `null` for none. */
		readArchive(slot) {
			try {
				return fs.readFileSync(path.join(archives, `${fileNameOf(slot)}.bin`));
			} catch {
				return null;
			}
		},
		/**
		 * Keeps the file of Promob a tab's project came from, or forgets it when given none. A tab is one window's
		 * own: no other window loads again for it.
		 */
		writeArchive(slot, bytes) {
			const name = fileNameOf(slot);
			const file = path.join(archives, `${name}.bin`);
			keepAside(file, `arquivo-${name}`, slot, ARCHIVE_HISTORY_KEPT);
			if (bytes === null) fs.rmSync(file, { force: true });
			else writeWhole(file, bytes);
			const now = stamp();
			return { antes: now, carimbo: now };
		},
		/** The moment of the last change. */
		state() {
			return { carimbo: stamp() };
		},
		/** Calls back whenever anything kept changes, by this process or by another (looked at every second). */
		watch(told) {
			fs.watchFile(stampFile, { interval: 1000 }, (now, before) => {
				if (now.mtimeMs !== before.mtimeMs) told();
			});
		}
	};
}

/** What a request asked to the server carries: the whole of it. */
function bodyOf(request) {
	return new Promise((resolve, reject) => {
		const parts = [];
		request.on('data', (part) => parts.push(part));
		request.on('end', () => resolve(Buffer.concat(parts)));
		request.on('error', reject);
	});
}

/**
 * Answers `/_dados` for the development server: `GET /_dados` everything kept,
 * with the moment of the last change and of the last version announced (the
 * time of `releaseFile`); `GET /_dados/estado` those two moments; `POST
 * /_dados` with `{ mudancas }` keeps them; `/_dados/arquivo/<tab>` the file of
 * Promob of a tab, read (`GET`), kept (`PUT`) or forgotten (`DELETE`). Says
 * whether the request was one of these.
 */
export function answerData(store, request, response, releaseFile) {
	const address = new URL(request.url ?? '/', 'http://editor');
	if (address.pathname !== '/_dados' && !address.pathname.startsWith('/_dados/')) return false;
	const send = (status, body, type = 'application/json') => {
		response.statusCode = status;
		response.setHeader('Content-Type', type);
		response.setHeader('Cache-Control', 'no-store');
		response.end(body);
	};
	const json = (value) => send(200, JSON.stringify(value));
	const version = () => {
		try {
			return fs.statSync(releaseFile).mtimeMs;
		} catch {
			return 0;
		}
	};
	const run = async () => {
		const method = request.method ?? 'GET';
		if (address.pathname === '/_dados' && method === 'GET') return json({ praiamob: 1, ...store.read(), versao: version() });
		if (address.pathname === '/_dados/estado') return json({ ...store.state(), versao: version() });
		if (address.pathname === '/_dados' && method === 'POST') {
			const asked = JSON.parse((await bodyOf(request)).toString('utf8'));
			return json(store.write(asked?.mudancas ?? {}, asked?.quieto === true));
		}
		if (address.pathname.startsWith('/_dados/arquivo/')) {
			const slot = decodeURIComponent(address.pathname.slice('/_dados/arquivo/'.length));
			if (method === 'GET') {
				const bytes = store.readArchive(slot);
				return bytes ? send(200, bytes, 'application/octet-stream') : send(404, '');
			}
			if (method === 'PUT') return json(store.writeArchive(slot, await bodyOf(request)));
			if (method === 'DELETE') return json(store.writeArchive(slot, null));
		}
		send(404, '');
	};
	run().catch((error) => send(500, String(error), 'text/plain'));
	return true;
}
