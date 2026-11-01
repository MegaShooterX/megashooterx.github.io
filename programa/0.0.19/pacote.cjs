// The editor the program shows, in one file of its own (`editor.pak`): every file of it one after the other, then the
// list of them (where each is, how long, its sum) and, last, where that list is. Read where it lies, a file at a time,
// as the window asks for it; made by the publishing (`scripts/publicar.mjs`) for the installer, and by the program
// for each newer editor it fetches from the site (`followSite` in main.cjs), from the files that changed and the rest
// of the one it has. An editor may also be a folder of those files, as the program run from its code has it.

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const MAGIC = 'PMPK';
/** The end of a pack: where its list begins (8 bytes), how long the list is (4) and the mark (4). */
const TAIL = 16;

const sumOf = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

/** An editor packed in one file. */
class Pack {
	constructor(file) {
		this.at = file;
		this.handle = fs.openSync(file, 'r');
		const size = fs.fstatSync(this.handle).size;
		const tail = Buffer.alloc(TAIL);
		fs.readSync(this.handle, tail, 0, TAIL, size - TAIL);
		if (tail.toString('ascii', 12, 16) !== MAGIC) throw new Error(`não é um pacote: ${file}`);
		const listAt = tail.readUInt32LE(0) + tail.readUInt32LE(4) * 2 ** 32;
		const list = Buffer.alloc(tail.readUInt32LE(8));
		fs.readSync(this.handle, list, 0, list.length, listAt);
		this.list = JSON.parse(list.toString('utf8'));
	}

	has(name) {
		return Object.prototype.hasOwnProperty.call(this.list.files, name);
	}

	/** Its bytes, read now. */
	read(name) {
		const [at, length] = this.list.files[name];
		const bytes = Buffer.alloc(length);
		fs.readSync(this.handle, bytes, 0, length, at);
		return bytes;
	}

	/** Its bytes, read without holding the program. */
	readLater(name) {
		const [at, length] = this.list.files[name];
		const bytes = Buffer.alloc(length);
		return new Promise((resolve, reject) => fs.read(this.handle, bytes, 0, length, at, (error) => (error ? reject(error) : resolve(bytes))));
	}

	sum(name) {
		return this.list.files[name]?.[2] ?? null;
	}

	close() {
		try {
			fs.closeSync(this.handle);
		} catch {
			// Closed already.
		}
	}
}

/** An editor as a folder of its files. */
class Folder {
	constructor(folder) {
		this.at = folder;
	}

	#where(name) {
		const wanted = path.normalize(path.join(this.at, name));
		return wanted.startsWith(this.at + path.sep) ? wanted : null;
	}

	has(name) {
		const wanted = this.#where(name);
		try {
			return wanted !== null && fs.statSync(wanted).isFile();
		} catch {
			return false;
		}
	}

	read(name) {
		return fs.readFileSync(this.#where(name));
	}

	readLater(name) {
		return fs.promises.readFile(this.#where(name));
	}

	sum(name) {
		return this.has(name) ? sumOf(this.read(name)) : null;
	}

	close() {}
}

const opened = new Map();

/** The editor at a place, a pack or a folder; opened once, and kept open while it is used. */
function editorAt(place) {
	let editor = opened.get(place);
	if (!editor) {
		editor = place.toLowerCase().endsWith('.pak') ? new Pack(place) : new Folder(place);
		opened.set(place, editor);
	}
	return editor;
}

/** Lets go of an editor no longer shown, so that its file can be taken away. */
function closeEditor(place) {
	opened.get(place)?.close();
	opened.delete(place);
}

/**
 * What the build of an editor says of itself (`build.json`); `null` when it cannot be read. One not open already is
 * let go after, so that looking at it never keeps its file from being taken away.
 */
function buildOf(place) {
	const kept = opened.get(place);
	let editor = kept;
	try {
		editor ??= place.toLowerCase().endsWith('.pak') ? new Pack(place) : new Folder(place);
		return JSON.parse(editor.read('build.json').toString('utf8'));
	} catch {
		return null;
	} finally {
		if (!kept) editor?.close();
	}
}

/**
 * Writes a pack, a file at a time, in the order they are given (a file given while another is being written waits
 * its turn); `finish` writes the list and the end. Written beside where it goes, and put there by whoever made it.
 */
async function packWriter(file) {
	const handle = await fs.promises.open(file, 'w');
	const files = {};
	let length = 0;
	let queue = Promise.resolve();
	return {
		add(name, bytes, sum = sumOf(bytes)) {
			queue = queue.then(async () => {
				await handle.write(bytes, 0, bytes.length, length);
				files[name] = [length, bytes.length, sum];
				length += bytes.length;
			});
			return queue;
		},
		async finish() {
			await queue;
			const list = Buffer.from(JSON.stringify({ files }), 'utf8');
			const tail = Buffer.alloc(TAIL);
			tail.writeUInt32LE(length % 2 ** 32, 0);
			tail.writeUInt32LE(Math.floor(length / 2 ** 32), 4);
			tail.writeUInt32LE(list.length, 8);
			tail.write(MAGIC, 12, 'ascii');
			await handle.write(list, 0, list.length, length);
			await handle.write(tail, 0, TAIL, length + list.length);
			// On the disk before it is put in its place: a power cut after could leave a pack whole at its end and empty
			// in the middle, which would be shown.
			await handle.sync().catch(() => {});
			await handle.close();
		},
		async abandon() {
			await handle.close().catch(() => {});
		}
	};
}

/** Packs a folder of an editor into one file, every file of it by its path with forward slashes. */
async function packFolder(folder, file) {
	const writer = await packWriter(file);
	const walk = async (at, base) => {
		for (const entry of fs.readdirSync(at, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
			const full = path.join(at, entry.name);
			const name = base ? `${base}/${entry.name}` : entry.name;
			if (entry.isDirectory()) await walk(full, name);
			else await writer.add(name, fs.readFileSync(full));
		}
	};
	await walk(folder, '');
	await writer.finish();
}

module.exports = { editorAt, closeEditor, buildOf, packWriter, packFolder, sumOf };
