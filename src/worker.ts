import cleanup from './controller/cleanup';
import error from './routes/error';
import index from './routes/index';
import log from './routes/log';

export default {
	async fetch(request: any, env: Env, ctx: ExecutionContext): Promise<Response> {
		const res = await handle(request, env, ctx);
		res.headers.set('Access-Control-Allow-Origin', '*');
		return res;
	},

	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
		ctx.waitUntil(cleanup(env));
	},
};

async function handle(request: any, env: Env, ctx: ExecutionContext): Promise<Response> {
	try {
		const reqPath = new URL(request.url).pathname;

		// dynamic route
		if (reqPath.startsWith('/log/') && reqPath.length > 1) {
			return log(request, env, ctx);
		}

		// static route
		switch (reqPath) {
			case '':
			case '/':
				return index(request, env, ctx);
			default:
				return error(request, env, ctx);
		}
	} catch (e) {
		return error(request, env, ctx);
	}
}
