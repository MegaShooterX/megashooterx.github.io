// The desktop program: a window that shows the editor from the files installed with it.
//
// Written to run on the current Electron and on Electron 22 alike, the last one that
// runs on Windows 7 and 8: no API newer than that is used without a fallback.

const { app, BrowserWindow, ipcMain, Menu, net, protocol, shell } = require('electron');
const { execFile, spawn, spawnSync } = require('node:child_process');
const { Worker } = require('node:worker_threads');
const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { editorAt, closeEditor, buildOf, packWriter } = require('./pacote.cjs');

// The files the program opens: its own, which is an archive Promob opens too; one of Promob's; and the text it saved before.
const PROJECT_EXTENSIONS = ['.praiamob', '.promob', '.projx'];
/** Which of the project files a path is, by its ending; `null` for any other file. */
const projectKindOf = (file) => PROJECT_EXTENSIONS.find((extension) => file.toLowerCase().endsWith(extension)) ?? null;
// The editor keeps its work in the storage of the page it is served from, so that
// address must never change between runs and versions.
const SCHEME = 'app';
const HOME = `${SCHEME}://editor/`;
// Installed, the editor's files lie beside the program, or, newer, where the program fetched them since (see
// `followSite`); run from source, beside this file.
/**
 * Run from the Drive, the project keeps what is built in a folder of this computer outside it (see
 * `ferramentas/dependencias.mjs`, whose choice of folder this repeats): the editor the program shows and the lock of
 * its build are there. A copy with its own `node_modules` keeps them beside this file, as always.
 */
const OUTSIDE = (() => {
	if (app.isPackaged || fs.existsSync(path.join(__dirname, '..', 'node_modules'))) return null;
	const deps =
		process.env.PRAIAMOB_DEPS ||
		['D:\\tools', 'C:\\tools'].filter((folder) => process.platform === 'win32' && fs.existsSync(folder)).map((folder) => path.join(folder, 'deps', 'PraiaMob'))[0] ||
		path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache'), 'PraiaMob-deps');
	return fs.existsSync(path.join(deps, 'node_modules')) ? path.join(deps, 'montado') : null;
})();
// Installed, the editor is one file of the program (`resources/editor.pak`, see `pacote.cjs`); an installer of
// before it had it as a folder of files (`resources/site`).
const INSTALLED_SITE = app.isPackaged
	? (['editor.pak', 'site'].map((name) => path.join(process.resourcesPath, name)).find((place) => fs.existsSync(place)) ?? path.join(process.resourcesPath, 'editor.pak'))
	: OUTSIDE
		? path.join(OUTSIDE, 'site')
		: path.join(__dirname, 'site');
let SITE = INSTALLED_SITE;

// The program says what it is as itself, not as the engine it is made with.
app.userAgentFallback = app.userAgentFallback.replace(/\sElectron\/\S+/i, '');

/**
 * The tools that look inside the page, for whoever helps find out what went wrong: F12 run from the code; installed,
 * only Ctrl+Alt+Shift+F12, which nobody presses by chance.
 */
/**
 * Opens an address in the computer's own browser. Never from a copy started to be tried out, hidden or apart from the
 * work (a check, `--sem-janela`, `--user-data-dir`): it starts with no account and would send the person at the
 * computer to sign in with Google, again and again, for a program they did not open.
 */
function openOutside(address) {
	if (smokeReport || unseen || app.commandLine.hasSwitch('user-data-dir')) return Promise.resolve(false);
	return shell.openExternal(address).then(
		() => true,
		() => false
	);
}

/** The page the sign-in by Google comes back to in the browser (see `signInOutside`): it hands the program what came after the `#`. */
const SIGNED_IN_PAGE = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>PraiaMob</title><meta name="color-scheme" content="light dark">
<style>body{margin:0;height:100vh;display:grid;place-items:center;font:16px system-ui,'Segoe UI',sans-serif}</style></head>
<body><p id="said">Entrando no PraiaMob…</p>
<script>
var said = location.hash.slice(1) || location.search.slice(1);
history.replaceState(null, '', location.pathname);
fetch(location.pathname, { method: 'POST', body: said })
	.then(function (answer) { return answer.text(); })
	.then(function (text) { document.getElementById('said').textContent = text; })
	.catch(function () { document.getElementById('said').textContent = 'O PraiaMob não está mais esperando. Entre de novo por ele.'; });
</script></body></html>`;

/**
 * Signs in to the cloud by Google in the computer's own browser: Google turns away the browsers built into programs
 * ("Esse navegador ou app pode não ser seguro"). The cloud's address for it comes back to an address of this program
 * on this computer alone (`127.0.0.1`, which the cloud lets it come back to, at a door and a path made for this one),
 * whose page hands the program what Google gave after the `#`. Gives that, with the account; `null` when it came back
 * without one, or `give up` was called (asked again, or nothing came back in ten minutes).
 */
function signInOutside(address, open) {
	let giveUp = () => {};
	const done = new Promise((resolve) => {
		const at = `/${crypto.randomBytes(16).toString('hex')}`;
		let ended = false;
		const end = (said) => {
			if (ended) return;
			ended = true;
			clearTimeout(timer);
			resolve(said);
			server.close();
		};
		const server = http.createServer((request, response) => {
			const asked = new URL(request.url ?? '/', 'http://127.0.0.1');
			if (asked.pathname !== at || ended) {
				response.writeHead(404, { Connection: 'close' }).end();
				return;
			}
			if (request.method === 'GET') {
				response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', Connection: 'close' }).end(SIGNED_IN_PAGE);
				return;
			}
			let said = '';
			request.setEncoding('utf8');
			request.on('data', (part) => {
				said += part;
				if (said.length > 32768) request.destroy();
			});
			request.on('end', () => {
				const taken = /(^|&)access_token=/.test(said) && /(^|&)refresh_token=/.test(said);
				response.on('finish', () => end(taken ? said : null));
				response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', Connection: 'close' });
				response.end(taken ? 'Pronto. Pode voltar ao PraiaMob.' : 'Não entrou. Tente de novo pelo PraiaMob.');
			});
		});
		const timer = setTimeout(() => end(null), 10 * 60_000);
		giveUp = () => {
			end(null);
			server.closeAllConnections?.();
		};
		server.on('error', () => end(null));
		server.listen(0, '127.0.0.1', () => {
			const away = new URL(address);
			away.searchParams.set('redirect_to', `http://127.0.0.1:${server.address().port}${at}`);
			void open(away.href).then((opened) => {
				if (!opened) end(null);
			});
		});
	});
	return { done, giveUp: () => giveUp() };
}

const devTools = (input) => input.type === 'keyDown' && input.key === 'F12' && (!app.isPackaged || (input.control && input.alt && input.shift));

// Old machines are what this has to run on. A graphics card the browser engine does not
// trust is still far faster than drawing on the processor, and where there is no usable
// card at all the processor must be allowed to draw.
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-unsafe-swiftshader');
// The page that stops responding can be asked what it was running (see `reportStopped`).
app.commandLine.appendSwitch('enable-features', 'DocumentPolicyIncludeJSCallStacksInCrashReports');

protocol.registerSchemesAsPrivileged([
	{ scheme: SCHEME, privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }
]);

/** `--smoke=<file>`: open, check that the editor came up and can draw, write what was found, and quit. */
const smokeReport = process.argv.find((arg) => arg.startsWith('--smoke='))?.slice('--smoke='.length);
/** A copy started to be tried out that never shows its window, so as never to come in front of what is open (`--sem-janela`). */
const unseen = process.argv.includes('--sem-janela');
/**
 * Installed from the Microsoft Store (`npm run loja`): the Store installs, updates and takes the program away, keeps its
 * shortcuts and names it on the bar, so none of the program's own installer, updates of itself or mending of shortcuts
 * runs. The editor still comes from the site, as in every copy (see `followSite`).
 */
const STORE = process.windowsStore === true;
// A check works in a place of its own: it must never touch the work the user has in the program.
if (smokeReport) app.setPath('userData', fs.mkdtempSync(path.join(app.getPath('temp'), 'furniturecad-check-')));
// The program was first called FurnitureCAD, then MovelCAD. Whoever had it under one of those
// names finds their project and their own furniture where they left them: that folder is taken
// over, but only while the program has kept nothing under its own name yet. Once it has, that is
// where its work is, and it never goes back to an older folder.
const ownData = app.getPath('userData');
const formerData = ['FurnitureCAD', 'MovelCAD'].map((name) => path.join(app.getPath('appData'), name)).find((folder) => fs.existsSync(folder));
/** Whether the program kept anything under its own name: its work, or what the engine keeps (here or, since, apart). */
const keptOwn = () =>
	['Local Storage', 'dados'].some((name) => fs.existsSync(path.join(ownData, name))) ||
	fs.existsSync(path.join(process.env.LOCALAPPDATA || ownData, 'PraiaMob', 'navegador'));
// Unless it was started to keep its work somewhere else, as when it is tried out apart from the user's own.
if (!smokeReport && formerData && !keptOwn() && !app.commandLine.hasSwitch('user-data-dir')) app.setPath('userData', formerData);

/**
 * The program's own folder on this computer, for what is not the work: what the engine keeps for itself (its caches,
 * the storage of the page, the state of the network), the cache of Promob's library, the reports waiting to go and,
 * where the folder it is installed in cannot be written, the editors fetched from the site. In %LOCALAPPDATA%, as
 * programs keep what is theirs alone, so that the folder of the work (%APPDATA%\PraiaMob) holds the work and nothing
 * else. A copy tried out apart keeps it inside its own folder; a check, in its own.
 */
const LOCAL = smokeReport
	? app.getPath('userData')
	: app.commandLine.hasSwitch('user-data-dir')
		? path.join(app.getPath('userData'), 'local')
		: path.join(process.env.LOCALAPPDATA || app.getPath('userData'), 'PraiaMob');

/** Copies a folder entry by entry (Node's recursive copy gives up on paths with accents, as "Móveis"). */
function copyTree(from, to) {
	fs.mkdirSync(to, { recursive: true });
	for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
		if (entry.isDirectory()) copyTree(path.join(from, entry.name), path.join(to, entry.name));
		else fs.copyFileSync(path.join(from, entry.name), path.join(to, entry.name));
	}
}

/** Takes a file or a folder away entry by entry (as `copyTree`); what cannot be taken away now stays. */
function removeTree(at) {
	try {
		if (fs.statSync(at).isDirectory()) {
			for (const name of fs.readdirSync(at)) removeTree(path.join(at, name));
			fs.rmdirSync(at);
		} else fs.unlinkSync(at);
	} catch {
		// In use, or gone already.
	}
}

/**
 * What the engine kept beside the work, before it had a place of its own: the storage of the page is taken over
 * (the program finds what it kept there), the reports waiting to go too, and the rest (caches, the editors fetched
 * before into this folder, which the program installed brings newer) taken away. Done once, before the engine starts.
 */
function moveEngineData(session) {
	if (smokeReport || fs.existsSync(session)) return;
	const from = app.getPath('userData');
	try {
		fs.mkdirSync(session, { recursive: true });
		for (const name of ['Local Storage', 'IndexedDB', 'Session Storage', 'WebStorage']) {
			if (fs.existsSync(path.join(from, name))) copyTree(path.join(from, name), path.join(session, name));
		}
		if (fs.existsSync(path.join(from, 'relatos-pendentes.json'))) fs.copyFileSync(path.join(from, 'relatos-pendentes.json'), path.join(LOCAL, 'relatos-pendentes.json'));
	} catch {
		// Not taken over: the engine starts afresh there, and the work (in `dados`) is all there as it was.
		return;
	}
	const engine = /^(Cache|Code Cache|GPUCache|GrShaderCache|ShaderCache|GPUPersistentCache|DawnGraphiteCache|DawnWebGPUCache|DawnCache|blob_storage|Network|Shared Dictionary|SharedStorage|Service Worker|Trust Tokens|DIPS.*|Local State|Preferences|Local Storage|IndexedDB|Session Storage|WebStorage|Crashpad|DevToolsActivePort|declarative_performance_observer\.db.*|promob-cache|editor|montagem\.json|relatos-pendentes\.json)$/;
	for (const name of fs.readdirSync(from)) if (engine.test(name)) removeTree(path.join(from, name));
}

if (!smokeReport) {
	const session = path.join(LOCAL, 'navegador');
	moveEngineData(session);
	app.setPath('sessionData', session);
}

const NAME = 'PraiaMob';
// The mark of the program, for its window and the bar of the system: an executable installed
// carries it in itself, but run from its code the engine would show its own.
const ICON = path.join(__dirname, 'icons', process.platform === 'win32' ? 'icon.ico' : 'icon.png');
// Run from its code, the mark as Windows reads it for the bar: the copy the shortcuts show (see `keepShortcutIcons`).
// Installed, nothing is said: the executable carries the mark, and Windows shows it by itself.
let shortcutIcon = null;
// Windows groups the windows of a program, and names them on its bar, by this.
const APP_ID = 'br.com.praiamar.furniturecad';
// From the Store, Windows knows the program by its package: another name would part its windows from its shortcuts.
if (process.platform === 'win32' && !STORE) app.setAppUserModelId(APP_ID);

/**
 * Says to the bar of Windows what the button of this window is: the mark of the program, its
 * name, and how to start it again. Without it, run from its code, the button would be the
 * engine's, and fixed to the bar it would start the engine by itself instead of the program.
 * Started again from there while it runs, it is the window already open that comes forward.
 */
