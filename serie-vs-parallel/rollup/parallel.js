import node from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';

export default {
	input: './test/parallel.js',
	output: {
		file: './test/dist/parallel.js',
		format: 'iife'
	},
	plugins: [node(), cjs()]
}