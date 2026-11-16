// The library of Promob installed on this computer, read as it is: what each
// piece of it is called, the drawing it is drawn with (a `.PMOB`), its size,
// the materials of its parts, and the colours and pictures of those materials.
//
// Promob keeps its library under `files/System` of where it is installed:
// `bibliotecas` holds the pieces (`.entity`, `.group`, `.PMOB`), `materials`
// the materials (`.material`) and their pictures. `.entity`, `.group` and
// `.material` are written in Promob's own way of writing things down ("EJI"):
// a table of the words used, then values that are text, a character, nothing,
// one of the words, a list, or an object of pairs.
//
// Nothing of the library is copied into the program: it is read where Promob
// keeps it, on the computer whose Promob it is. The editor's server (Vite, in
// development) and the Windows program both answer `/_promob/…` with this.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// --- EJI ---

/** Reads a file written the EJI way into plain values: objects of pairs become objects, keys being the words of the table. */
export function readEji(bytes) {
	const words = [];
	let at = bytes.indexOf(0x59); // 'Y': the table of words begins
	if (at < 0) throw new Error('not EJI');
	const text = (from, length) => new TextDecoder('utf-8').decode(bytes.subarray(from, from + length));
	const u32 = (from) => (bytes[from] | (bytes[from + 1] << 8) | (bytes[from + 2] << 16) | (bytes[from + 3] << 24)) >>> 0;
	while (bytes[at] === 0x59) {
		const kind = bytes[at + 1];
		if (kind === 0x73) {
			const length = bytes[at + 2];
			words.push(text(at + 3, length));
			at += 3 + length;
		} else if (kind === 0x63) {
			words.push(String.fromCharCode(bytes[at + 2]));
			at += 3;
		} else throw new Error(`EJI: word of kind ${kind} at ${at}`);
	}
	const value = () => {
		const kind = bytes[at];
		switch (kind) {
			case 0x73: {
				// s: text, as long as the byte after says
				const length = bytes[at + 1];
				const read = text(at + 2, length);
				at += 2 + length;
				return read;
			}
			case 0x53: {
				// S: longer text, its length in four bytes
				const length = u32(at + 1);
				const read = text(at + 5, length);
				at += 5 + length;
				return read;
			}
			case 0x63: {
				const read = String.fromCharCode(bytes[at + 1]);
				at += 2;
				return read;
			}
			case 0x7a:
				at += 1;
				return null;
			case 0x30: {
				const word = words[bytes[at + 1]];
				at += 2;
				return word;
			}
			case 0x6f:
			case 0x4f: {
				// o: an object of pairs, as many as the byte after says (O: two bytes)
				const count = kind === 0x6f ? bytes[at + 1] : u32(at + 1);
				at += kind === 0x6f ? 2 : 5;
				const object = {};
				// None: a key alone, with nothing for it.
				if (count === 0) {
					object[value()] = null;
					return object;
				}
				for (let index = 0; index < count; index++) {
					const key = value();
					object[key] = value();
				}
				return object;
			}
			case 0x61:
			case 0x41: {
				const count = kind === 0x61 ? bytes[at + 1] : u32(at + 1);
				at += kind === 0x61 ? 2 : 5;
				const list = [];
				for (let index = 0; index < count; index++) list.push(value());
				return list;
			}
			default:
				throw new Error(`EJI: value of kind ${kind} (${String.fromCharCode(kind)}) at ${at}`);
		}
	};
	return value();
}

/** The things of an EJI tree: each `{ NAME: { a: {…attributes}, c: [children] } }` taken as `{ kind, attributes, children }`. */
function thingOf(node) {
	if (!node || typeof node !== 'object' || Array.isArray(node)) return null;
	const [kind] = Object.keys(node);
	const body = node[kind];
	if (!body || typeof body !== 'object') return { kind, attributes: {}, children: [] };
	// A thing that has only things in it is written as their list.
	if (Array.isArray(body)) return { kind, attributes: {}, children: body.map(thingOf).filter(Boolean) };
	return {
		kind,
		attributes: body.a && typeof body.a === 'object' ? body.a : {},
		children: Array.isArray(body.c) ? body.c.map(thingOf).filter(Boolean) : []
	};
}

function* every(thing, kind) {
	if (!thing) return;
	if (thing.kind === kind) yield thing;
	for (const child of thing.children) yield* every(child, kind);
}

// --- Where Promob is ---

