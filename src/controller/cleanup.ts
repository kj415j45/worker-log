export default async function cleanup(env: Env) {
	const expiry = new Date().setDate(new Date().getDate() - 1);
	return env.DB.prepare('DELETE FROM log WHERE endpoint IN ( SELECT DISTINCT endpoint FROM log WHERE timestamp < ? );').bind(expiry).run();
}
