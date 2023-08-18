export default async function get(env: Env, id: string, withTimestamp = false): Promise<string | undefined> {
	if (withTimestamp) {
		return (await env.DB.prepare('SELECT timestamp, message FROM log WHERE endpoint = ? ORDER BY timestamp ASC').bind(id).all()).results
			.map((r) => `${new Date(r.timestamp as number).toISOString()} ${r.message}`)
			.join('\n');
	} else {
		return (await env.DB.prepare('SELECT message FROM log WHERE endpoint = ? ORDER BY timestamp ASC').bind(id).all()).results
			.map((r) => r.message)
			.join('\n');
	}
}