function nameOnTaskbar(target) {
	// Installed, the executable is the program, with its mark, and its shortcuts say its group: Windows needs no word.
	// (A word that pointed into the program's archive, which Windows cannot read, left the bar blank.)
	if (app.isPackaged || process.platform !== 'win32' || typeof target.setAppDetails !== 'function') return;
	const quoted = (text) => `"${text}"`;
	target.setAppDetails({
		appId: APP_ID,
		appIconPath: shortcutIcon ?? path.join(__dirname, 'icons', 'icon.ico'),
		appIconIndex: 0,
		relaunchCommand: app.isPackaged ? quoted(process.execPath) : `${quoted(process.execPath)} ${quoted(__dirname)}`,
		relaunchDisplayName: NAME
	});
}

/** Tells Windows the icons of the program's shortcuts changed: it reads them again, its cache of icons too. */
function refreshShellIcons() {
	try {
		const command = [
			"Add-Type -MemberDefinition '[DllImport(\"shell32.dll\")] public static extern void SHChangeNotify(int e, uint f, IntPtr a, IntPtr b);' -Name Shell -Namespace PraiaMob",
			'[PraiaMob.Shell]::SHChangeNotify(0x08000000, 0x1000, [IntPtr]::Zero, [IntPtr]::Zero)',
			"$refresh = Join-Path $env:SystemRoot 'System32\\ie4uinit.exe'",
			"if (Test-Path $refresh) { Start-Process -FilePath $refresh -ArgumentList '-show' -WindowStyle Hidden }"
		].join('; ');
		// Not `detached`: without a console Windows PowerShell does nothing at all (see `startOutlasting`).
		spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-Command', command], {
			stdio: 'ignore',
			windowsHide: true
		})
			.on('error', () => {})
			.unref();
	} catch {
		// Windows reads them again in its own time.
	}
}

/**
 * Mends the shortcuts to the program whose icon is broken, the one fixed to the bar above all, which Windows shows
 * for the open window too: a blank picture there reads as a program that fell. None is made where there was none,
 * and one whose icon is good is left as it is (Windows remembers an icon by its path: pointed elsewhere again, it
 * would show what it remembered). Installed, a shortcut to the program shows the executable's mark; run from its
 * code, a copy of the icon named by what is in it (see `scripts/shortcut.ps1`), put back when it was taken away.
 * Says which icon the shortcuts show; `null` where it cannot tell.
 */
function keepShortcutIcons() {
	if (process.platform !== 'win32' || STORE || smokeReport || unseen || typeof shell.readShortcutLink !== 'function') return null;
	try {
		let wanted = process.execPath;
		let good = (icon) => !icon || (!/\.asar[\\/]/i.test(icon) && fs.existsSync(icon));
		if (!app.isPackaged) {
			const mark = fs.readFileSync(path.join(__dirname, 'icons', 'icon.ico'));
			const folder = path.join(process.env.LOCALAPPDATA || app.getPath('appData'), 'PraiaMob', 'icons');
			const prefix = `praiamob-${crypto.createHash('sha256').update(mark).digest('hex').slice(0, 12)}`;
			fs.mkdirSync(folder, { recursive: true });
			const there = fs.readdirSync(folder).find((name) => name.startsWith(prefix) && name.endsWith('.ico'));
			wanted = path.join(folder, there ?? `${prefix}.ico`);
			if (!there) fs.writeFileSync(wanted, mark);
			good = (icon) => Boolean(icon) && path.basename(icon).startsWith(prefix) && fs.existsSync(icon);
		}
		const places = [
			app.getPath('desktop'),
			path.join(app.getPath('appData'), 'Microsoft', 'Windows', 'Start Menu', 'Programs'),
			path.join(app.getPath('appData'), 'Microsoft', 'Internet Explorer', 'Quick Launch', 'User Pinned', 'TaskBar')
		];
		// Run from its code, a shortcut of the program is the engine started on the program's folder. The project moved,
		// the shortcuts made before point at an engine or a folder that is gone: one fixed to the bar, which no script
		// can fix there again, would be taken off by Windows. Each is pointed at where the program is now.
		const gone = (target, args) => {
			if (app.isPackaged || path.basename(target || '').toLowerCase() !== 'electron.exe') return false;
			const folder = /^\s*"([^"]+)"/.exec(args || '')?.[1] ?? (args || '').trim();
			if (!fs.existsSync(target)) return true;
			return Boolean(folder) && !fs.existsSync(path.join(folder, 'main.cjs'));
		};
		const ours = (name) => /^(PraiaMob|MóvelCAD|MovelCAD)\.lnk$/i.test(name);
		let mended = false;
		for (const place of places) {
			let names = [];
			try {
				names = fs.readdirSync(place).filter((name) => name.toLowerCase().endsWith('.lnk'));
			} catch {
				continue;
			}
			for (const name of names) {
				const link = path.join(place, name);
				try {
					const read = shell.readShortcutLink(link);
					if (ours(name) && gone(read.target, read.args)) {
						shell.writeShortcutLink(link, 'update', {
							target: process.execPath,
							args: `"${__dirname}"`,
							cwd: __dirname,
							icon: wanted,
							iconIndex: 0,
							appUserModelId: APP_ID
						});
						mended = true;
						continue;
					}
					if (path.resolve(read.target || '').toLowerCase() !== process.execPath.toLowerCase()) continue;
					if (good(read.icon)) continue;
					shell.writeShortcutLink(link, 'update', { icon: wanted, iconIndex: 0 });
					mended = true;
				} catch {
					// One that cannot be read is another program's, or broken past mending.
				}
			}
		}
		if (mended) refreshShellIcons();
		return wanted;
	} catch {
		return null;
	}
}

/** The build of the editor shown now: its version, when it was made, and what was new in it (see `scripts/site.mjs`). */
function buildThere() {
	try {
		const { version, built, note, commit } = buildOf(SITE) ?? {};
		return typeof built === 'string'
			? { version: String(version), built, note: typeof note === 'string' ? note : '', commit: typeof commit === 'string' ? commit : null }
			: null;
	} catch {
		return null;
	}
}

/** The build the window is showing: the one that was there when its page last began to load. */
let shown = null;
/** The build the editor was last told about, so it is told of each one once. */
let told = null;

/**
 * The version of the program as people know it (0.0.17, or 0.0.17.1 for a hotfix): installed, the one of the folder of
 * its code that runs (see `carregador.cjs`), which publicar.mjs writes in it; run from its code, the version of its
 * package. Never the number it is published under for the updater (`0.17.100`, see `programNumber` there).
 */
const PROGRAM_VERSION = (() => {
	const running = global.praiamobPrograma?.versao;
	if (typeof running === 'string' && running !== '0.0.0') return running;
	try {
		const own = require('./package.json');
		return typeof own.shortVersion === 'string' ? own.shortVersion : app.getVersion();
	} catch {
		return app.getVersion();
	}
})();

/** Which build the window shows, for its title: the version and the day and hour it was made. */
function buildName() {
	if (!shown) return PROGRAM_VERSION;
	const day = new Date(shown.built);
	const two = (value) => String(value).padStart(2, '0');
	return `${shown.version} · ${two(day.getDate())}/${two(day.getMonth() + 1)}/${day.getFullYear()} ${two(day.getHours())}:${two(day.getMinutes())}`;
}

/**
 * Where the update of the editor stands, as the editor shows it by the cloud: nothing to do (`idle`), a build being
 * made in the background and how far it has got (`building`, `progress` from 0 to 1), or a build ready, waiting for
 * the program to be restarted (`ready`). Nothing is ever shown in the way of the work.
 */
let update = { state: 'idle', progress: 0, note: '' };
/** The build that is ready to be shown, by when it was made: once the window shows it, there is nothing to offer. */
let readyBuilt = null;
function tellUpdate(next, built = null) {
	update = next;
	if (next.state === 'ready') readyBuilt = built;
	window?.webContents.send('desktop:update', update);
}

/**
 * Tells the editor when a newer build than the one it shows has arrived in its folder, made by this program or by
 * whoever works on the code. The window never loads it by itself: the editor offers to restart, by the cloud.
 */
function watchBuilds() {
	setInterval(() => {
		const there = buildThere();
		if (!window || !there || !shown || there.built === shown.built || there.built === told) return;
		told = there.built;
		if (!building) tellUpdate({ state: 'ready', progress: 1, note: there.note, version: there.version }, there.built);
		window.webContents.send('desktop:new-build', there);
	}, 3000);
}

/** How long the last build took, to tell how far the one under way has got: kept in the program's own folder. */
const TOOK = () => path.join(LOCAL, 'montagem.json');
function lastTook() {
	try {
		const { took } = JSON.parse(fs.readFileSync(TOOK(), 'utf8'));
		return typeof took === 'number' && took > 5000 ? took : 60_000;
	} catch {
		return 60_000;
	}
}

/**
 * How far a build has got by what it has said: the editor built (twice, the page and what renders it), written out,
 * copied into the program, stamped. Between them, the time it has taken against the time the last one took.
 */
const STAGES = [
	[/built in/g, [0.45, 0.7]],
	[/Wrote site/, [0.82]],
	[/Editor in /, [0.94]],
	[/^Build /m, [0.98]]
];

// Run from the code it is made of, the program follows that code: each time a version is
// announced as ready (a line written to `.dev-release`, as for the pages open in a browser),
// and each time a change is committed, announced or not, the editor is built again into the
// folder this program shows it from.
const SOURCE = path.join(__dirname, '..', 'apps', 'web');
const REPOSITORY = path.join(__dirname, '..');
const ANNOUNCED = path.join(SOURCE, '.dev-release');
/** Held by a build of the editor while it runs, by this program or by whoever works on the code (see `scripts/site.mjs`). */
const BUILD_LOCK = OUTSIDE ? path.join(OUTSIDE, 'site.lock') : path.join(__dirname, 'site.lock');

/** Whether a build of the editor is under way right now, in this program or in another process. */
function buildUnderWay() {
	try {
		return Date.now() - fs.statSync(BUILD_LOCK).mtimeMs < 10 * 60 * 1000;
	} catch {
		return false;
	}
}
/** The commit the code is at, as the build writes it down (`scripts/site.mjs`); `null` where git cannot tell. */
function commitNow() {
	try {
		const said = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: REPOSITORY, encoding: 'utf8', windowsHide: true });
		return said.status === 0 ? said.stdout.trim() : null;
	} catch {
		return null;
	}
}

/** The same, asked without holding the program up while git answers. */
function commitLater() {
	return new Promise((resolve) => {
		execFile('git', ['rev-parse', '--short', 'HEAD'], { cwd: REPOSITORY, windowsHide: true }, (error, said) => resolve(error ? null : String(said).trim()));
	});
}

/** The build under way, as a promise of its end; `null` between builds. */
let building = null;
let again = false;
/** Builds that failed one after the other: each is tried again a minute later, a few times, the build there staying as it was. */
let failures = 0;
const RETRIES = 10;
let retry = null;
/** A build asked for, waiting for the changes that come together (a commit and its announcement) to have all come. */
let soon = null;

/** Builds once the changes have stopped coming for a moment: several commits in a row are built once. */
function rebuildSoon(wait = 10_000) {
	clearTimeout(soon);
	soon = setTimeout(() => {
		soon = null;
		failures = 0;
		void rebuild();
	}, wait);
}

function rebuild() {
	if (building) {
		again = true;
		return building;
	}
	building = new Promise((resolve) => {
		// What the build says goes to the system's temporary folder: nothing is left in the project.
		// Where that cannot be written, the build is made all the same and says nothing.
		let log = 'ignore';
		try {
			log = fs.openSync(path.join(app.getPath('temp'), 'movelcad-site-build.log'), 'w');
		} catch {
			// No log.
		}
		const began = Date.now();
		const expected = lastTook();
		const note = announcedNote();
		// How far it has got, said to the editor twice a second: never backwards, and never all the way before it ends.
		let said = '';
		let reached = 0;
		const say = () => {
			let stage = 0;
			for (const [mark, steps] of STAGES) {
				const found = said.match(mark)?.length ?? 0;
				if (found > 0) stage = Math.max(stage, steps[Math.min(found, steps.length) - 1]);
			}
			reached = Math.max(reached, stage, Math.min(0.92, ((Date.now() - began) / expected) * 0.92));
			tellUpdate({ state: 'building', progress: Math.min(reached, 0.99), note });
		};
		const ticking = setInterval(say, 500);
		say();
		let over = false;
		// A process that could not be started says so and may also be said to have ended: once is enough.
		const done = (code) => {
			if (over) return;
			over = true;
			clearInterval(ticking);
			if (typeof log === 'number') fs.closeSync(log);
			building = null;
			resolve();
			// One that failed, as when the code was caught half written, is tried again: the program never stays behind.
			const failed = code !== 0;
			failures = failed ? failures + 1 : 0;
			clearTimeout(retry);
			// Timed only when it built: one that waited for another build to end says nothing of how long a build takes.
			if (!failed && !/Another build/.test(said)) {
				try {
					fs.writeFileSync(TOOK(), JSON.stringify({ took: Date.now() - began }));
				} catch {
					// The next one is timed by the usual minute.
				}
			}
			// Ready to be shown, once the program is restarted; the same build as the window shows is nothing to say.
			const there = buildThere();
			if (!failed && there && shown && there.built !== shown.built) tellUpdate({ state: 'ready', progress: 1, note: there.note, version: there.version }, there.built);
			else tellUpdate({ state: 'idle', progress: 0, note: '' });
			if (again) {
				again = false;
				rebuild();
			} else if (failed && failures < RETRIES) retry = setTimeout(rebuild, 60_000);
		};
		// This program's own engine runs the script, as Node would. What it says goes to the log, and tells how far it is.
		const build = spawn(process.execPath, [path.join(__dirname, 'scripts', 'site.mjs')], {
			cwd: __dirname,
			env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
			stdio: ['ignore', 'pipe', 'pipe'],
			windowsHide: true
		});
		const heard = (chunk) => {
			said += String(chunk);
			if (typeof log === 'number') fs.writeSync(log, chunk);
		};
		build.stdout.on('data', heard);
		build.stderr.on('data', heard);
		build.once('error', () => done(1));
		// Once what it said has all been heard.
		build.once('close', (code) => done(code));
	});
	return building;
}

