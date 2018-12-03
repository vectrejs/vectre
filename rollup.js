#!/usr/bin/env node

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const { default: vue } = require('rollup-plugin-vue');
const { terser } = require('rollup-plugin-terser');
const { rollup, watch } = require('rollup');
const { resolve } = require('path');

const argv = require('minimist')(process.argv.slice(2));

const source = resolve(__dirname, 'src/');
const dest = resolve(__dirname, 'dist/');

const package = require('./package.json');
const deps = Object.keys({...package.devDependencies, ...package.dependencies})
const external = deps.filter(dep => dep !== 'vue-tsx-helper' && dep !=='vue-property-decorator')

const input = {
  external,
	input: resolve(source, 'main.ts'),
	plugins: [
		vue({ css: true }),
		typescript({ useTsconfigDeclarationDir: false }),
		nodeResolve(),
		commonjs(),
		babel({
			runtimeHelpers: true,
			exclude: 'node_modules/**',
			extensions: [ '.js', '.jsx', '.tsx', '.ts' ]
		})
	],
};
const minInput = { ...input, plugins: [ ...input.plugins, terser() ] };

const outs = [
	{
		file: 'vectre.esm.js',
		format: 'esm'
	},
	{
		file: 'vectre.cjs.js',
		format: 'cjs'
	},
	{
		globals: { vue: 'Vue' },
		format: 'umd',
		name: 'vectre',
		file: 'vectre.js'
	}
];

async function build() {
	const bundle = await rollup(input);
	const minBundle = await rollup(minInput);

  for(const out of outs) {
    await bundle.write({ ...out, file: resolve(dest, out.file) });
    await minBundle.write({ ...out, file: resolve(dest, out.file.replace('.js', '.min.js')) });
  }
}

function wtch() {
	const watcher = watch({
		...input,
		output: {
			format: 'cjs',
			file: resolve(dest, 'vectre.cjs.js')
		},
		watch: {
			inclued: 'src/**',
			chokidar: true
		}
	});

	watcher.on('event', ({ code, error }) => {
		switch (code) {
			case 'START':
				console.log('In progress');
				break;
			case 'FATAL':
			case 'ERROR':
				console.error(error);
				break;
			case 'END':
				console.log('Completed');
		}
	});
}

if (argv.watch) {
	wtch();
} else {
	build().catch((err) => {
		console.error(err);
		process.exitCode = 1;
	});
}
