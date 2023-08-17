import { snowflake } from '../utils';
import exist from './exist';
import put from './put';

export default async function generate(env: Env) {
	let id: string;
	let sf = snowflake();
	do {
		id = sf.next().value;
		if (!(await exist(env, id))) {
			break;
		} else {
			console.log(id + ' conflict');
		}
	} while (true);

	await put(env, id);

	return id;
}
