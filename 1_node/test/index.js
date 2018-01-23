const zora = require('zora');
const multiply = require('./specs/multiply');
const square = require('./specs/square');

zora()
	.test(multiply)
	.test(square)
	.run();
