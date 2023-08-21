export function* snowflake(workerId?: number): Generator<string> {
	let seq = 0;
	const maxSeq = Math.pow(2, 12);
	if (workerId === null || workerId === undefined) {
		workerId = crypto.getRandomValues(new Int16Array(1))[0];
	}
	const epoch = Date.parse('2000-01-01T00:00:00.000Z');

	do {
		let now = Date.now();
		if (now < epoch) {
			return;
		}
		let time = now - epoch;

		// 41 bits for the timestamp in milliseconds since a custom epoch
		// 10 bits for the worker ID
		// 12 bits for the sequence number

		yield ((BigInt(time) << 22n) | BigInt((workerId & 0x3ff) << 12) | BigInt(seq & 0xfff)).toString(16);
		seq = (seq + 1) % maxSeq;
	} while (true);
}
