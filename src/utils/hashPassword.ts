import {hash} from 'bcrypt';
import {env} from 'process';

const hashPassword = async (password: string) => {
	const myHash = env.HASH || '';
	const ret = (await hash(password + myHash, 10)) as string;
	return ret;
};

export {
	hashPassword,
};