/**
 * Follows the code: a version announced, or a commit made, since the build
 * that is there was made is built now, and the build is made again at each
 * announcement and each commit, all in the background: the window shows the
 * build there, and the editor offers to restart once the new one is ready.
 * Gives the build under way at the start for the window to wait for only
 * when there is none to show yet, or `null`.
 */
function followSource() {
	if (app.isPackaged || smokeReport || !fs.existsSync(path.join(SOURCE, 'package.json'))) return null;
	const announcedAt = () => {
		try {
			return fs.statSync(ANNOUNCED).mtimeMs;
		} catch {
			return 0;
		}
	};
	// Something announced, or committed, since the build that is there was made: it is made again straight away,
	// while the build there is shown. With none there yet, the window waits for it.
	const there = buildThere();
	let commit = commitNow();
	const committed = Boolean(commit && there?.commit && commit !== there.commit);
	const behind = !there || announcedAt() > new Date(there.built).getTime() || committed || buildUnderWay();
	const updating = behind ? rebuild() : null;
	// Looked at every two seconds, which still works when the file is replaced instead of written to.
	fs.watchFile(ANNOUNCED, { interval: 2000 }, (now, before) => {
		if (now.mtimeMs !== before.mtimeMs && now.mtimeMs > 0) rebuildSoon(3000);
	});
	// And the commits, every ten seconds: what was committed without a word is built all the same.
	setInterval(async () => {
		const now = await commitLater();
		if (!now || now === commit) return;
		commit = now;
		rebuildSoon();
	}, 10_000);
	return there ? null : updating;
}

/** What the announcement says of the version being built, to be shown while it is. */
function announcedNote() {
	try {
		return fs.readFileSync(ANNOUNCED, 'utf8').trim();
	} catch {
		return '';
	}
}

/** What the window shows while the version it was started with is built: that it is, and what is new in it. */
function updatingPage() {
	const escaped = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	const note = escaped(announcedNote());
	return [
		'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>PraiaMob</title>',
		'<style>html,body{height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;background:#16191e;color:#e3e7ee;',
		'font:14px/1.5 "Segoe UI",system-ui,sans-serif;-webkit-app-region:drag;user-select:none}div{max-width:520px;padding:0 24px;text-align:center}',
		'h1{margin:0 0 8px;font-size:18px;font-weight:600}p{margin:0;color:#8d96a3}em{display:block;margin-top:14px;font-style:normal;color:#5b8cf0}</style>',
		'</head><body><div><h1>Atualizando o PraiaMob…</h1><p>A versão nova está sendo montada. O programa abre sozinho quando terminar.</p>',
		note ? `<em>${note}</em>` : '',
		'</div></body></html>'
	].join('');
}

/** What the editor's own bar shows of the window: whether it fills the screen, and which build this is. */
function windowState(target = window) {
	return { maximized: Boolean(target?.isMaximized()), build: buildName() };
}

/**
 * A render in a window of its own: its own process, so that the editor goes on answering while the machine works
 * at the picture, and its own place on the taskbar, moved, put down and closed by itself. Like the editor's, it has
 * no bar of the system: the page draws its own.
 */
function openRenderWindow(address) {
	const render = new BrowserWindow({
		width: 1280,
		height: 840,
		minWidth: 720,
		minHeight: 480,
		show: false,
		backgroundColor: '#16191e',
		title: `Render — ${NAME}`,
		icon: app.isPackaged ? undefined : ICON,
		frame: false,
		// Put down, it goes on with the picture.
		webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false, backgroundThrottling: false }
	});
	nameOnTaskbar(render);
	render.once('ready-to-show', () => {
		if (!unseen) render.show();
	});
	const state = () => render.webContents.send('desktop:window-state', windowState(render));
	render.on('maximize', state);
	render.on('unmaximize', state);
	render.webContents.setWindowOpenHandler(({ url }) => {
		if (/^https?:/.test(url)) openOutside(url);
		return { action: 'deny' };
	});
	render.webContents.on('before-input-event', (_event, input) => {
		if (devTools(input)) render.webContents.toggleDevTools();
	});
	void render.loadURL(address);
	return render;
}

/** When this program was started, to tell whether its own code was changed since. */
const STARTED = Date.now();

/** Whether the code of the program itself, not of the editor it shows, is newer than what is running. */
function shellChanged() {
	return ['main.cjs', 'preload.cjs', 'data-store.mjs'].some((file) => {
		try {
			return fs.statSync(path.join(__dirname, file)).mtimeMs > STARTED;
		} catch {
			return false;
		}
	});
}

/**
 * The file of the editor an address names, as the editor shown has it (a pack, or a folder): a page address, with no
 * file extension, is the editor's one page; a file that is not there is `null`, never the page in its place, which a
 * script tag would then run as code. Told by what was asked, never by where the editor lies: one in a folder named by
 * its version (`0.0.14`) read as a file of kind `.14` once, and the window stayed grey.
 */
function fileFor(address) {
	const asked = path.posix.normalize(decodeURIComponent(new URL(address).pathname)).replace(/^\/+/, '');
	if (asked.startsWith('..')) return null;
	let editor;
	try {
		editor = editorAt(SITE);
	} catch {
		return null;
	}
	if (asked && asked !== '.' && editor.has(asked)) return { editor, name: asked };
	if (path.posix.extname(asked) !== '') return null;
	// A page of its own made ahead, as the render's (`render.html`); any other is the editor's one page.
	const page = `${asked}.html`;
	return { editor, name: asked && asked !== '.' && editor.has(page) ? page : 'index.html' };
}

/** What kind of file each is, for the window, by its ending. */
const KINDS = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.avif': 'image/avif',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.ico': 'image/x-icon',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.ttf': 'font/ttf',
	'.wasm': 'application/wasm',
	'.webmanifest': 'application/manifest+json'
};
const kindOf = (name) => KINDS[path.posix.extname(name).toLowerCase()] ?? 'application/octet-stream';

/**
 * Serves the editor from its folder, straight from the files as they are now:
 * nothing is kept in a cache, so a newer build is what is shown the moment
 * the page loads, and a file that is missing is missing.
 */
/**
 * The library of the Promob installed on this computer (`promob-library.mjs`), read where it is: asked at
 * `/_promob/…` for the drawing and the materials of a piece, and for what Promob says of its variables. Answered in
 * a thread of its own (`promob-worker.mjs`), started the first time it is asked: finding Promob and reading its
 * library takes minutes the first time on a large one, and, done here, it held the whole program still (the
 * construction manager asks it as it opens). A thread that falls is started again at the next question.
 */
let promobThread = null;
const promobWaiting = new Map();
let promobAsked = 0;

/** A file of the program as it lies on the disk: installed, the scripts a thread runs are kept out of the archive. */
const unpacked = (name) => path.join(__dirname, name).replace(/app\.asar([\\/])/, 'app.asar.unpacked$1');

function promobLibrary(address) {
	if (!promobThread) {
		promobThread = new Worker(pathToFileURL(unpacked('promob-worker.mjs')), {
			workerData: { cacheFolder: path.join(LOCAL, 'promob-cache') }
		});
		promobThread.on('message', ({ id, answered, failed }) => {
			const waiting = promobWaiting.get(id);
			promobWaiting.delete(id);
			if (!waiting) return;
			if (failed) waiting.reject(new Error(failed));
			else waiting.resolve(answered && { ...answered, body: Buffer.from(answered.body.buffer, answered.body.byteOffset, answered.body.byteLength), file: answered.file ?? undefined });
		});
		const fell = (error) => {
			report('erro', 'A leitura da biblioteca do Promob caiu', { erro: String(error?.message ?? error).slice(0, 2000) });
			for (const waiting of promobWaiting.values()) waiting.reject(new Error('promob'));
			promobWaiting.clear();
			promobThread = null;
		};
		promobThread.on('error', fell);
		promobThread.on('exit', (code) => {
			if (promobThread && code !== 0) fell(new Error(`saiu com ${code}`));
			promobThread = null;
		});
	}
	const id = ++promobAsked;
	return new Promise((resolve, reject) => {
		promobWaiting.set(id, { resolve, reject });
		promobThread.postMessage({ id, address });
	});
}

/**
 * Where the editor keeps its work (`data-store.mjs`): the folder the pages of the development server
 * keep it in as well, so that the program and those pages are one editor with the same projects and
 * settings. A copy started to be tried out apart (`--user-data-dir`), or a check, keeps it in its own.
 */
let dataStore = null;
async function sharedData() {
	if (!dataStore) {
		const { createDataStore, defaultDataFolder } = await import(pathToFileURL(path.join(__dirname, 'data-store.mjs')).href);
		const apart = smokeReport || app.commandLine.hasSwitch('user-data-dir');
		dataStore = createDataStore(apart ? path.join(app.getPath('userData'), 'dados') : defaultDataFolder());
		// Changed by a page of the development server, or by this window: the editor looks whether it is behind.
		dataStore.watch(() => window?.webContents.send('desktop:data-changed'));
	}
	return dataStore;
}

function serveEditor() {
	if (typeof protocol.handle === 'function') {
		protocol.handle(SCHEME, async (request) => {
			if (new URL(request.url).pathname.startsWith('/_promob/')) {
				try {
					const answered = await promobLibrary(request.url);
					if (answered) return new Response(answered.body, { status: answered.status, headers: { 'Content-Type': answered.type } });
				} catch (error) {
					return new Response(String(error), { status: 500 });
				}
			}
			const found = fileFor(request.url);
			if (!found) return new Response('', { status: 404 });
			try {
				const bytes = await found.editor.readLater(found.name);
				return new Response(bytes, {
					status: 200,
					// Lets the program read the stack of what the page runs when it stops responding (see `reportStopped`).
					headers: { 'Content-Type': kindOf(found.name), 'Cache-Control': 'no-store', 'Document-Policy': 'include-js-call-stacks-in-crash-reports' }
				});
			} catch {
				return new Response('', { status: 404 });
			}
		});
	} else {
		// Electron 22: answered with the bytes, the editor being in one file.
		protocol.registerBufferProtocol(SCHEME, (request, respond) => {
			const none = (statusCode) => respond({ statusCode, data: Buffer.alloc(0) });
			if (new URL(request.url).pathname.startsWith('/_promob/')) {
				promobLibrary(request.url)
					.then((answered) => {
						if (!answered) return none(404);
						const data = answered.file ? fs.readFileSync(answered.file) : Buffer.from(answered.body);
						respond({ statusCode: answered.status, mimeType: answered.type, data });
					})
					.catch(() => none(500));
				return;
			}
			const found = fileFor(request.url);
			if (!found) return none(404);
			const [mimeType, charset] = kindOf(found.name).split('; charset=');
			found.editor.readLater(found.name).then(
				(data) => respond({ mimeType, ...(charset && { charset }), data, headers: { 'Cache-Control': 'no-store' } }),
				() => none(404)
			);
		});
	}
}

/** The project named on a command line, as when one is double-clicked: its name and what is in it, as text or as the bytes of its archive. */
function projectFrom(args) {
	const file = args.find((arg) => typeof arg === 'string' && projectKindOf(arg) !== null && fs.existsSync(arg));
	if (!file) return null;
	try {
		const name = path.basename(file);
		const where = path.resolve(file);
		if (projectKindOf(file) === '.projx') return { name, text: fs.readFileSync(file, 'utf8'), path: where };
		return { name, bytes: new Uint8Array(fs.readFileSync(file)), path: where };
	} catch {
		return null;
	}
}

/** The project the program was started to open, handed to the editor once it asks. */
let launched = projectFrom(process.argv.slice(1));

/**
 * The account the site hands the program, at `praiamob://entrar#…` (see `cloud.ts`): a sign-in made for it, what
 * Google gave back after the `#`. The program is installed with the address as its own, so the site opens it.
 */
function signInFrom(args) {
	const link = args.find((arg) => typeof arg === 'string' && arg.toLowerCase().startsWith('praiamob://'));
	const at = link ? link.indexOf('#') : -1;
	const said = at >= 0 ? link.slice(at + 1) : '';
	return /(^|&)access_token=/.test(said) ? said : null;
}
/** The account handed at the start, waiting for the editor to take it. */
let handed = signInFrom(process.argv.slice(1));

/**
 * Where the reports go and who the window is, as the editor says once it is up (see `apps/web/src/lib/reports.ts`):
 * the program reports what the page cannot say itself, the stack of the code that ran when it stopped responding,
 * and its fall. What cannot be sent is kept in the program's folder and sent the next time.
 */
let reportsTo = null;
const PENDING_REPORTS = () => path.join(LOCAL, 'relatos-pendentes.json');

function pendingReports() {
	try {
		const kept = JSON.parse(fs.readFileSync(PENDING_REPORTS(), 'utf8'));
		return Array.isArray(kept) ? kept : [];
	} catch {
		return [];
	}
}

function keepPending(rows) {
	try {
		if (rows.length === 0) fs.rmSync(PENDING_REPORTS(), { force: true });
		else fs.writeFileSync(PENDING_REPORTS(), JSON.stringify(rows.slice(-200)));
	} catch {
		// The folder cannot be written: those are lost.
	}
}

/** Sends reports to the cloud; says whether they went, or were refused for what is in them (and would be again). */
function postReports(rows) {
	return new Promise((resolve) => {
		try {
			const request = net.request({ method: 'POST', url: reportsTo.at });
			request.setHeader('apikey', reportsTo.key);
			request.setHeader('Authorization', `Bearer ${reportsTo.key}`);
			request.setHeader('Content-Type', 'application/json');
			request.setHeader('Prefer', 'return=minimal');
			request.on('response', (response) => {
				response.on('data', () => {});
				response.on('end', () => resolve(response.statusCode < 500));
			});
			request.on('error', () => resolve(false));
			request.end(JSON.stringify(rows));
		} catch {
			resolve(false);
		}
	});
}

