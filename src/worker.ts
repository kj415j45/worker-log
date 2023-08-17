/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import error from './routes/error';
import index from './routes/index';
import log from './routes/log';

export default {
	async fetch(request: any, env: any, ctx: any): Promise<Response> {
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
	},
};