/** The `files/System` folders of the Promobs installed here: under the user's documents, and the usual places. */
export function findSystems() {
	const found = [];
	const look = (folder, depth) => {
		if (depth < 0) return;
		let entries;
		try {
			entries = fs.readdirSync(folder, { withFileTypes: true });
		} catch {
			return;
		}
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			const inner = path.join(folder, entry.name);
			if (entry.name.toLowerCase() === 'system' && fs.existsSync(path.join(inner, 'bibliotecas'))) found.push(inner);
			else look(inner, depth - 1);
		}
	};
	const home = os.homedir();
	for (const start of [
		path.join(home, 'Documents', 'promob'),
		path.join(home, 'Documents', 'Promob'),
		path.join(home, 'Documentos', 'promob'),
		'C:\\Promob',
		'C:\\Program Files\\Promob',
		'C:\\Program Files (x86)\\Promob'
	]) {
		look(start, 5);
	}
	return [...new Set(found)];
}

// --- The index ---

const lower = (name) => name.toLowerCase();

/** Every file under a folder, by its path from there. */
function walk(root) {
	const files = [];
	const go = (folder) => {
		let entries;
		try {
			entries = fs.readdirSync(folder, { withFileTypes: true });
		} catch {
			return;
		}
		for (const entry of entries) {
			const full = path.join(folder, entry.name);
			if (entry.isDirectory()) go(full);
			else files.push(full);
		}
	};
	go(root);
	return files;
}

/**
 * The materials a `MATERIAL` of Promob stands for: its colour, its picture
 * (and how many millimetres one copy of it covers), how see-through, how
 * rough and how metallic it is. One marked as a folder of pictures stands for
 * one material per picture, each called by its id and the picture's name:
 * "tec_brancos_lisos" with "tecido 010.jpg" is "tec_brancos_lisos_tecido 010".
 */
function materialsOf(body, materialsRoot, pictures, system, stem) {
	const a = body?.a ?? {};
	if (!a.ID) return [];
	const said = {};
	const files = [];
	for (const each of Array.isArray(body.c) ? body.c : []) {
		if (!each || typeof each !== 'object') continue;
		for (const [key, value] of Object.entries(each)) {
			if (key === 'FILE' && value?.a?.NAME) files.push(value.a.NAME);
			else said[key] = value;
		}
	}
	const number = (key) => {
		const read = Number(said[key]);
		return said[key] !== null && said[key] !== undefined && said[key] !== '' && Number.isFinite(read) ? read : null;
	};
	const colour = said.COLORBASE?.a;
	const rgb = colour && ['R', 'G', 'B'].map((key) => Number(colour[key]));
	const textureFile = typeof said.TEXTUREFILE === 'string' && said.TEXTUREFILE ? path.normalize(path.join(materialsRoot, said.TEXTUREFILE.replace(/\\/g, path.sep))) : null;
	const relative = (file) => path.relative(system, file).split(path.sep).join('/');
	const pictureFor = (name, near) => {
		if (near) {
			const there = path.join(near, name);
			if (fs.existsSync(there)) return there;
		}
		return pictures.get(lower(name)) ?? null;
	};
	const base = {
		...(rgb && rgb.every((each) => Number.isFinite(each)) && { color: rgb }),
		...(number('ESCALETEXTUREX') && number('ESCALETEXTUREY') && { size: [number('ESCALETEXTUREX'), number('ESCALETEXTUREY')] }),
		...(number('TRANSPARENCY') !== null && { transparency: number('TRANSPARENCY') }),
		...(number('METALLIC') !== null && { metallic: number('METALLIC') }),
		...(number('ROUGHNESS') !== null && { roughness: number('ROUGHNESS') })
	};
	if (a.ISFOLDER === 'Y') {
		// Its pictures are beside the picture it names; naming none, in the folder of its name among the
		// pictures of the file it is written in: "Paisagens" of imagens.material, textures/…/imagens/paisagens.
		const near = textureFile ? path.dirname(textureFile) : folderNamed(stem, a.NAME);
		// The pictures it lists, and every picture in the folder of its own.
		let beside = [];
		try {
			beside = near ? fs.readdirSync(near) : [];
		} catch {
			beside = [];
		}
		const names = [...files, ...String(a.HIDDENFILES ?? '').split(';'), ...beside].filter((name) => /\.(jpe?g|png|bmp)$/i.test(name));
		return [...new Set(names)].map((name) => {
			const picture = pictureFor(name, near);
			return { id: `${a.ID}_${name.replace(/\.[^.]+$/, '')}`, name: name.replace(/\.[^.]+$/, ''), ...base, ...(picture && { picture: relative(picture) }) };
		});
	}
	const picture = textureFile && fs.existsSync(textureFile) ? textureFile : textureFile ? pictureFor(path.basename(textureFile), null) : null;
	return [{ id: a.ID, name: a.NAME ?? a.ID, ...base, ...(picture && { picture: relative(picture) }) }];
}