/** Sends what was kept, with a new report if there is one. */
function sendReports(row = null) {
	const kept = [...pendingReports(), ...(row ? [row] : [])];
	if (kept.length === 0 || smokeReport) return;
	keepPending([]);
	if (!reportsTo) return keepPending(kept);
	// Those made before the editor said who it is (at the start, as how the last install went) go with it.
	const rows = kept.map((each) => ({ ...each, maquina: each.maquina ?? reportsTo.maquina, sessao: each.sessao ?? reportsTo.sessao, conta: each.conta ?? reportsTo.conta }));
	void postReports(rows).then((went) => {
		if (!went) keepPending([...pendingReports(), ...rows]);
	});
}

/** A report of the program's own, as the editor writes its own, with what only the program knows of the machine. */
function report(tipo, mensagem, dados = {}) {
	sendReports({
		criado: new Date().toISOString(),
		tipo,
		onde: 'windows',
		// As the editor says it (see `reports.ts`): with the commit it was built from, to read a stack against that code.
		versao: shown ? [shown.version, shown.built, shown.commit].filter(Boolean).join(' · ') : PROGRAM_VERSION,
		maquina: reportsTo?.maquina ?? null,
		sessao: reportsTo?.sessao ?? null,
		conta: reportsTo?.conta ?? null,
		mensagem,
		dados: {
			...dados,
			programa: PROGRAM_VERSION,
			numero: app.getVersion(),
			instalado: app.isPackaged,
			// For this user alone or for every user of the computer: one for every user cannot write its own folder,
			// and asks the administrator's leave for each new program.
			instaladoPara: app.isPackaged ? (STORE ? 'loja' : installedForUser() ? 'usuario' : 'todos') : null,
			electron: process.versions.electron,
			sistema: `${process.platform} ${os.release()} ${os.arch()}`,
			memoriaMB: Math.round(os.totalmem() / 1048576),
			livreMB: Math.round(os.freemem() / 1048576),
			ligadoHa: Math.round(process.uptime())
		}
	});
}

/** How long the page may not answer the program before it is taken as stopped. */
const STOPPED_AFTER = 5000;

/**
 * The window stopped responding: the stack of the code the page was running is asked for (an engine of before this
 * cannot tell), and reported at once, before the program is closed by hand; then again when it comes back. The
 * program asks the page every second whether it is alive (`desktop:alive?`, answered by `preload.cjs`): the engine's
 * own word that a page hangs comes only for a window in sight with a click waiting, and comes late.
 */
function reportStopped(target) {
	let stopped = 0;
	let waiting = 0;
	const stop = () => {
		if (stopped || target.isDestroyed()) return;
		stopped = Date.now();
		const frame = target.webContents.mainFrame;
		const asked =
			frame && typeof frame.collectJavaScriptCallStack === 'function'
				? Promise.race([frame.collectJavaScriptCallStack(), new Promise((resolve) => setTimeout(resolve, 4000))])
				: Promise.resolve(undefined);
		void asked
			.catch(() => undefined)
			.then((stack) =>
				report('trava', 'A janela do programa parou de responder', {
					pilha: typeof stack === 'string' ? stack.slice(0, 16000) : null,
					endereco: target.isDestroyed() ? null : target.webContents.getURL().slice(0, 200)
				})
			);
	};
	const back = () => {
		if (stopped) report('trava', 'A janela do programa voltou a responder', { durou: Date.now() - stopped });
		stopped = 0;
	};
	const beat = setInterval(() => {
		if (target.isDestroyed()) return clearInterval(beat);
		// Not asked while it loads, nor before the editor is up (it has not said where its reports go).
		if (!reportsTo || target.webContents.isLoading()) {
			waiting = 0;
			return;
		}
		if (waiting === 0) {
			waiting = Date.now();
			target.webContents.send('desktop:alive?');
		} else if (Date.now() - waiting > STOPPED_AFTER) stop();
	}, 1000);
	const alive = (event) => {
		if (target.isDestroyed() || event.sender !== target.webContents) return;
		waiting = 0;
		back();
	};
	ipcMain.on('desktop:alive', alive);
	target.on('closed', () => {
		clearInterval(beat);
		ipcMain.removeListener('desktop:alive', alive);
	});
	target.on('unresponsive', stop);
	target.on('responsive', back);
	// Loaded again (restarted on a new build, or after a fall): what was awaited is no more.
	target.webContents.on('did-start-loading', () => {
		waiting = 0;
		stopped = 0;
	});
	// The page fell: reported, and opened again where it was (its work is kept as it is made), but not over and over.
	const falls = [];
	target.webContents.on('render-process-gone', (_event, details) => {
		report('queda', 'O editor caiu', { motivo: details.reason, codigo: details.exitCode });
		const now = Date.now();
		while (falls.length > 0 && now - falls[0] > 5 * 60_000) falls.shift();
		falls.push(now);
		if (details.reason !== 'clean-exit' && falls.length <= 3 && !target.isDestroyed()) target.webContents.reload();
	});
}

/**
 * Where the site is, and what it says of its version: when it was built, what is new, and every file with its sum. A
 * copy tried out apart (`--user-data-dir`) may be pointed at a site on this computer instead, as the rehearsal of the
 * update does before a program is published (see `scripts/ensaio-atualizacao.mjs`).
 */
const SITE_ADDRESS =
	(app.commandLine.hasSwitch('user-data-dir') && /^http:\/\/127\.0\.0\.1:\d+\/$/.test(process.env.PRAIAMOB_SITE_ENSAIO ?? '') && process.env.PRAIAMOB_SITE_ENSAIO) ||
	'https://megashooterx.github.io/';
/**
 * Where an installed program keeps the editors it fetched, each in a pack named by its version: in the folder it is
 * installed in, beside the editor it came with (`resources/editor`), as a program keeps its own files; where that
 * cannot be written (installed for every user of the computer, or in a folder chosen that refuses it), in its local
 * folder. Both are looked in for the newest (see `newestSite`): which one can be written may change between starts.
 */
const FETCHED_PLACES = () => [path.join(process.resourcesPath, 'editor'), path.join(LOCAL, 'editor')];

/**
 * Whether editors can be written in a folder: made when missing, and a file written in it and taken away. Windows'
 * own check (`accessSync`) says yes for folders it then refuses to write in; a folder never made said ENOENT at
 * every update (30/10/2026), and the program stayed behind the site.
 */
function writable(folder) {
	try {
		fs.mkdirSync(folder, { recursive: true });
		const probe = path.join(folder, `.escrita-${process.pid}`);
		fs.writeFileSync(probe, '');
		fs.unlinkSync(probe);
		return true;
	} catch {
		return false;
	}
}

/** The folder editors are fetched into now: the first of `FETCHED_PLACES` that can be written, chosen again once it is gone. */
let fetchedAt = null;
const FETCHED = () => {
	if (fetchedAt && fs.existsSync(fetchedAt)) return fetchedAt;
	fetchedAt = FETCHED_PLACES().find(writable) ?? FETCHED_PLACES()[1];
	return fetchedAt;
};

/** The version of the editor in a folder, as its build says; `0.0.0` when it cannot tell. */
function versionIn(place) {
	const version = buildOf(place)?.version;
	return typeof version === 'string' ? version : '0.0.0';
}

/**
 * Whether a version is after another, by its numbers (0.0.10 after 0.0.9): the versions published only ever go up,
 * one at a time, so they are the trail an update follows, whatever the clocks of the machines say.
 */
function after(version, other) {
	const parts = (text) => String(text).split('.').map((part) => Number.parseInt(part, 10) || 0);
	const [a, b] = [parts(version), parts(other)];
	for (let at = 0; at < Math.max(a.length, b.length); at++) {
		if ((a[at] ?? 0) !== (b[at] ?? 0)) return (a[at] ?? 0) > (b[at] ?? 0);
	}
	return false;
}

/**
 * Where the versions fetched that did not come up are listed, each with when: one is never shown again as it was
 * fetched, and for a while not fetched at all; then it is fetched again whole (it may have been the copy that was
 * broken, or the machine too busy that once), so that no failure leaves a program behind the site for good.
 */
const FAILED = () => path.join(FETCHED(), 'falhou.json');
/** How long a version that did not come up waits before it is fetched again, whole, for another chance. */
const FAILED_FOR = 6 * 60 * 60 * 1000;

function failedList() {
	try {
		const listed = JSON.parse(fs.readFileSync(FAILED(), 'utf8'));
		// The programs of before listed bare numbers: as failed long ago.
		if (!Array.isArray(listed)) return [];
		return listed.map((each) => (typeof each === 'string' ? { versao: each, em: 0 } : each)).filter((each) => typeof each?.versao === 'string');
	} catch {
		return [];
	}
}

/** The versions that did not come up lately: neither shown nor fetched. */
function failedVersions() {
	const now = Date.now();
	// Either way: a clock put back would keep one failed for as long as it was ahead.
	return failedList()
		.filter((each) => Math.abs(now - (Number(each.em) || 0)) < FAILED_FOR)
		.map((each) => each.versao);
}

/** Whether a version did not come up, and was not fetched again since: the copy there is not shown. */
const everFailed = (version) => failedList().some((each) => each.versao === version);

function keepFailed(list) {
	try {
		fs.writeFileSync(FAILED(), JSON.stringify(list));
	} catch {
		// Not kept: the version is tried again at the next start, and put aside again.
	}
}

function listFailed(version) {
	keepFailed([...failedList().filter((each) => each.versao !== version), { versao: version, em: Date.now() }]);
}

function clearFailed(version) {
	if (everFailed(version)) keepFailed(failedList().filter((each) => each.versao !== version));
}

/** The pack being fetched now (`.baixando`): never taken away from under its fetch. */
let downloading = null;

/**
 * At the start of an installed program: the newest editor there is, the one installed with it or one fetched since,
 * which is shown. The others fetched are not needed any more, nor one whose fetch was cut short, nor one that did
 * not come up.
 */
function newestSite() {
	if (!app.isPackaged || smokeReport) return INSTALLED_SITE;
	let best = INSTALLED_SITE;
	let bestVersion = versionIn(INSTALLED_SITE);
	// In both folders an editor may have been fetched into (see `FETCHED_PLACES`).
	const found = [];
	for (const place of FETCHED_PLACES()) {
		try {
			for (const name of fs.readdirSync(place)) if (name !== 'falhou.json' && !name.startsWith('.escrita-')) found.push(path.join(place, name));
		} catch {
			// Never made: nothing was fetched into it.
		}
	}
	let bestAt = 0;
	for (const folder of found) {
		if (folder.endsWith('.baixando')) continue;
		const version = versionIn(folder);
		if (everFailed(version)) continue;
		let at = 0;
		try {
			at = fs.statSync(folder).mtimeMs;
		} catch {
			continue;
		}
		// The same version fetched again whole (to mend it, the installed one or one fetched before) is the one fetched last.
		if (after(version, bestVersion) || (version === bestVersion && (best === INSTALLED_SITE || at > bestAt))) {
			best = folder;
			bestVersion = version;
			bestAt = at;
		}
	}
	// The others go, a little later; never the one being fetched by then.
	for (const place of found) {
		if (place !== best) setTimeout(() => place !== downloading && removeTree(place), 5000);
	}
	return best;
}

/** The editor fetched from the site that is being shown, until it says it came up (see `desktop:reports-are`). */
let trial = null;
/**
 * How long an editor fetched may take to come up before the one installed with the program is shown instead: in
 * seconds the program was awake, counted five at a time (a machine put to sleep while it opened is no failure).
 */
const TRIAL_FOR = 90;

/** Puts on trial the editor shown now, when it is one fetched from the site. */
function tryEditor() {
	trial = SITE !== INSTALLED_SITE ? { site: SITE, waited: 0 } : null;
}

/** Whether the editor in the window said it came up since its page last began to load (see `desktop:reports-are`). */
let editorUp = false;
/** For how many seconds the program was awake with the editor not up, counted five at a time. */
let downFor = 0;

/**
 * The editor does not come up, whatever it is: the program puts its update first. The site is asked every ten
 * seconds, an editor fetched is shown as soon as it is there and a program fetched is installed at once, without
 * waiting for a click the window cannot take, nor for the program to be closed.
 */
const down = () => downFor >= TRIAL_FOR;

/**
 * An editor fetched before that is not shown any more, taken away a little later, once the window let go of it: else
 * every version taken in while the program stays open stays beside it until the next start, some 116 MB each (seven
 * on his PC, 30/10/2026). Never the one installed, which `fallBack` goes back to.
 */
function letGo(place) {
	if (!place || place === INSTALLED_SITE) return;
	setTimeout(() => {
		// Shown again, waiting again, or being fetched again under its name (its `.baixando`): kept.
		if (place === SITE || place === fetchedSite?.folder || downloading === `${place}.baixando`) return;
		closeEditor(place);
		removeTree(place);
	}, 10_000);
}

/** Shows the editor fetched and waiting: asked for by Reiniciar, or at once when the one shown does not come up. */
function showFetched() {
	if (!fetchedSite) return;
	const before = SITE;
	SITE = fetchedSite.folder;
	fetchedSite = null;
	tryEditor();
	window?.webContents.reloadIgnoringCache();
	letGo(before);
}

/**
 * An editor fetched from the site that did not come up: the one installed with the program is shown again, so that
 * no version published can leave the program on a grey window. That version is listed, so as to be neither shown
 * nor fetched again (a newer one is), and reported.
 */
function fallBack(why) {
	if (!trial || trial.site !== SITE || !window || window.isDestroyed()) return;
	const version = versionIn(SITE);
	trial = null;
	listFailed(version);
	report('erro', 'O editor baixado do site não abriu: voltou ao instalado', { versao: version, motivo: why });
	letGo(SITE);
	SITE = INSTALLED_SITE;
	fetchedSite = null;
	// The one installed is given its own time to come up.
	downFor = 0;
	window.webContents.reloadIgnoringCache();
}

