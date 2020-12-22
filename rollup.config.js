import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import precss from 'precss';
import ts from '@rollup/plugin-typescript';

export default {
  input: 'emails-input/index.ts',
  plugins: [
    postcss({
      extract: true,
      plugins: [
        precss(),
        cssnano({
          preset: 'default',
        }),
      ],
    }),
    ts(),
    terser(),
  ],
  output: {
    file: 'build/bundle.js',
    format: 'es',
  },
};
