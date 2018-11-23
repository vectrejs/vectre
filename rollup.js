#!/usr/bin/env node

const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const css = require('rollup-plugin-css-only');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const { default: vue } = require('rollup-plugin-vue');
const { terser } = require('rollup-plugin-terser');
const { rollup, watch } = require('rollup');
const { resolve } = require('path');

const argv = require('minimist')(process.argv.slice(2));


const source = resolve(__dirname, 'src/');
const dest = resolve(__dirname, 'dist/');

const input = {
  input: resolve(source, 'main.ts'),
  plugins: [
    vue({ css: true }),
    typescript({ useTsconfigDeclarationDir: false }),
    buble({
      jsx: 'h',
      objectAssign: 'Object.assign',
      transforms: {
        forOf: false,
      },
    }),
    nodeResolve(),
    commonjs(),
    // terser(),
  ],
  external: [
    'vue',
    'Vue',
  ],
};


const globals = {
  vue: 'Vue',
};

async function build() {
  const bundle = await rollup(input);

  await bundle.write({
    format: 'esm',
    file: resolve(dest, 'vectre.esm.js'),
    exports: 'named',
  });
  await bundle.write({
    format: 'cjs',
    file: resolve(dest, 'vectre.cjs.js'),
    exports: 'named',
  });
  await bundle.write({
    globals,
    format: 'umd',
    name: 'vectre',
    file: resolve(dest, 'vectre.js'),
    exports: 'named',
  });
}

function wtch() {
  const watcher = watch({
    ...input,
    output: {
      format: 'cjs',
      file: resolve(dest, 'vectre.cjs.js'),
      exports: 'named',
    },
    watch: {
      inclued: 'src/**',
      chokidar: true,
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
  })
}

if (argv.watch) {
  wtch();
} else {
  build().catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
}
