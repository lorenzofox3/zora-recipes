import zora from 'zora';
import square from '../../src/square';

export default zora()
	.test('integer square', t => {
		t.equal(square(2), 4, '2 * 2 = 4')
	});