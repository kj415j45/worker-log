import { BaseRoute } from './baseRoute';

const error: BaseRoute = async function (request, env, ctx) {
	return new Response('Bad Request!', { status: 400 });
};

export default error;
