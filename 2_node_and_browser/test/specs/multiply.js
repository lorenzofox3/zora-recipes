import zora from 'zora';
import multiply from '../../src/multiply';

export default zora()
	.test('integer multiplication', t => {
		t.equal(multiply(2, 3), 6, '2 * 3 = 6')
	});