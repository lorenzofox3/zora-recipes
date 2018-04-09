import test from 'zora';
import spec from './spec.js';

test('sequential', async t => {

	const seq = [];

	spec((...args) => seq.push([...args]));

	while (true) {
		const current = seq.shift();
		if (!current) {
			break;
		}

		await t.test(...current);
	}

});
