export default async function pending(env: Env, id: string, pending?: string) {
	const write = pending ?? '';
	const time = new Date().getTime();
	return env.DB.prepare('INSERT INTO log (endpoint, timestamp, message) VALUES (?, ?, ?)').bind(id, time, write).run();
}
