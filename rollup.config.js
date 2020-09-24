import cjs from '@rollup/plugin-commonjs';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import css from './build/css';
import nodeResolve from './build/resolve';
import babel from './build/babel';

const isProduction = !process.env.ROLLUP_WATCH;

export default () => {
  let config = [
    {
      input: 'src/main.ts',
      output: { format: 'esm', file: 'dist/vectre.esm.js' },
      external: (id) => {
        return /core|^vue$/.test(id);
      },
      plugins: [nodeResolve(), cjs(), css(), babel()],
    },
    {
      input: 'src/main.ts',
      output: { format: 'cjs', file: 'dist/vectre.cjs.js' },
      external: (id) => {
        return /core|^vue$/.test(id);
      },
      plugins: [nodeResolve(), cjs(), css(), babel()],
    },
    {
      input: 'src/plugin.ts',
      output: {
        format: 'umd',
        file: 'dist/vectre.js',
        name: 'Vectre',
        exports: 'default',
        globals: {
          vue: 'Vue',
        },
      },
      external: ['vue'],
      plugins: [nodeResolve(), cjs(), css(), babel(false, true)],
    },
    {
      input: 'src/plugin.ts',
      output: {
        format: 'umd',
        file: 'dist/vectre.legacy.js',
        name: 'Vectre',
        exports: 'default',
        globals: {
          vue: 'Vue',
        },
      },
      external: ['vue'],
      plugins: [nodeResolve(), cjs(), css(), babel(false, true, true)],
    },
  ];

  config.forEach((c) => c.plugins.push(sizeSnapshot()));

  config
    .filter((c) => c.output.format === 'umd')
    .forEach((c) => {
      config.push({
        ...c,
        output: { ...c.output, file: c.output.file.replace(/\.js/g, '.min.js') },
        plugins: [...c.plugins, terser()],
      });
    });

  if (!isProduction) {
    config = config.filter((c) => c.output.format === 'esm');
  }

  return config;
};
