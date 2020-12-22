import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import precss from 'precss';

export default {
  input: 'emails-input/index.js',
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
    terser(),
  ],
  output: {
    file: 'build/bundle.js',
    format: 'es',
  },
};