/** The folder of a name, at most three folders down from where the pictures of a file of materials are. */
function folderNamed(stem, name) {
	if (!stem || !name) return null;
	const wanted = lower(name);
	const look = (folder, depth) => {
		let entries;
		try {
			entries = fs.readdirSync(folder, { withFileTypes: true });
		} catch {
			return null;
		}
		for (const entry of entries) if (entry.isDirectory() && lower(entry.name) === wanted) return path.join(folder, entry.name);
		if (depth === 0) return null;
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			const found = look(path.join(folder, entry.name), depth - 1);
			if (found) return found;
		}
		return null;
	};
	return look(stem, 3);
}

/** Every value under a key, wherever it is in a tree read from EJI. */
function* valuesOf(node, wanted) {
	if (Array.isArray(node)) {
		for (const each of node) yield* valuesOf(each, wanted);
		return;
	}
	if (!node || typeof node !== 'object') return;
	for (const [key, value] of Object.entries(node)) {
		if (key === wanted) yield value;
		yield* valuesOf(value, wanted);
	}
}

/**
 * Reads the library of a Promob: every piece by its code, and every material
 * by its id. Kept in a file of its own, as long as the library is unchanged.
 */
export function buildIndex(system, cacheFolder) {
	const library = path.join(system, 'bibliotecas');
	const stamp = fs.statSync(library).mtimeMs;
	const cache = cacheFolder && path.join(cacheFolder, `promob-${Buffer.from(system).toString('base64url').slice(-40)}.json`);
	if (cache) {
		try {
			const kept = JSON.parse(fs.readFileSync(cache, 'utf8'));
			if (kept.stamp === stamp && kept.version === INDEX_VERSION) return kept;
		} catch {
			// Not there, or of another library: it is read again.
		}
	}
	const files = walk(library);
	const byName = new Map();
	for (const file of files) {
		const key = lower(path.basename(file));
		const list = byName.get(key) ?? [];
		list.push(file);
		byName.set(key, list);
	}
	const relative = (file) => path.relative(system, file).split(path.sep).join('/');

	/** Each piece by its code: what it is called, its drawing, its size and the materials of its parts. */
	const pieces = {};
	const entityOf = (file, code) => {
		let tree;
		try {
			tree = thingOf(readEji(fs.readFileSync(file)));
		} catch {
			return null;
		}
		if (!tree) return null;
		const drawn = [...every(tree, 'FILE3D')][0]?.attributes.NAME;
		const size = [...every(tree, 'DIMENSION')][0]?.attributes;
		const description = [...every(tree, 'ATTRIBUTE')].find((each) => each.attributes.ID === 'description')?.attributes.VALUE;
		const parts = {};
		for (const each of every(tree, 'COMPONENTDEFINITION')) if (each.attributes.ID && each.attributes.IDMATERIAL) parts[each.attributes.ID] = each.attributes.IDMATERIAL;
		const folder = path.dirname(file);
		const drawings = drawn ? [...(byName.get(lower(`${drawn}.pmob`)) ?? []), ...(byName.get(lower(`${drawn}.mob3d`)) ?? [])] : [];
		const drawing = drawings.find((each) => path.dirname(each) === folder) ?? drawings[0];
		if (!drawing) return null;
		const icon = tree.attributes.ICON ? (byName.get(lower(tree.attributes.ICON)) ?? []).find((each) => path.dirname(each) === folder) : undefined;
		return {
			code,
			name: description || tree.attributes.NAME || code,
			drawing: relative(drawing),
			...(icon && { icon: relative(icon) }),
			...(size && { size: [Number(size.WIDTH), Number(size.HEIGHT), Number(size.DEPTH)] }),
			parts
		};
	};
	const add = (code, piece) => {
		if (!piece) return;
		const list = (pieces[lower(code)] ??= []);
		if (!list.some((each) => each.drawing === piece.drawing)) list.push(piece);
	};
	// A piece is named by its file, or by the group it is listed in.
	for (const file of files) {
		if (!/\.entity$/i.test(file)) continue;
		const code = path.basename(file).replace(/\.entity$/i, '');
		add(code, entityOf(file, code));
	}
	for (const file of files) {
		if (!/\.group$/i.test(file)) continue;
		let tree;
		try {
			tree = thingOf(readEji(fs.readFileSync(file)));
		} catch {
			continue;
		}
		const folder = path.join(path.dirname(file), tree?.attributes.DIRECTORY ?? '');
		for (const item of every(tree, 'EXPLORERITEM')) {
			const { ID: code, DEF: defined, TYPE: type } = item.attributes;
			if (type !== 'entity' || !code || !defined) continue;
			const entity = path.join(folder, defined);
			if (fs.existsSync(entity)) add(code, entityOf(entity, code));
		}
	}

	// The materials, by their ids, with their pictures.
	const materialsRoot = path.join(system, 'materials');
	const pictures = new Map();
	for (const file of walk(materialsRoot)) if (/\.(jpe?g|png|bmp)$/i.test(file)) pictures.set(lower(path.basename(file)), file);
	const materials = {};
	// The makers of appliances keep materials of their own beside their pieces.
	for (const file of [...walk(materialsRoot), ...files]) {
		if (!/\.material$/i.test(file)) continue;
		let tree;
		try {
			tree = readEji(fs.readFileSync(file));
		} catch {
			continue;
		}
		const inMaterials = !path.relative(materialsRoot, file).startsWith('..');
		const stem = inMaterials ? path.join(materialsRoot, 'textures', path.relative(path.join(materialsRoot, 'materials'), file).replace(/\.material$/i, '')) : null;
		for (const body of valuesOf(tree, 'MATERIAL')) {
			for (const material of materialsOf(body, materialsRoot, pictures, system, stem)) materials[lower(material.id)] ??= material;
		}
	}

	const index = { version: INDEX_VERSION, stamp, system, pieces, materials };
	if (cache) {
		try {
			fs.mkdirSync(cacheFolder, { recursive: true });
			fs.writeFileSync(cache, JSON.stringify(index));
		} catch {
			// Read again next time.
		}
	}
	return index;
}

