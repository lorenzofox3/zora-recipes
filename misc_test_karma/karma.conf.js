const resolve = require('rollup-plugin-node-resolve');

module.exports = function (config) {
	config.set({
		files: [
			'./test/index.js'
		],

		frameworks: ['tap'],

		preprocessors: {
			'test/index.js': ['rollup']
		},

		client: {
			captureConsole: false
		},

		browsers: ['Chrome','Firefox'],

		rollupPreprocessor: {
			plugins: [resolve()],
			output: {
				format: 'iife',
				name: 'test',
				sourcemap: 'inline'
			},
		}
	})
};