import node from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';

export default {
	input: './test/sequential.js',
	output: {
		file: './test/dist/sequential.js',
		format: 'iife'
	},
	plugins: [node(), cjs()]
}