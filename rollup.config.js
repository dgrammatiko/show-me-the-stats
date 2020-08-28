import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";

export default {
  input: "src_site/js/data.src.js",
  plugins: [resolve(), minifyHTML(), terser()],
  context: "null",
  moduleContext: "null",
  output: {
    file: "src_site/js/data.esm.js",
    format: "esm",
  },
};
