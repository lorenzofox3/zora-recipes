import resolve from 'rollup-plugin-node-resolve';

export default {
	input: './test/index.js',
	output: {
		format: 'iife',
		name: 'test'
	},
	plugins: [resolve({})]
};