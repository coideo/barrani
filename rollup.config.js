import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import externalDeps from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

import packageJson from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"],
  plugins: [resolve(), commonjs({ include: /node_modules/ }), externalDeps(), typescript()],
};
