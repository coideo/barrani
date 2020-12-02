import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import externalDeps from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: './build/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: './build/index.es.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [resolve(), commonjs(), externalDeps(), typescript()],
};
