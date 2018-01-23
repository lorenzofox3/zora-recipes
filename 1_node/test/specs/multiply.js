const zora = require('zora');
const multiply = require('../../src/multiply');

module.exports = zora()
	.test('integer multiplication', t => {
		t.equal(multiply(2, 3), 6, '2 * 3 = 6')
	});