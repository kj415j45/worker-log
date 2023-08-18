export default async function get(env: Env, id: string): Promise<string | undefined> {
	return (await env.DB.prepare('SELECT message FROM log WHERE endpoint = ? ORDER BY timestamp ASC').bind(id).all()).results
		.map((r) => r.message)
		.join('\n');
}