/**
 * The pieces of a code this library does not have, taken from its family: those whose code starts as it does, but for
 * its last words, the most of those words found in their names first. Colours count, sizes far less: of
 * "con_per_bar_ver_3M_pre" the "pre" picks the black bar ("Barra 2M Versatile Preto") over the 3 m one in champagne.
 */
function kinOf(known, code) {
	const words = lower(code).split('_');
	for (let keep = words.length - 1; keep >= 3; keep--) {
		const stem = `${words.slice(0, keep).join('_')}_`;
		const kin = Object.keys(known.pieces).filter((each) => each.startsWith(stem) && known.pieces[each].length > 0);
		if (kin.length === 0) continue;
		const rest = words.slice(keep).filter((word) => word.length >= 2);
		const score = (each) => {
			const name = lower(known.pieces[each][0].name ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/);
			return rest.reduce((sum, word) => sum + (name.some((part) => part.startsWith(word)) ? (/\d/.test(word) ? 0.1 : 1) : 0), 0);
		};
		const best = kin.sort((a, b) => score(b) - score(a) || a.localeCompare(b))[0];
		return known.pieces[best];
	}
	return undefined;
}

const INDEX_VERSION = 2;

// --- Answering the editor ---

/**
 * Answers what the editor asks at `/_promob/…`:
 * - `/_promob/piece/<code>?size=W,H,D&parts=SLOT:material,…`: the piece of that code (of several, the one of
 *   the size asked for, or with the parts named), its drawing and the materials of its parts; 404 for none;
 * - `/_promob/file/<path>`: a file of the library (a drawing, a picture), from its `files/System`.
 * Returns `{ status, type, body, file? }` (`file`: where the file is), or `null` for an address that is not of this.
 */
