import test from 'zora';
import spec from './spec.js';

test('parallel', t => {
	spec(t.test);
});
