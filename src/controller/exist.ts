export default async function exist(env: Env, id: string): Promise<boolean> {
	return ((await env.DB.prepare('SELECT COUNT(*) FROM log WHERE endpoint = ?').bind(id).all()).results[0]['COUNT(*)'] as number) > 0;
}
