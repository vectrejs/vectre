#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('rollup-plugin-typescript2');
const vue = require('rollup-plugin-vue');
const { terser } = require('rollup-plugin-terser');
const postcss = require('rollup-plugin-postcss');
const pureanno = require('rollup-plugin-pure-annotation');

const { rollup, watch } = require('rollup');
const { resolve } = require('path');

const argv = require('minimist')(process.argv.slice(2));

const source = resolve(__dirname, 'src/');
const dest = resolve(__dirname, 'dist/');

const package = require('./package.json');
const allDeps = Object.keys({
  ...package.devDependencies,
  ...package.dependencies,
});
const requiredDeps = ['core-js', 'vue-tsx-support', 'vue-property-decorator', '@vue/babel-helper-vue-jsx-merge-props'];

const browserInput = {
  input: resolve(source, 'plugin.ts'),
  external: allDeps.filter(dep => !requiredDeps.includes(dep)),
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({ extensions: ['css', 'scss'] }),
    vue(),
    typescript({
      verbosity: 1,
      clean: false,
      objectHashIgnoreUnknownHack: true,
      tsconfigOverride: { compilerOptions: { declaration: false } },
    }),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.vue'],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: false,
            targets: '> 0.25%, not dead',
          },
        ],
        '@vue/babel-preset-jsx',
      ],
    }),
  ],
};

const browserLegacyInput = {
  input: resolve(source, 'plugin.ts'),
  external: allDeps.filter(dep => !requiredDeps.includes(dep)),
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({ extensions: ['css', 'scss'] }),
    vue(),
    typescript({
      verbosity: 1,
      clean: false,
      objectHashIgnoreUnknownHack: true,
      tsconfigOverride: { compilerOptions: { declaration: false } },
    }),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.vue'],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'usage',
            corejs: { version: '3.6' },
            targets: {
              ie: '10',
            },
          },
        ],
        '@vue/babel-preset-jsx',
      ],
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  browserInput.plugins.unshift(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
  browserLegacyInput.plugins.unshift(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
}

const browserOuts = [
  {
    globals: { vue: 'Vue' },
    format: 'umd',
    name: 'Vectre',
    file: resolve(dest, 'vectre.js'),
    exports: 'default',
  },
  {
    globals: { vue: 'Vue' },
    format: 'umd',
    name: 'Vectre',
    file: resolve(dest, 'vectre.min.js'),
    exports: 'default',
    plugins: [terser()],
  },
];

const browserLegacyOuts = [
  {
    globals: { vue: 'Vue' },
    format: 'umd',
    name: 'Vectre',
    file: resolve(dest, 'vectre.legacy.js'),
    exports: 'default',
  },
  {
    globals: { vue: 'Vue' },
    format: 'umd',
    name: 'Vectre',
    file: resolve(dest, 'vectre.legacy.min.js'),
    exports: 'default',
    plugins: [terser()],
  },
];

const moduleInput = {
  input: resolve(source, 'main.ts'),
  external: allDeps.filter(dep => !requiredDeps.includes(dep)),
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({ extensions: ['css', 'scss'] }),
    vue(),
    typescript({
      verbosity: 1,
      clean: false,
      objectHashIgnoreUnknownHack: true,
      useTsconfigDeclarationDir: true,
    }),
    pureanno({
      includes: ['**/*.js', '**/*.ts'],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    }),
  ],
};

const moduleOuts = [
  {
    file: resolve(dest, 'vectre.esm.js'),
    format: 'esm',
  },
  {
    file: resolve(dest, 'vectre.cjs.js'),
    format: 'cjs',
  },
];

async function buildBrowser() {
  const browserBundle = await rollup(browserInput);
  browserOuts.map(out => browserBundle.write(out));

  const browserLegacyBundle = await rollup(browserLegacyInput);
  browserLegacyOuts.map(out => browserLegacyBundle.write(out));
}

async function buildModules() {
  const moduleBundle = await rollup(moduleInput);
  moduleOuts.map(out => moduleBundle.write(out));
}

async function build() {
  buildModules();
  buildBrowser();
}

function rebuildOnChanges() {
  browserInput.plugins.unshift(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );

  const watcher = watch({
    ...moduleInput,
    output: moduleOuts,
    watch: {
      inclued: 'src/**',
      chokidar: true,
    },
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
  rebuildOnChanges();
} else {
  build().catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
}