/**
 * The bytes at an address, as the engine of Electron 22 fetches them too. Given up when nothing comes for half a
 * minute: a fetch held open by a network that stopped answering would keep every update after it waiting.
 */
function fetchBytes(address) {
	return new Promise((resolve, reject) => {
		const request = net.request(address);
		let silence = null;
		const waiting = () => {
			clearTimeout(silence);
			silence = setTimeout(() => {
				request.abort();
				reject(new Error(`sem resposta em 30 s: ${address}`));
			}, 30_000);
		};
		const failed = (error) => {
			clearTimeout(silence);
			reject(error);
		};
		waiting();
		request.on('response', (response) => {
			const parts = [];
			waiting();
			response.on('data', (chunk) => {
				parts.push(chunk);
				waiting();
			});
			response.on('end', () => {
				clearTimeout(silence);
				if (response.statusCode === 200) resolve(Buffer.concat(parts));
				else reject(new Error(`${response.statusCode} ${address}`));
			});
			response.on('error', failed);
		});
		request.on('error', failed);
		request.end();
	});
}

const sumOf = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

/** The editor fetched and waiting for Reiniciar: its folder, when it was built and what is new in it. */
let fetchedSite = null;

/** No editor to take files from: every file is fetched from the site. */
const NOTHING = { has: () => false, sum: () => null, readLater: async () => null };

/** How long the start waits for the site to say its version, and then for a newer one to be fetched. */
const START_ASK = 4000;
const START_FETCH = 120_000;

/** While the window shows the start (`startPage`), before the editor: the editor is not expected up yet. */
let starting = false;

/**
 * Keeps the editor of an installed program up to date from the site, between installs: a newer one is fetched in
 * the background into a folder of its own, the files that did not change taken from the one there (linked, not
 * copied), the others fetched and checked by their sums; only once it is all there is Reiniciar offered, which then
 * just loads it, at once. One published while another waits is fetched as well, and offered in its place.
 */
function followSite() {
	if (!app.isPackaged || smokeReport) return null;
	let fetching = false;
	const failed = new Set();
	/**
	 * Fetches the version on the site when it is newer than the one there; `mend`, the version there again, whole,
	 * for an editor that does not come up. Says whether one was fetched.
	 */
	const look = async ({ mend = false } = {}) => {
		if (fetching) return false;
		fetching = true;
		let folder = null;
		let writer = null;
		try {
			const told = JSON.parse((await fetchBytes(`${SITE_ADDRESS}app/versao.json?t=${Date.now()}`)).toString('utf8'));
			const there = fetchedSite?.folder ?? SITE;
			const have = versionIn(there);
			// Its number (`versao`); `version` is the one told to the programs of before, with no dot in it (see
			// `folderNumber` in publicar.mjs).
			const number = typeof told.versao === 'string' ? told.versao : told.version;
			if (typeof number !== 'string' || !Array.isArray(told.files) || told.files.length === 0) return false;
			// One that did not come up lately waits its time; then it is fetched again, whole.
			if (failedVersions().includes(number)) return false;
			if (!after(number, have) && !(mend && number === have)) return false;
			// What did not change is taken from the editor there, unless it is the one being mended, or one of a
			// version that failed, or it cannot be read: then every file comes from the site.
			const whole = mend || everFailed(number);
			let from = NOTHING;
			if (!whole) {
				try {
					from = editorAt(there);
				} catch {
					from = NOTHING;
				}
			}
			// Packed in one file, as the one installed (see `pacote.cjs`); beside the one shown when it is the same
			// version mended.
			const named = number.replace(/[^0-9.]/g, '');
			// Into the folder fetched into now; where that refuses the pack, into the other (see `FETCHED_PLACES`).
			let target = null;
			let refused = null;
			for (const place of [FETCHED(), ...FETCHED_PLACES().filter((other) => other !== FETCHED())]) {
				const candidate = [`${named}.pak`, `${named}.reparo.pak`].map((name) => path.join(place, name)).find((one) => one !== SITE && one !== fetchedSite?.folder);
				if (!candidate) continue;
				try {
					fs.mkdirSync(place, { recursive: true });
					closeEditor(candidate);
					removeTree(candidate);
					folder = `${candidate}.baixando`;
					downloading = folder;
					removeTree(folder);
					writer = await packWriter(folder);
					target = candidate;
					fetchedAt = place;
					break;
				} catch (error) {
					refused ??= error;
					folder = null;
				}
			}
			if (!target) {
				if (refused) throw refused;
				return false;
			}
			const note = typeof told.note === 'string' ? told.note : '';
			// The bar only while there is nothing ready yet: a newer one fetched over one waiting changes nothing shown.
			const showing = !fetchedSite;
			if (showing) tellUpdate({ state: 'building', progress: 0.01, note });
			const waiting = [...told.files];
			let done = 0;
			const one = async () => {
				for (let file = waiting.shift(); file; file = waiting.shift()) {
					if (typeof file.path !== 'string' || file.path.split('/').some((part) => part === '..' || part === '')) throw new Error(`fora do editor: ${file.path}`);
					// What did not change is taken from the editor there; what did, from the site, checked by its sum.
					let bytes = null;
					try {
						if (from.has(file.path) && from.sum(file.path) === file.sha256) bytes = await from.readLater(file.path);
						// Its bytes checked too, not only what its list says: a copy spoiled on the disk is not passed on.
						if (bytes && sumOf(bytes) !== file.sha256) bytes = null;
					} catch {
						bytes = null;
					}
					if (!bytes) {
						const address = `${SITE_ADDRESS}${file.path.split('/').map(encodeURIComponent).join('/')}?v=${number}`;
						bytes = await fetchBytes(address);
						if (sumOf(bytes) !== file.sha256) throw new Error(`soma diferente: ${file.path}`);
					}
					await writer.add(file.path, bytes, file.sha256);
					done += 1;
					if (showing && done % 25 === 0) tellUpdate({ state: 'building', progress: Math.min(0.99, done / told.files.length), note });
				}
			};
			await Promise.all(Array.from({ length: 6 }, one));
			await writer.finish();
			writer = null;
			await fs.promises.rename(folder, target);
			folder = null;
			// Fetched again whole: it has its chance again.
			clearFailed(number);
			const before = fetchedSite?.folder;
			fetchedSite = { folder: target, built: told.built, note };
			tellUpdate({ state: 'ready', progress: 1, note, version: number }, told.built);
			// One fetched before it and never shown is not needed any more.
			letGo(before);
			// The editor shown does not come up: this one, which may be its fix, is shown at once.
			if (down()) showFetched();
			return true;
		} catch (error) {
			const said = String(error?.message ?? error).slice(0, 2000);
			if (!failed.has(said)) {
				failed.add(said);
				report('erro', 'A atualização do editor falhou', { erro: said, pasta: fetchedAt });
			}
			if (!fetchedSite && update.state === 'building') tellUpdate({ state: 'idle', progress: 0, note: '' });
			return false;
		} finally {
			if (writer) await writer.abandon();
			if (folder) removeTree(folder);
			downloading = null;
			fetching = false;
		}
	};
	// The site is asked every minute, and as the window is come back to, by its small build file alone: the list of
	// every file is fetched only when that says there is a newer version.
	let asked = 0;
	let mended = false;
	const askBuild = async () => JSON.parse((await fetchBytes(`${SITE_ADDRESS}build.json?t=${Date.now()}`)).toString('utf8'));
	const peek = async (every = 20_000) => {
		if (fetching || starting || Date.now() - asked < every) return;
		asked = Date.now();
		try {
			const build = await askBuild();
			if (typeof build.version !== 'string') return;
			if (after(build.version, versionIn(fetchedSite?.folder ?? SITE))) await look();
			// The editor does not come up, there is none newer and none waiting: the one there is fetched again,
			// whole, and shown, once a start (the last resort before the one installed with the program).
			else if (down() && !fetchedSite && !mended) {
				mended = true;
				report('erro', 'O editor não abria: a versão é baixada de novo inteira', { versao: build.version, esperou: downFor });
				await look({ mend: true });
			}
		} catch {
			// No network: asked again in a minute.
		}
	};
	setTimeout(() => void peek(), 3000);
	// Every minute; every ten seconds while the editor does not come up, so that its fix comes first.
	setInterval(() => void peek(down() ? 10_000 : 60_000), 10_000);
	app.on('browser-window-focus', () => void peek());
	return {
		/**
		 * The start, before the editor is shown (nobody is in the middle of a project yet): a newer version on the
		 * site is fetched first, only what changed, the window saying so, and the editor opens on it. Without network,
		 * or taking too long, the editor there opens, and what is fetched behind it is offered by the cloud.
		 */
		async atStart() {
			let build = null;
			try {
				build = await Promise.race([askBuild(), new Promise((_resolve, reject) => setTimeout(() => reject(new Error('demorou')), START_ASK))]);
			} catch {
				return;
			}
			asked = Date.now();
			if (typeof build?.version !== 'string' || !after(build.version, versionIn(SITE)) || failedVersions().includes(build.version)) return;
			sayAtStart({ titulo: 'Atualizando o PraiaMob', texto: `Baixando a versão ${build.version}: só o que mudou.`, nota: typeof build.note === 'string' ? build.note : '', parte: 0.02 });
			const progress = setInterval(() => sayAtStart({ parte: update.progress }), 400);
			try {
				await Promise.race([look(), new Promise((resolve) => setTimeout(resolve, START_FETCH))]);
			} finally {
				clearInterval(progress);
			}
			// Fetched in time: it is the editor shown, and there is nothing to offer.
			if (fetchedSite) {
				letGo(SITE);
				SITE = fetchedSite.folder;
				fetchedSite = null;
				tellUpdate({ state: 'idle', progress: 0, note: '' });
			}
		}
	};
}

/** What the page of the start says now, the whole of it: written again each time, so that none is lost while it loads. */
const saidAtStart = {};

/** Writes on the page of the start (`startPage`): what it says, and how far the fetch has got. */
function sayAtStart(said) {
	Object.assign(saidAtStart, said);
	if (!starting || !window || window.isDestroyed()) return;
	void window.webContents.executeJavaScript(`window.diz && window.diz(${JSON.stringify(saidAtStart)})`).catch(() => {});
}

/**
 * What an installed program shows as it starts, before the editor: the colour of its opening, and, when the site has
 * a newer version, that it is being fetched, with a bar (filled in by `sayAtStart`).
 */
function startPage() {
	return [
		'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>PraiaMob</title>',
		'<style>html,body{height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;background:#16191e;color:#e3e7ee;',
		'font:14px/1.5 "Segoe UI",system-ui,sans-serif;-webkit-app-region:drag;user-select:none}div{max-width:520px;padding:0 24px;text-align:center}',
		'h1{margin:0 0 8px;font-size:18px;font-weight:600}p{margin:0;color:#8d96a3}em{display:block;margin-top:14px;font-style:normal;color:#5b8cf0}',
		'.bar{visibility:hidden;width:260px;height:4px;margin:18px auto 0;overflow:hidden;border-radius:2px;background:#2a2f37}',
		'.bar i{display:block;width:2%;height:100%;border-radius:2px;background:#5b8cf0;transition:width .4s ease}</style>',
		'</head><body><div><h1 id="t"></h1><p id="s"></p><em id="n"></em><div class="bar" id="b"><i></i></div></div>',
		'<script>window.diz=function(d){if(d.titulo!==undefined)t.textContent=d.titulo;if(d.texto!==undefined)s.textContent=d.texto;',
		'if(d.nota!==undefined)n.textContent=d.nota;if(d.parte!==undefined){b.style.visibility="visible";',
		'b.firstChild.style.width=Math.max(2,Math.round(d.parte*100))+"%"}}</script></body></html>'
	].join('');
}

/**
 * The scripts of PowerShell the program hands its installs to, beside this file: `instalador.ps1` installs a program
 * fetched once this one is closed, `tirar-antigo.ps1` takes an install for every user away. Files of their own, signed
 * with the program once it is signed (see `scripts/assinatura.mjs`): where Windows runs only signed scripts whole, as
 * Smart App Control does, one written by the program would run in its constrained mode. Copied to the temporary
 * folder to be run, for the install takes the folder of the program away.
 */
const SCRIPT = (name) => path.join(__dirname, name);
const INSTALLER = 'instalador.ps1';

/**
 * The program fetched and waiting to be installed (see `followReleases`): its version, its installer, that
 * installer's size and sum as published, and how many times it was tried. Kept in the program's local folder, which
 * an install leaves alone.
 */
const WAITING_PROGRAM = () => path.join(LOCAL, 'programa-novo.json');
/** What the install that ran last wrote down, step by step (see `INSTALLER`), reported at the next start. */
const INSTALL_LOG = () => path.join(LOCAL, 'instalacao.log');
/** There while an install runs, with the number of the process that drives it. */
const INSTALL_LOCK = () => path.join(LOCAL, 'instalando.lock');
/** There when the program is to be opened again once the install is done. */
const REOPEN_AFTER = () => path.join(LOCAL, 'reabrir-depois');
/** How many times a program waiting is tried at the start; after that, only as the program closes. */
const START_TRIES = 3;
/**
 * After this many tries of one program, it is tried once a day: an installer that Windows or an antivirus refuses
 * would otherwise put up the screen of the install at every close and, with the editor down, close the program and
 * open it again over and over.
 */
const QUIT_TRIES = 6;
const TRIED_AGAIN_AFTER = 24 * 60 * 60 * 1000;
const mayTry = (waiting) => (Number(waiting.tentativas) || 0) < QUIT_TRIES || Date.now() - (Number(waiting.tentada) || 0) > TRIED_AGAIN_AFTER;
/**
 * A copy tried out (`--user-data-dir`) never installs over the program the user has; given a stand-in installer
 * (`PRAIAMOB_ENSAIO_INSTALADOR`), it goes through the whole install with that one.
 */
