import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-porter';

export default {
  input: 'emails-input/index.js',
  plugins: [css({ minified: true }), terser()],
  output: {
    file: 'build/bundle.js',
    format: 'es',
  },
};