export function createPromobLibrary({ cacheFolder, system: given } = {}) {
	let index = null;
	let system = given ?? null;
	/** What Promob says of each of its variables, read once. */
	let said = null;
	/** Where Promob is, found once; `null` where there is none. */
	let looked = Boolean(given);
	const systemOf = () => {
		if (!looked) {
			looked = true;
			system = findSystems()[0] ?? null;
		}
		return system;
	};
	/** The whole library, read once: only what asks for a piece needs it, the rest only where Promob is. */
	const ready = () => {
		if (index) return index;
		if (!systemOf()) return null;
		index = buildIndex(system, cacheFolder);
		return index;
	};
	const json = (value, status = 200) => ({ status, type: 'application/json; charset=utf-8', body: Buffer.from(JSON.stringify(value)) });
	/** A material by its id; one this Promob does not have, the first of the folder it is of: "ima_paisagens_paisagem 019", another landscape. */
	const material = (known, id) => {
		const found = known.materials[lower(id)];
		if (found) return found;
		const folder = lower(id).replace(/_[^_]*$/, '_');
		if (folder === lower(id) || folder.length < 4) return null;
		const near = Object.keys(known.materials).find((each) => each.startsWith(folder));
		return near ? known.materials[near] : null;
	};
	return function answer(address) {
		const url = new URL(address, 'http://local');
		if (!url.pathname.startsWith('/_promob/')) return null;
		if (!systemOf()) return json({ error: 'no Promob here' }, 404);
		const rest = decodeURIComponent(url.pathname.slice('/_promob/'.length));
		if (rest.startsWith('piece/')) {
			const known = ready();
			const code = rest.slice('piece/'.length);
			// Asked with `kin`, one this library does not have is taken from its family, as a library of another year
			// names it: "con_per_bar_ver_3M_pre" (a Promob of 2024) is the black bar of the "con_per_bar_ver_…" here.
			const choices = known.pieces[lower(code)] ?? (url.searchParams.get('kin') === '1' ? kinOf(known, code) : undefined);
			if (!choices?.length) return json({ error: 'unknown piece' }, 404);
			// What the project says tells which of the pieces of that code it is: the parts it names, and its size.
			const asked = Object.fromEntries(
				(url.searchParams.get('parts') ?? '')
					.split(',')
					.filter(Boolean)
					.map((pair) => pair.split(':'))
			);
			const size = (url.searchParams.get('size') ?? '').split(',').map(Number);
			const named = (piece) => Object.keys(asked).filter((slot) => slot in piece.parts).length;
			const off = (piece) => {
				if (!piece.size || size.length !== 3 || size.some((each) => !Number.isFinite(each))) return 0;
				// However it lies, the same box: its measures taken in order of size.
				const mine = [...piece.size].sort((a, b) => a - b);
				const wanted = [...size].sort((a, b) => a - b);
				return mine.reduce((sum, each, index) => sum + Math.abs(Math.log((each + 1) / (wanted[index] + 1))), 0);
			};
			const piece = [...choices].sort((a, b) => named(b) - named(a) || off(a) - off(b))[0];
			const parts = {};
			for (const [slot, id] of Object.entries({ ...piece.parts, ...asked })) {
				const found = material(known, id);
				if (found) parts[slot] = found;
			}
			return json({ ...piece, parts });
		}
		// What Promob says of each variable of its Configurador de Características, by its id: shown beside it in
		// the construction manager, read from this Promob and never kept in the program.
		if (rest === 'atributos') {
			if (!said) {
				said = {};
				const gather = (node) => {
					if (Array.isArray(node)) return node.forEach(gather);
					if (!node || typeof node !== 'object') return;
					for (const [key, value] of Object.entries(node)) {
						if (key === 'ATTRIBUTEDEFINITION' && value?.a?.ID && value.a.DESCRIPTION) said[value.a.ID] = String(value.a.DESCRIPTION).trim();
						else gather(value);
					}
				};
				for (const file of ['sugestaoctrl.attributes', 'entidade.attributes']) {
					try {
						gather(readEji(fs.readFileSync(path.join(system, 'atributos', file))));
					} catch {
						// A Promob without it: nothing said of its variables.
					}
				}
			}
			return json(said);
		}
		if (rest.startsWith('file/')) {
			const wanted = path.normalize(path.join(system, rest.slice('file/'.length)));
			if (!wanted.startsWith(system + path.sep) || !fs.existsSync(wanted)) return json({ error: 'no such file' }, 404);
			const extension = path.extname(wanted).toLowerCase();
			const type = extension === '.png' ? 'image/png' : /\.jpe?g$/.test(extension) ? 'image/jpeg' : extension === '.bmp' ? 'image/bmp' : 'application/octet-stream';
			return { status: 200, type, body: fs.readFileSync(wanted), file: wanted };
		}
		return json({ error: 'not known' }, 404);
	};
}