const triedOut = app.commandLine.hasSwitch('user-data-dir');
/** Windows is shutting down: nothing is installed now, where it could be cut halfway; the next start does it. */
let sessionEnding = false;

function waitingProgram() {
	try {
		const kept = JSON.parse(fs.readFileSync(WAITING_PROGRAM(), 'utf8'));
		return typeof kept?.versao === 'string' && typeof kept.instalador === 'string' ? kept : null;
	} catch {
		return null;
	}
}

function keepWaiting(waiting) {
	try {
		if (waiting) fs.writeFileSync(WAITING_PROGRAM(), JSON.stringify(waiting));
		else fs.rmSync(WAITING_PROGRAM(), { force: true });
	} catch {
		// Not kept: the updater finds it fetched at its next look, and notes it again.
	}
}

/** Whether a program waits: newer than this one, its installer there and of its size. */
function stillWaiting(waiting) {
	try {
		return !!waiting && after(waiting.versao, app.getVersion()) && fs.statSync(waiting.instalador).size === waiting.tamanho;
	} catch {
		return false;
	}
}

/** Whether the installer of the program waiting is whole: of its sum, as published. */
function wholeInstaller(waiting) {
	return new Promise((resolve) => {
		try {
			const sum = crypto.createHash('sha512');
			fs.createReadStream(waiting.instalador)
				.on('data', (chunk) => sum.update(chunk))
				.on('error', () => resolve(false))
				.on('end', () => resolve(sum.digest('base64') === waiting.sha512));
		} catch {
			resolve(false);
		}
	});
}

/**
 * Whether an install runs now (see `INSTALLER`): its lock there, written lately and since Windows started, and the
 * process that drives it alive and a PowerShell. The lock of a driver cut off (Windows shut down in the middle of the
 * install, the PowerShell closed) names a number Windows soon gives to another process: taken for the install, that
 * one kept the program from opening for a quarter of an hour, closing again at every click.
 */
function installRunning() {
	try {
		const at = fs.statSync(INSTALL_LOCK()).mtimeMs;
		if (Date.now() - at > 15 * 60_000 || at < Date.now() - os.uptime() * 1000) return false;
		const driver = Number.parseInt(fs.readFileSync(INSTALL_LOCK(), 'utf8'), 10);
		if (!driver) return false;
		process.kill(driver, 0);
		const listed = spawnSync('tasklist', ['/FI', `PID eq ${driver}`, '/FO', 'CSV', '/NH'], { windowsHide: true, encoding: 'utf8', timeout: 5000 });
		// Not told (no tasklist, or too slow): the process alive is taken for the driver.
		if (listed.status !== 0 || !listed.stdout) return true;
		return /^"powershell\.exe"/im.test(listed.stdout);
	} catch {
		return false;
	}
}

/**
 * Whether the program is installed for this user alone (in the user's own folders, where the installer always puts it
 * since 30/10/2026, see `instalador.nsh`), for the installers before that to keep it so (`/currentuser`). Left to
 * itself, such an installer goes by what the registry says of the installs before: on his PC a mark of an install for
 * every user, left from long before, made every quiet update ask the administrator's leave (refused, the 0.16.0 never
 * went in) and, granted, move the program to C:Program Files, out of the shortcuts (29/10/2026).
 */
function installedForUser() {
	const inside = path.relative(os.homedir(), process.execPath);
	return !!inside && !inside.startsWith('..') && !path.isAbsolute(inside);
}

/**
 * Starts a script of PowerShell that outlives the program, and says the number of its process. Started straight from
 * the program it would not: Windows PowerShell does nothing at all without a console (Node's `detached`, which the
 * screen of the install used until 29/10/2026, so that it never came up), and a child with one is closed with the
 * program. So a first PowerShell, the program's child, starts the second, which is nobody's child (the job that closes
 * the program's children does not take in theirs), and says its number; the program waits for that, a moment.
 */
