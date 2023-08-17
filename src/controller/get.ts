export default async function get(env: Env, id: string): Promise<string | undefined> {
	return (await env.LOG_BUCKET.get(id))?.text();
}
