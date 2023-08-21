import { snowflake } from '../utils';
import exist from './exist';
import pending from './pending';

export default async function generate(env: Env, config?: { prefix?: string | null; suffix?: string | null }) {
	const prefix = config?.prefix ?? '';
	const suffix = config?.suffix ?? '';

	let id: string;
	let sf = snowflake();
	do {
		id = prefix + sf.next().value + suffix;
		if (!(await exist(env, id))) {
			break;
		} else {
			console.log(`${id} conflict`);
		}
	} while (true);

	await pending(env, id);

	return id;
}
