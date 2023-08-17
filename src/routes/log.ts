import exist from '../controller/exist';
import get from '../controller/get';
import pending from '../controller/pending';
import { BaseRoute } from './baseRoute';
import error from './error';

const log: BaseRoute = async function (request, env, ctx) {
	const id = new URL(request.url).pathname.match(/\/log\/(.+)/)![1];
	switch (request.method) {
		case 'GET': {
			const log = await get(env, id);
			return new Response(log);
		}

		case 'POST': {
			if (await exist(env, id)) {
				await pending(env, id, await request.text());
				return new Response('OK');
			}
		}

		default: {
			return error(request, env, ctx);
		}
	}
};

export default log;
