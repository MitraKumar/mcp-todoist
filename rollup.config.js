import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts', // Your entry file
  output: [
    {
      file: 'dist/main.cjs',
      format: 'cjs',
      sourcemap: true
    },
  ],
  plugins: [
    typescript(),
  ],
  external: [] // List external dependencies here if needed
};
