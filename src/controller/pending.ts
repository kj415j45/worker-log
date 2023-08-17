import get from './get';
import put from './put';

export default async function pending(env: Env, id: string, pending: string) {
	let content = (await get(env, id)) ?? '';
	return put(env, id, content.trim() === '' ? pending : `${content}\n${pending}`);
}
