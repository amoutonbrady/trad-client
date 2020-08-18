import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/main.tsx",
  treeshake: true,
  output: {
    format: "esm",
    dir: "dist",
    esModule: true,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-typescript", "babel-preset-solid"],
      extensions: [".ts", ".tsx", ".js"],
    }),
    nodeResolve({
      extensions: [".ts", ".tsx", ".js"],
      preferBuiltins: true,
      browser: true,
    }),
    commonjs({
      extensions: [".ts", ".tsx", ".js"],
    }),
    terser(),
  ],
};

export default config;
