import { snowflake } from '../utils';
import exist from './exist';
import put from './put';

export default async function generate(env: Env, config?: { prefix?: string | null; suffix?: string | null }) {
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

	const prefix = config?.prefix ?? '';
	const suffix = config?.suffix ?? '';
	id = prefix + id + suffix;

	await put(env, id);

	return id;
}
