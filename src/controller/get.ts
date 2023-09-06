export default async function get(env: Env, id: string, withTimestamp = false): Promise<string | undefined> {
	if (withTimestamp) {
		return (
			await env.DB.prepare('SELECT timestamp, message FROM log WHERE endpoint = ? ORDER BY timestamp ASC LIMIT -1 OFFSET 1').bind(id).all()
		).results
			.map((r) => (r.message as string).replace(/^/gm, new Date(r.timestamp as number).toISOString() + ' '))
			.join('\n');
	} else {
		return (
			await env.DB.prepare('SELECT message FROM log WHERE endpoint = ? ORDER BY timestamp ASC LIMIT -1 OFFSET 1').bind(id).all()
		).results
			.map((r) => r.message)
			.join('\n');
	}
}
