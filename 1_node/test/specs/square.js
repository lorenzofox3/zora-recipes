const zora = require('zora');
const square = require('../../src/square');

module.exports = zora()
	.test('integer square', t => {
		t.equal(square(2), 4, '2 * 2 = 4')
	});