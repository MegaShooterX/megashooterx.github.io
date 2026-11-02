// What the editor may ask of the desktop program it runs in: the project it was started to open,
// to be told of a newer build of itself and shown it, and the window it is in, whose bar it draws.

const { contextBridge, ipcRenderer } = require('electron');

// Asked by the program whether the page is alive: it answers when its code is free to (see `reportStopped`).
ipcRenderer.on('desktop:alive?', () => ipcRenderer.send('desktop:alive'));

contextBridge.exposeInMainWorld('desktop', {
	/** The project the program was started to open, once: `{ name, text }` or `{ name, bytes }`, with its `path`; or `null`. */
	launchFile: () => ipcRenderer.invoke('desktop:launch-file'),
	/** Writes a project, as text or as the bytes of its archive, back into the file it was opened from, by where that file is. Resolves to whether it was written. */
	saveFile: (file, data) => ipcRenderer.invoke('desktop:save-file', file, data),
	/** Calls back with each project opened while the program is running. */
	onOpenFile: (opened) => {
		ipcRenderer.on('desktop:open-file', (_event, project) => opened(project));
	},
	/** Calls back when a newer build of the editor than the one shown is ready: `{ version, built, note }`. */
	onNewBuild: (ready) => {
		ipcRenderer.on('desktop:new-build', (_event, build) => ready(build));
	},
	/** Shows the build that is ready: the window loads the editor again, and the project stays as it is. */
	reload: () => ipcRenderer.send('desktop:reload'),
	/** The account the site handed the program as it was started, once: what Google gave back after `#`, or `null`. */
	handedSignIn: () => ipcRenderer.invoke('desktop:handed-sign-in'),
	/** Calls back with each account the site hands the program while it is open. */
	onSignedIn: (taken) => {
		ipcRenderer.on('desktop:signed-in', (_event, account) => taken(account));
	},
	/** Where the update stands now: `{ state: 'idle' | 'building' | 'ready', progress, note }`. */
	updateState: () => ipcRenderer.invoke('desktop:update-state'),
	/** Calls back each time the update moves on: a build begun, how far it has got, ready to restart. */
	onUpdate: (changed) => {
		ipcRenderer.on('desktop:update', (_event, update) => changed(update));
	},
	/** Puts the window down ('minimize'), makes it fill the screen or go back ('maximize'), or closes it ('close'). */
	windowDo: (what) => ipcRenderer.send('desktop:window', what),
	/** How the window is now: `{ maximized, build }`, the build as the day and hour it was made. */
	windowState: () => ipcRenderer.invoke('desktop:window-state'),
	/** Calls back each time the window fills the screen or stops filling it. */
	onWindowState: (changed) => {
		ipcRenderer.on('desktop:window-state', (_event, state) => changed(state));
	},
	/** Where the editor's reports go and who it is, for the program to report what the page cannot say itself (see `lib/reports.ts`). */
	reportsAre: (said) => ipcRenderer.send('desktop:reports-are', said),
	/** Opens the folder of the notices of the licences of what the program is built on. */
	notices: () => ipcRenderer.send('desktop:notices'),
	/** Opens Google at the address of the cloud given, in the computer's browser; gives what came back after `#`, or `null`. */
	googleSignIn: (address) => ipcRenderer.invoke('desktop:google-sign-in', address),
	/** The work kept on this computer, in the folder the pages of the development server use too (see `data-store.mjs`). */
	data: {
		/** Everything kept, `{ chaves, momentos, carimbo }`: each thing, when each was written, and the last change. */
		read: () => ipcRenderer.invoke('desktop:data-read'),
		/** Keeps each text given, or takes it away where it is `null`: `{ antes, carimbo }`. */
		write: (changes, quiet) => ipcRenderer.invoke('desktop:data-write', changes, quiet === true),
		/** The moment of the last change, `{ carimbo }`. */
		state: () => ipcRenderer.invoke('desktop:data-state'),
		/** The file of Promob a tab's project came from, as bytes; `null` for none. */
		readArchive: (slot) => ipcRenderer.invoke('desktop:data-archive-read', slot),
		/** Keeps the file of Promob of a tab, or forgets it when given `null`: `{ antes, carimbo }`. */
		writeArchive: (slot, bytes) => ipcRenderer.invoke('desktop:data-archive-write', slot, bytes),
		/** Calls back whenever anything kept changes, by this window or by another. */
		onChanged: (changed) => {
			ipcRenderer.on('desktop:data-changed', () => changed());
		}
	}
});
