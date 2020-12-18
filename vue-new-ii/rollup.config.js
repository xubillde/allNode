import babel from "rollup-plugin-babel";
import {
  eslint
} from "rollup-plugin-eslint";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "package/helper/index.js",
  output: {
    file: "bin/helper.js",
    format: "cjs"
  },
  plugins: [
    eslint({

    }),
    uglify(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    })
  ]
};
