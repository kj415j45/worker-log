import exist from '../controller/exist';
import get from '../controller/get';
import pending from '../controller/pending';
import { BaseRoute } from './baseRoute';
import error from './error';

const log: BaseRoute = async function (request, env, ctx) {
	const url = new URL(request.url);
	const id = url.pathname.match(/\/log\/(.+)/)![1];
	switch (request.method) {
		case 'GET': {
			const timestamp = url.searchParams.get('timestamp') === 'true';
			const log = await get(env, id, timestamp);
			return new Response(log!.trimStart());
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
