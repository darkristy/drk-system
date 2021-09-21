import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const PRESETS = ["@babel/preset-react"];
const EXTERNAL = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
const EXTENSIONS = [".ts", ".tsx"];

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
		},
		{
			file: pkg.module,
			format: "es",
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		typescript({
			clean: true,
			tsconfig: "tsconfig-rollup.json",
			typescript: require("typescript"),
		}),
		babel({
			exclude: "node_modules/**",
			extensions: EXTENSIONS,
			include: EXTENSIONS.map((ext) => `src/**/*${ext}`),
			presets: PRESETS,
		}),
	],
	external: EXTERNAL,
};
