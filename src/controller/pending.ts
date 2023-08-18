import get from './get';

export default async function pending(env: Env, id: string, pending?: string) {
	const write = pending ?? '';
	const time = new Date().getTime();
	const antiCollision = await (await fetch('https://uuid.rocks/plain')).text();
	return env.DB.prepare('INSERT INTO log (endpoint, timestamp, anti_collision, message) VALUES (?, ?, ?, ?)')
		.bind(id, time, antiCollision, write)
		.run();
}