function startOutlasting(script, env) {
	const quoted = (text) => `'${String(text).replace(/'/g, "''")}'`;
	const inner = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-File', `"${script}"`].map(quoted).join(',');
	const done = spawnSync(
		'powershell.exe',
		['-NoProfile', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-Command', `(Start-Process -FilePath powershell.exe -WindowStyle Hidden -PassThru -ArgumentList ${inner}).Id`],
		{ env, windowsHide: true, timeout: 20_000, encoding: 'utf8' }
	);
	const started = Number.parseInt(String(done.stdout ?? '').trim(), 10);
	if (!started) throw new Error(`o PowerShell não abriu: ${String(done.stderr || done.error?.message || done.status).slice(0, 500)}`);
	return started;
}

/**
 * Hands the program waiting to `INSTALLER`, which installs it once this program is closed and, with `reopen`,
 * opens it again after. Says whether it went.
 */
function installProgram(waiting, { reopen }) {
	const standIn = triedOut ? process.env.PRAIAMOB_ENSAIO_INSTALADOR : null;
	if (process.platform !== 'win32' || smokeReport || sessionEnding || (triedOut && !standIn)) return false;
	try {
		const script = path.join(app.getPath('temp'), 'praiamob-instalador.ps1');
		fs.copyFileSync(SCRIPT(INSTALLER), script);
		fs.mkdirSync(LOCAL, { recursive: true });
		fs.rmSync(INSTALL_LOG(), { force: true });
		if (reopen) fs.writeFileSync(REOPEN_AFTER(), '');
		else fs.rmSync(REOPEN_AFTER(), { force: true });
		const driver = startOutlasting(script, {
			...process.env,
			PRAIAMOB_INSTALADOR: standIn || waiting.instalador,
			PRAIAMOB_VERSAO: waiting.versao,
			PRAIAMOB_MODO: installedForUser() ? '/currentuser' : '',
			PRAIAMOB_PROGRAMA: process.execPath,
			PRAIAMOB_REGISTRO: INSTALL_LOG(),
			PRAIAMOB_TRAVA: INSTALL_LOCK(),
			PRAIAMOB_REABRIR: REOPEN_AFTER(),
			PRAIAMOB_DEPOIS: reopen ? 'Leva alguns instantes, e o PraiaMob abre de novo sozinho.' : 'Leva alguns instantes. Depois, é só abrir o PraiaMob.',
			// A copy tried out opens again as it was started: in its own folder of work, out of sight.
			...(triedOut && { PRAIAMOB_ARGUMENTOS: process.argv.filter((arg) => arg.startsWith('--')).map((arg) => `"${arg}"`).join(' ') }),
			...(unseen && { PRAIAMOB_SEM_TELA: '1' })
		});
		// Written here, not by the install: a start right after this one already finds it.
		fs.writeFileSync(INSTALL_LOCK(), String(driver));
		keepWaiting({ ...waiting, tentativas: (Number(waiting.tentativas) || 0) + 1, tentada: Date.now() });
		return true;
	} catch (error) {
		report('erro', 'O programa novo não foi entregue ao instalador', { versao: waiting.versao, erro: String(error?.message ?? error).slice(0, 2000) });
		return installDirectly(waiting, { reopen, standIn, why: String(error?.message ?? error) });
	}
}

/**
 * The install without `INSTALLER`, where PowerShell cannot be started (a computer whose rules forbid it, a program
 * that guards against it): the installer itself, started apart from the program, which waits for the program to be
 * closed by itself, with no screen and nothing written down but this. Says whether it was started.
 */
function installDirectly(waiting, { reopen, standIn, why }) {
	try {
		const asked = ['--updated', '/S', ...(installedForUser() ? ['/currentuser'] : []), ...(reopen ? ['--force-run'] : [])];
		const installer = standIn || waiting.instalador;
		// A script (the stand-in of a rehearsal) is started through Windows' own shell; the installer, by itself.
		const started = /\.(cmd|bat)$/i.test(installer)
			? spawn('cmd.exe', ['/d', '/c', installer, ...asked], { detached: true, stdio: 'ignore', windowsHide: true })
			: spawn(installer, asked, { detached: true, stdio: 'ignore', windowsHide: true });
		started.on('error', () => {});
		started.unref();
		fs.writeFileSync(INSTALL_LOG(), `${new Date().toISOString()} o PowerShell não abriu (${why.slice(0, 300)}): instalador aberto direto, ${asked.join(' ')}\r\n`);
		keepWaiting({ ...waiting, tentativas: (Number(waiting.tentativas) || 0) + 1, tentada: Date.now() });
		return true;
	} catch (error) {
		report('erro', 'O instalador do programa novo não abriu', { versao: waiting.versao, erro: String(error?.message ?? error).slice(0, 2000) });
		return false;
	}
}

/**
 * Written down by the installer (see `customInstall` in instalador.nsh) when the install of this program for every
 * user, from before, was left in its place (Windows' leave refused): the folder it is in, and how many times it was
 * asked again since.
 */
const OLD_FOR_EVERYONE = () => path.join(LOCAL, 'todos-os-usuarios.txt');
/** How many times the program asks again, as it closes, to take the install for every user away. */
const OLD_TRIES = 3;
/** Asks Windows' leave and, given it, has this program's uninstaller take the install for every user away (see `SCRIPT`). */
const TAKE_OLD = 'tirar-antigo.ps1';

/**
 * The install for every user that the installer left in its place, asked again as the program closes: two programs
 * and two sets of shortcuts otherwise, the old one opened by its own. Once gone, or its folder empty, forgotten.
 */
function takeOldForEveryone() {
	if (process.platform !== 'win32' || !app.isPackaged || STORE || smokeReport || sessionEnding || triedOut) return;
	let folder;
	let tries;
	try {
		[folder = '', tries = ''] = fs.readFileSync(OLD_FOR_EVERYONE(), 'utf16le').replace(/^﻿/, '').trim().split(/\r?\n/);
	} catch {
		return;
	}
	const old = path.join(folder, path.basename(process.execPath));
	const uninstaller = path.join(path.dirname(process.execPath), `Uninstall ${path.basename(process.execPath)}`);
	const asked = Number.parseInt(tries, 10) || 0;
	try {
		if (!folder || !fs.existsSync(old) || !fs.existsSync(uninstaller)) {
			fs.rmSync(OLD_FOR_EVERYONE(), { force: true });
			return;
		}
		if (asked >= OLD_TRIES) return;
		fs.writeFileSync(OLD_FOR_EVERYONE(), `﻿${folder}\r\n${asked + 1}`, 'utf16le');
		const script = path.join(app.getPath('temp'), 'praiamob-tirar-antigo.ps1');
		fs.copyFileSync(SCRIPT(TAKE_OLD), script);
		startOutlasting(script, {
			...process.env,
			PRAIAMOB_DESINSTALADOR: uninstaller,
			PRAIAMOB_PASTA: path.dirname(process.execPath),
			PRAIAMOB_ANTIGO: old,
			PRAIAMOB_MARCA: OLD_FOR_EVERYONE()
		});
	} catch (error) {
		report('erro', 'A instalação antiga para todos os usuários não foi tirada', { pasta: folder, vezes: asked, erro: String(error?.message ?? error).slice(0, 2000) });
	}
}

/**
 * The very start of an installed program: opened again while an install runs (closed a moment before, the
 * installer still going), it gives way at once, and the install opens it once done. Says whether it gives way.
 */
function givesWayToInstall() {
	if (!app.isPackaged || smokeReport || process.platform !== 'win32' || !installRunning()) return false;
	try {
		fs.writeFileSync(REOPEN_AFTER(), '');
	} catch {
		// Not opened again by the install: it is opened by hand.
	}
	return true;
}

/** What the install that ran last wrote down, reported: whether the program waiting is the one open now, and each step. */
function reportLastInstall() {
	// Run from its code, the program shares that local folder with the one installed, and leaves this to it.
	if (!app.isPackaged || smokeReport) return;
	let steps;
	try {
		// Written by Windows PowerShell in the code page of Windows.
		steps = fs.readFileSync(INSTALL_LOG(), 'latin1').trim();
		fs.rmSync(INSTALL_LOG(), { force: true });
	} catch {
		return;
	}
	const waiting = waitingProgram();
	if (!waiting || !after(waiting.versao, app.getVersion())) report('uso', 'O programa novo foi instalado', { passos: steps.slice(0, 4000) });
	else report('erro', 'O programa novo não foi instalado', { versao: waiting.versao, tentativas: Number(waiting.tentativas) || 0, passos: steps.slice(0, 4000) });
}

/**
 * The start of an installed program, before the editor: a program fetched and waiting that was not installed as the
 * program closed (closed with the installer still going, or the install failed) is installed now, before anything
 * is being worked on, the window saying so; the program opens again on it. Tried `START_TRIES` times; after that,
 * only as the program closes, the relatos saying each time how it went. Says whether the program closes for it.
 */
async function installAtStart() {
	if (STORE) return false;
	const waiting = waitingProgram();
	if (!waiting) return false;
	if (!stillWaiting(waiting)) {
		// Installed: nothing waits. Its installer gone: nothing to install, but the note stays, with how often it was
		// fetched (see `update-available`), until a newer one is fetched or this one is installed.
		if (!after(waiting.versao, app.getVersion())) keepWaiting(null);
		return false;
	}
	if ((Number(waiting.tentativas) || 0) >= START_TRIES) return false;
	const say = { titulo: 'Atualizando o PraiaMob', texto: 'Instalando a versão nova do programa.', nota: '' };
	sayAtStart(say);
	if (!(await wholeInstaller(waiting))) {
		// Fetched again by the updater, which checks it too; the note stays, as above, as not to be installed.
		keepWaiting({ ...waiting, tamanho: -1 });
		report('erro', 'O instalador do programa novo estava estragado: é baixado de novo', { versao: waiting.versao });
		sayAtStart({ titulo: '', texto: '' });
		return false;
	}
	// Said again, now that the page has had time to load.
	sayAtStart(say);
	if (!installProgram(waiting, { reopen: true })) {
		sayAtStart({ titulo: '', texto: '' });
		return false;
	}
	// The screen of the install takes over as this one closes.
	setTimeout(() => app.exit(0), 800);
	return true;
}

/** The start of an installed program: the program waiting first (see `installAtStart`), then the editor of the site. */
async function startInstalled(site) {
	if (await installAtStart()) return new Promise(() => {});
	await site.atStart();
}

/**
 * Keeps a program that was installed up to date from the releases of the site: the newer one is fetched in the
 * background and noted (see `WAITING_PROGRAM`), and installed by the program itself (see `INSTALLER`) as it is closed;
 * if that did not go, at the next start. The program run from its code follows that code instead (see `followSource`).
 */
function followReleases() {
	if (!app.isPackaged || STORE || smokeReport) return;
	// Closed with a program waiting: it is installed now, the screen saying so while it is.
	let installing = false;
	app.on('will-quit', () => {
		const waiting = waitingProgram();
		if (!installing && stillWaiting(waiting) && mayTry(waiting)) installing = installProgram(waiting, { reopen: false });
		// An install for every user left from before: the install just handed over takes it away itself.
		if (!installing) takeOldForEveryone();
	});
	let updater;
	try {
		// Installed with the program, beside the start (see `carregador.cjs`): the folder of its code fetched does not carry it.
		({ autoUpdater: updater } = (global.praiamobPrograma?.requerer ?? require)('electron-updater'));
	} catch (error) {
		report('erro', 'O atualizador do programa não carregou', { erro: String(error?.message ?? error).slice(0, 2000) });
		return;
	}
	// Where the versions of the program are published: told from inside the program (`atualizacao.yml`), not by a
	// file left beside it in the folder it is installed in.
	const told = path.join(__dirname, 'atualizacao.yml');
	if (fs.existsSync(told)) updater.updateConfigPath = told;
	// The program itself changes seldom, and is not what Novidades shows (that is the editor, see `followSite`): the
	// updater fetches it in the background, and the program installs it (see `INSTALLER`), not the updater, so that
	// it is known how each install went.
	updater.autoDownload = true;
	updater.autoInstallOnAppQuit = false;
	// Only a program numbered higher than this one is taken: every one is published under a number above all the
	// ones before it (`programNumber` in publicar.mjs, from 0.15.0 on, above the copies numbered from 0.4 too), so a
	// release published by mistake under a lower number never takes a program back.
	updater.allowDowngrade = false;
	// The editor does not come up: the program waiting is installed at once, and opened again after.
	let installingNow = false;
	const installIfDown = () => {
		if (installingNow || !down()) return;
		const waiting = waitingProgram();
		if (!stillWaiting(waiting) || !mayTry(waiting)) return;
		installingNow = true;
		report('erro', 'O editor não abria: o programa novo é instalado já', { esperou: downFor, versao: waiting.versao });
		if (installProgram(waiting, { reopen: true })) app.exit(0);
	};
	// The fetches of the program waiting in the last day (see `update-available`).
	const lately = (waiting) => (Array.isArray(waiting?.baixadas) ? waiting.baixadas.filter((at) => Date.now() - Number(at) < TRIED_AGAIN_AFTER) : []);
	// The same program fetched and gone again and again (taken away by an antivirus, most often) is fetched at most
	// three times a day: else every ten minutes, some 220 MB each, while the program is open.
	const FETCHES = 3;
	let held = false;
	updater.on('update-available', (info) => {
		const waiting = waitingProgram();
		updater.autoDownload = waiting?.versao !== info.version || stillWaiting(waiting) || lately(waiting).length < FETCHES;
		if (updater.autoDownload || held) return;
		held = true;
		report('erro', 'O programa novo some depois de baixado: baixado de novo só amanhã', { versao: info.version, vezes: lately(waiting).length });
	});
	// Fetched (or found fetched before, and whole): noted with its sum, for the install.
	updater.on('update-downloaded', (info) => {
		const file = info.downloadedFile ?? updater.installerPath;
		if (typeof file !== 'string') return;
		const published = (info.files ?? []).find((each) => path.basename(String(each.url)) === path.basename(file)) ?? info.files?.[0];
		let size = 0;
		let made = 0;
		try {
			({ size, mtimeMs: made } = fs.statSync(file));
		} catch {
			return;
		}
		const before = waitingProgram();
		const same = before?.versao === info.version;
		// Fetched now, not found as it was fetched before: counted.
		const fetchedNow = !same || before.instalador !== file || before.feito !== made;
		keepWaiting({
			versao: info.version,
			instalador: file,
			sha512: published?.sha512 ?? info.sha512,
			tamanho: size,
			feito: made,
			tentativas: same ? Number(before.tentativas) || 0 : 0,
			tentada: same ? Number(before.tentada) || 0 : 0,
			baixadas: [...(same ? lately(before) : []), ...(fetchedNow ? [Date.now()] : [])]
		});
		installIfDown();
	});
	setInterval(installIfDown, 5000);
	// No network, or nothing published yet: it is tried again later. Each kind of failure is reported once.
	const failed = new Set();
	updater.on('error', (error) => {
		const said = String(error?.message ?? error).slice(0, 2000);
		if (failed.has(said)) return;
		failed.add(said);
		report('erro', 'A atualização do programa falhou', { erro: said });
	});
	// Looked for every ten minutes, and when the window is come back to after a while; one published while another
	// waits is fetched as well, and installed in its place.
	let looked = 0;
	const look = () => {
		if (Date.now() - looked < 60_000) return;
		looked = Date.now();
		void updater.checkForUpdates().catch(() => {});
	};
	look();
	setInterval(look, 10 * 60 * 1000);
	// Every two minutes while the editor does not come up.
	setInterval(() => {
		if (down()) look();
	}, 2 * 60 * 1000);
	app.on('browser-window-focus', () => {
		if (Date.now() - looked > 3 * 60_000) look();
	});
}
/**
 * The versions of the code of the program that did not run (see `carregador.cjs`), lately: neither run nor fetched again
 * for a while; a version listed long ago is fetched again.
 */
function shellsFailed() {
	try {
		const listed = JSON.parse(fs.readFileSync(global.praiamobPrograma.falhou, 'utf8'));
		return Array.isArray(listed) ? listed.filter((each) => typeof each?.versao === 'string') : [];
	} catch {
		return [];
	}
}

/** The folders of the code of the program fetched, there now: where, which version, and whether it runs on this engine. */
function shellsFetched() {
	const found = [];
	for (const place of global.praiamobPrograma?.locais ?? []) {
		let entries = [];
		try {
			entries = fs.readdirSync(place, { withFileTypes: true });
		} catch {
			continue;
		}
		for (const entry of entries) {
			if (!entry.isDirectory() || entry.name === 'instalado') continue;
			const folder = path.join(place, entry.name);
			let told = null;
			try {
				told = JSON.parse(fs.readFileSync(path.join(folder, 'versao.json'), 'utf8'));
			} catch {
				// Cut short, or not one of these: taken away below.
			}
			found.push({ folder, versao: typeof told?.versao === 'string' ? told.versao : null, fits: told?.electron === process.versions.electron && told?.carregador === global.praiamobPrograma.carregador });
		}
	}
	return found;
}

/** The folder being fetched now (`.baixando`): never taken away from under its fetch. */
let fetchingShell = null;

/**
 * Keeps the code of an installed program up to date from the site, between installers (see `carregador.cjs`): a newer
 * version for this engine, listed in `programa/versao.json` with each file and its sum, is fetched into a folder of its
 * own, beside the program or, where that cannot be written, in its local folder, each file checked by its sum, and
 * runs from the next start; never under the one working. An engine of its own (another Electron) comes only by an
 * installer (see `followReleases`). Looked for a moment after the start, every ten minutes and as the window is come
 * back to.
 */
function followShell() {
	const own = global.praiamobPrograma;
	if (!app.isPackaged || smokeReport || STORE || !own?.locais) return;
	let fetching = false;
	let asked = 0;
	const failed = new Set();
	const look = async () => {
		if (fetching || Date.now() - asked < 60_000) return;
		fetching = true;
		asked = Date.now();
		let folder = null;
		try {
			const told = JSON.parse((await fetchBytes(`${SITE_ADDRESS}programa/versao.json?t=${Date.now()}`)).toString('utf8'));
			if (typeof told.versao !== 'string' || !Array.isArray(told.files) || told.files.length === 0) return;
			if (told.electron !== process.versions.electron || told.carregador !== own.carregador) return;
			const aside = shellsFailed().some((each) => each.versao === told.versao && Math.abs(Date.now() - (Number(each.em) || 0)) < 6 * 60 * 60 * 1000);
			const newest = shellsFetched()
				.filter((each) => each.fits && each.versao)
				.reduce((best, each) => (after(each.versao, best) ? each.versao : best), own.versao);
			if (aside || !after(told.versao, newest)) return;
			const named = told.versao.replace(/[^0-9.]/g, '');
			const place = own.locais.find((each) => writable(each)) ?? own.locais[1];
			const target = path.join(place, named);
			folder = `${target}.baixando`;
			fetchingShell = folder;
			removeTree(folder);
			removeTree(target);
			for (const file of told.files) {
				if (typeof file.path !== 'string' || file.path.split('/').some((part) => part === '..' || part === '') || file.path === 'versao.json') throw new Error(`fora do programa: ${file.path}`);
				const bytes = await fetchBytes(`${SITE_ADDRESS}programa/${encodeURIComponent(told.versao)}/${file.path.split('/').map(encodeURIComponent).join('/')}?v=${told.versao}`);
				if (sumOf(bytes) !== file.sha256) throw new Error(`soma diferente: ${file.path}`);
				const at = path.join(folder, ...file.path.split('/'));
				fs.mkdirSync(path.dirname(at), { recursive: true });
				fs.writeFileSync(at, bytes);
			}
			// Last, what the start goes by: a folder cut short, without it, is never run.
			fs.writeFileSync(path.join(folder, 'versao.json'), JSON.stringify({ versao: told.versao, electron: told.electron, carregador: told.carregador }));
			await fs.promises.rename(folder, target);
			folder = null;
			report('uso', 'O programa novo foi baixado: entra na próxima abertura', { versao: told.versao, pasta: place });
		} catch (error) {
			const said = String(error?.message ?? error).slice(0, 2000);
			if (!failed.has(said)) {
				failed.add(said);
				report('erro', 'A atualização do programa falhou', { erro: said, por: 'site' });
			}
		} finally {
			if (folder) removeTree(folder);
			fetchingShell = null;
			fetching = false;
		}
	};
	setTimeout(() => void look(), 15_000);
	setInterval(() => void look(), 10 * 60_000);
	app.on('browser-window-focus', () => void look());
}

/**
 * At the start of an installed program, a moment after: what the start put aside is reported (once each), and the
 * folders of its code not needed any more are taken away: older than the one running, put aside, for another engine,
 * or cut short. A newer one waiting for the next start stays.
 */
function tidyShells() {
	const own = global.praiamobPrograma;
	if (!app.isPackaged || smokeReport || !own?.locais) return;
	const listed = shellsFailed();
	if (listed.some((each) => !each.relatado)) {
		for (const each of listed.filter((one) => !one.relatado)) report('erro', 'O programa baixado não abriu: voltou ao anterior', { versao: each.versao, motivo: String(each.motivo ?? '').slice(0, 4000) });
		try {
			fs.writeFileSync(own.falhou, JSON.stringify(listed.map((each) => ({ ...each, relatado: true }))));
		} catch {
			// Reported again at the next start.
		}
	}
	const aside = new Set(listed.map((each) => each.versao));
	for (const each of shellsFetched()) {
		if (each.folder === own.pasta || each.folder === fetchingShell || `${each.folder}.baixando` === fetchingShell) continue;
		const waiting = each.fits && each.versao && after(each.versao, own.versao) && !aside.has(each.versao);
		if (!waiting) removeTree(each.folder);
	}
}

/**
 * Windows' list of programs says the version shown (the editor's, as Sobre says), not the one of the installer, which
 * an update of the editor or of the program brings no more. Only the line of this install for this user: the key the
 * installer writes it under, by the program's id (as electron-builder makes it), and its folder this one.
 */
let listedAs = null;
function nameInWindowsList(version) {
	if (process.platform !== 'win32' || !app.isPackaged || STORE || smokeReport || triedOut || !version || version === '0.0.0' || listedAs === version) return;
	listedAs = version;
	const hash = crypto.createHash('sha1').update(Buffer.from('50e065bc313411e69bab38c9862bdaf3', 'hex')).update(APP_ID, 'utf8').digest();
	hash[6] = (hash[6] & 0x0f) | 0x50;
	hash[8] = (hash[8] & 0x3f) | 0x80;
	const id = hash.subarray(0, 16).toString('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
	const key = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${id}`;
	const quiet = { windowsHide: true, encoding: 'utf8' };
	execFile('reg', ['query', `HKCU\\Software\\${id}`, '/v', 'InstallLocation'], quiet, (error, said) => {
		const folder = /InstallLocation\s+REG_\w+\s+(.+)$/m.exec(said ?? '')?.[1]?.trim();
		if (error || !folder || path.resolve(folder).toLowerCase() !== path.dirname(process.execPath).toLowerCase()) return;
		execFile('reg', ['add', key, '/v', 'DisplayVersion', '/t', 'REG_SZ', '/d', version, '/f'], quiet, () => {});
		execFile('reg', ['add', key, '/v', 'DisplayName', '/t', 'REG_SZ', '/d', `${NAME} ${version}`, '/f'], quiet, () => {});
	});
}

let window = null;

function openWindow(updating = null, firstPage = updatingPage) {
	window = new BrowserWindow({
		width: 1440,
		height: 900,
		minWidth: 1024,
		minHeight: 640,
		show: false,
		backgroundColor: '#16191e',
		title: NAME,
		// Installed, the window takes the mark of the executable it runs in.
		icon: app.isPackaged ? undefined : ICON,
		// No bar of the system over the window: the editor draws its own, with the menus in it
		// and the buttons that put the window down, make it fill the screen and close it.
		frame: false,
		webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false }
	});
	nameOnTaskbar(window);
	window.once('ready-to-show', () => {
		if (smokeReport || unseen) return;
		window.maximize();
		window.show();
	});
	window.on('closed', () => (window = null));
	window.on('session-end', () => (sessionEnding = true));
	reportStopped(window);
	// An editor fetched from the site whose page is not there, or does not load, gives way to the one installed.
	window.webContents.on('did-navigate', (_event, _address, code) => {
		if (code >= 400) fallBack(`página ${code}`);
	});
	window.webContents.on('did-fail-load', (_event, code, description, _address, mainFrame) => {
		// Cut short by the next load (-3) is no failure.
		if (mainFrame && code !== -3) fallBack(description || `falha ${code}`);
	});
	// The editor draws the button that fills the screen as what it will do next.
	const state = () => window?.webContents.send('desktop:window-state', windowState());
	window.on('maximize', state);
	window.on('unmaximize', state);
	// The title is what the editor calls its page, the file that is open and the name of the
	// program, and after it which build this is.
	let page = NAME;
	const title = () => window?.setTitle(`${page} ${buildName()}`);
	window.webContents.on('did-start-loading', () => {
		shown = buildThere();
		told = null;
		editorUp = false;
		// Showing the build that was ready: there is nothing more to offer. Loaded again on the one it had (as when
		// the cloud brings changes), the one ready is still offered.
		if (update.state === 'ready' && shown && shown.built === readyBuilt) update = { state: 'idle', progress: 0, note: '' };
		title();
	});
	window.on('page-title-updated', (event, named) => {
		event.preventDefault();
		if (named.endsWith(NAME)) page = named;
		title();
	});
	// The editor is the whole program: links that lead elsewhere open in the system's browser.
	window.webContents.setWindowOpenHandler(({ url }) => {
		if (/^https?:/.test(url)) openOutside(url);
		else if (url.startsWith(`${HOME}render`)) openRenderWindow(url);
		return { action: 'deny' };
	});
	// For whoever is helping a user find out what went wrong.
	window.webContents.on('before-input-event', (_event, input) => {
		if (devTools(input)) window.webContents.toggleDevTools();
	});
	if (updating) {
		// Started with a newer version than the one there (announced, run from the code; on the site, installed): the
		// window says so while it is made or fetched, and then shows the editor as it is now, not as it was. Nothing
		// is being worked on yet that a reload could lose.
		starting = true;
		void window.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(firstPage())}`);
		void updating
			.catch(() => {})
			.then(() => {
				starting = false;
				downFor = 0;
				tryEditor();
				if (window) void window.loadURL(HOME);
			});
	} else void window.loadURL(HOME);
	if (smokeReport) smoke(window, smokeReport);
}

