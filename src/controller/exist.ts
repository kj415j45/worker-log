export default async function exist(env: Env, id: string): Promise<boolean> {
	return (await env.LOG_BUCKET.head(id)) != null;
}
