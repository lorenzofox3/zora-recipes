import zora from 'zora';
import multiply from '../../src/multiply';

export default zora()
	.test('integer multiplication', t => {
		t.equal(multiply(2, 3), 6, '2 * 3 = 6')
	})
	.test('with currying', t => {
		const timesTow = multiply(2);
		t.equal(timesTow(4), 8, '2*4 =8');
		t.equal(timesTow(3), 6, '2*3 =6');
	});