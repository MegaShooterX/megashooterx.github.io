// The library of the Promob installed on this computer, answered in a thread of its own (see `promobLibrary` in
// `main.cjs`): finding Promob and reading its library the first time takes a while, minutes on a large one, and the
// window of the program must go on answering meanwhile. Each question comes with its number and goes back with it.

import { parentPort, workerData } from 'node:worker_threads';
import { createPromobLibrary } from './promob-library.mjs';

const answer = createPromobLibrary({ cacheFolder: workerData?.cacheFolder });

parentPort.on('message', ({ id, address }) => {
	let reply;
	try {
		const answered = answer(address);
		reply = answered
			? { id, answered: { status: answered.status, type: answered.type, file: answered.file ?? null, body: new Uint8Array(answered.body) } }
			: { id, answered: null };
	} catch (error) {
		reply = { id, failed: String(error?.message ?? error) };
	}
	parentPort.postMessage(reply, reply.answered ? [reply.answered.body.buffer] : []);
});
