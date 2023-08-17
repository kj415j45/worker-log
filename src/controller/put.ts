export default async function put(env: Env, id: string, content?: string) {
	return await env.LOG_BUCKET.put(id, content === undefined ? '\n' : content);
}