/** Looks at the editor once it has had time to come up, and writes down whether it did. */
function smoke(target, reportFile) {
	const errors = [];
	// Newer Electrons describe the message in the event itself; Electron 22 passes its parts one by one.
	target.webContents.on('console-message', (...told) => {
		const [event] = told;
		const failed = typeof event.level === 'string' ? event.level === 'error' : told[1] >= 3;
		if (failed) errors.push(String(event.message ?? told[2]).slice(0, 300));
	});
	const finish = async (report) => {
		// A picture of what came up, beside the report, for an eye to judge what a check cannot.
		const picture = await target.webContents.capturePage().catch(() => null);
		if (picture) fs.writeFileSync(reportFile.replace(/\.json$/, '') + '.png', picture.toPNG());
		fs.writeFileSync(reportFile, JSON.stringify({ ...report, errors, versions: process.versions }, null, '\t'));
		app.exit(0);
	};
	// Drawn, but not put in front of whatever the user is doing; with `--sem-janela`, not shown at all.
	target.once('ready-to-show', () => {
		if (!unseen) target.showInactive();
	});
	target.webContents.once('did-fail-load', (_event, code, description) => finish({ loaded: false, description }));
	target.webContents.once('did-finish-load', () => {
		setTimeout(() => {
			target.webContents
				.executeJavaScript(
					`(() => {
						const probe = document.createElement('canvas').getContext('webgl2');
						const info = probe && probe.getExtension('WEBGL_debug_renderer_info');
						return {
							loaded: true,
							title: document.title,
							menus: document.querySelectorAll('.topbar nav button').length,
							view: document.querySelector('.view3d canvas') !== null,
							unavailable: document.querySelector('.view3d .unavailable') !== null,
							library: document.querySelectorAll('.library .card').length,
							webgl2: probe !== null,
							renderer: info ? probe.getParameter(info.UNMASKED_RENDERER_WEBGL) : null
						};
					})()`
				)
				.then(finish, (error) => finish({ loaded: false, description: String(error) }));
		}, 6000);
	});
}

if (!app.requestSingleInstanceLock()) {
	app.quit();
} else {
	// Holding the program: a start of the code fetched on trial is counted (see `carregador.cjs`).
	global.praiamobPrograma?.comecou?.();
	// A project double-clicked while the program is open goes to the window that is already there; so does an
	// account handed by the site.
	app.on('second-instance', (_event, args) => {
		const project = projectFrom(args.slice(1));
		const account = signInFrom(args.slice(1));
		// Started a second time before its window is there: they wait for the editor to ask for them.
		if (!window) {
			if (project) launched = project;
			if (account) handed = account;
			return;
		}
		if (window.isMinimized()) window.restore();
		if (!window.isVisible()) window.show();
		window.focus();
		if (project) window.webContents.send('desktop:open-file', project);
		if (account) window.webContents.send('desktop:signed-in', account);
	});
	ipcMain.handle('desktop:handed-sign-in', () => {
		const account = handed;
		handed = null;
		return account;
	});

	// The notices of the licences of what the program is built on, kept out of the folder people see (see
	// `depois-de-empacotar.cjs`): Sobre opens their folder.
	ipcMain.on('desktop:notices', () => {
		void shell.openPath(path.join(process.resourcesPath, 'licencas'));
	});

	ipcMain.handle('desktop:launch-file', () => {
		const project = launched;
		launched = null;
		return project;
	});
	// Saving a project that was opened by double click writes it back where it was opened from.
	// Only a project file that is there is written over; anywhere else is asked for in the editor.
	// It is written beside itself first and then put in its place, so that a write cut short leaves the file whole.
	ipcMain.handle('desktop:save-file', (_event, file, data) => {
		if (typeof file !== 'string' || !(typeof data === 'string' || data instanceof Uint8Array)) return false;
		if (!path.isAbsolute(file) || projectKindOf(file) === null || !fs.existsSync(file)) return false;
		const beside = `${file}.salvando`;
		try {
			if (typeof data === 'string') fs.writeFileSync(beside, data, 'utf8');
			else fs.writeFileSync(beside, Buffer.from(data.buffer, data.byteOffset, data.byteLength));
			fs.renameSync(beside, file);
			return true;
		} catch {
			try {
				fs.unlinkSync(beside);
			} catch {
				// Nothing was left beside it.
			}
			return false;
		}
	});
	// Asked for by the editor, from the update by the cloud, once a newer build is ready: the program starts again
	// where it was. Only the editor is loaded anew, which is quick and keeps the window; a program whose own code
	// changed is started again whole. The projects, the windows open over them and the camera come back as they were.
	ipcMain.on('desktop:reload', () => {
		// Installed: the editor fetched is all there already, and is only loaded; the program itself, if a newer one
		// was fetched, is installed when it is closed.
		if (fetchedSite) {
			showFetched();
			return;
		}
		if (!app.isPackaged && shellChanged()) {
			app.relaunch();
			app.exit(0);
		} else window?.webContents.reloadIgnoringCache();
	});
	// The buttons of the bar a window draws: the editor's, or a render's.
	ipcMain.on('desktop:window', (event, what) => {
		const target = BrowserWindow.fromWebContents(event.sender);
		if (!target) return;
		if (what === 'minimize') target.minimize();
		else if (what === 'maximize') target.isMaximized() ? target.unmaximize() : target.maximize();
		else if (what === 'close') target.close();
	});
	ipcMain.handle('desktop:window-state', (event) => windowState(BrowserWindow.fromWebContents(event.sender) ?? window));
	ipcMain.handle('desktop:update-state', () => update);
	// The editor is up and says where its reports go and who it is: what the program kept to send goes now.
	ipcMain.on('desktop:reports-are', (event, said) => {
		// Said once the editor is on the screen (see `reports.ts`): the one fetched that was on trial came up.
		if (event.sender === window?.webContents) {
			editorUp = true;
			downFor = 0;
			if (trial?.site === SITE) trial = null;
			// The code of the program came through its trial too (see `carregador.cjs`), and Windows' list says the version shown.
			global.praiamobPrograma?.subiu?.();
			nameInWindowsList(versionIn(SITE));
		}
		if (!said || typeof said.at !== 'string' || !/^https:\/\/[a-z0-9]+\.supabase\.co\/rest\/v1\/relatos$/.test(said.at)) return;
		if (typeof said.key !== 'string') return;
		reportsTo = {
			at: said.at,
			key: said.key,
			sessao: typeof said.sessao === 'string' ? said.sessao : null,
			maquina: typeof said.maquina === 'string' ? said.maquina : null,
			conta: typeof said.conta === 'string' ? said.conta : null
		};
		sendReports();
	});
	// Another process of the program fell (the one that draws, most often): reported.
	app.on('child-process-gone', (_event, details) => {
		if (details.reason === 'clean-exit') return;
		report('queda', 'Um processo do programa caiu', { processo: details.type, nome: details.name ?? null, motivo: details.reason, codigo: details.exitCode });
	});
	// Signing in to the cloud by Google, in the computer's own browser (see `signInOutside`): the account it gives is
	// handed to the editor, whose window comes back in front. The editor itself never leaves its page. One sign-in
	// waits at a time: asked again, as when the browser's page was closed, the one before is given up.
	let signingIn = null;
	ipcMain.handle('desktop:google-sign-in', async (event, address) => {
		if (typeof address !== 'string' || !/^https:\/\/[a-z0-9]+\.supabase\.co\/auth\/v1\/authorize\?/.test(address)) return null;
		const owner = BrowserWindow.fromWebContents(event.sender);
		signingIn?.giveUp();
		const asked = signInOutside(address, openOutside);
		signingIn = asked;
		const closed = () => asked.giveUp();
		owner?.once('closed', closed);
		const said = await asked.done;
		if (signingIn === asked) signingIn = null;
		if (!owner || owner.isDestroyed()) return null;
		owner.removeListener('closed', closed);
		if (said) {
			if (owner.isMinimized()) owner.restore();
			if (!owner.isVisible()) owner.show();
			owner.focus();
		}
		return said;
	});
	// The work kept on this computer, the same the pages of the development server keep (see `sharedData`).
	const isChanges = (changes) =>
		changes !== null && typeof changes === 'object' && Object.values(changes).every((text) => text === null || typeof text === 'string');
	ipcMain.handle('desktop:data-read', async () => (await sharedData()).read());
	ipcMain.handle('desktop:data-write', async (_event, changes, quiet) => (isChanges(changes) ? (await sharedData()).write(changes, quiet === true) : null));
	ipcMain.handle('desktop:data-state', async () => (await sharedData()).state());
	ipcMain.handle('desktop:data-archive-read', async (_event, slot) => {
		const bytes = typeof slot === 'string' ? (await sharedData()).readArchive(slot) : null;
		return bytes ? new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength) : null;
	});
	ipcMain.handle('desktop:data-archive-write', async (_event, slot, bytes) => {
		if (typeof slot !== 'string' || !(bytes === null || bytes instanceof Uint8Array)) return null;
		return (await sharedData()).writeArchive(slot, bytes && Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength));
	});

	app.whenReady().then(() => {
		// Opened again while an install runs: the install opens it once done.
		if (givesWayToInstall()) {
			app.exit(0);
			return;
		}
		reportLastInstall();
		// The editor has its own bars and menus.
		Menu.setApplicationMenu(null);
		serveEditor();
		// Installed, the newest editor there is, the one it came with or one fetched since: one fetched is on trial
		// until it comes up (see `fallBack`).
		SITE = newestSite();
		tryEditor();
		setInterval(() => {
			// The start is not the editor failing to come up.
			if (starting) return;
			downFor = editorUp ? 0 : downFor + 5;
			// The editor shown does not come up, and one is fetched and waiting: shown at once.
			if (down() && fetchedSite) showFetched();
			if (!trial) return;
			trial.waited += 5;
			if (trial.waited >= TRIAL_FOR) fallBack('não abriu');
		}, 5000);
		shortcutIcon = keepShortcutIcons();
		// Run from the code, a version announced since the last build is built before the editor is shown; installed,
		// a newer version on the site is fetched before it (see `followSite`).
		const site = followSite();
		const building = followSource();
		if (building) openWindow(building);
		else if (site) openWindow(startInstalled(site), startPage);
		else openWindow();
		watchBuilds();
		followReleases();
		followShell();
		setTimeout(tidyShells, 10_000);
		// Installed, the program is the one the site's links open; never a copy tried out apart, which would take them
		// from the program installed.
		// From the Store, its package says so to Windows.
		if (app.isPackaged && !STORE && !smokeReport && !unseen && !app.commandLine.hasSwitch('user-data-dir')) app.setAsDefaultProtocolClient('praiamob');
		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) openWindow();
		});
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});
}
