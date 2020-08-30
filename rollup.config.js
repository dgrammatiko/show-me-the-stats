import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";

export default [{
  input: "src_site/js/app.src.js",
  plugins: [
    resolve(),
    minifyHTML(),
    // terser(),
  ],
  context: "null",
  moduleContext: "null",
  output: {
    file: "live/js/app.esm.js",
    format: "esm",
  },
},
{
  input: "node_modules/ce-theme-switcher/src/index.js",
  plugins: [resolve(), minifyHTML(), terser()],
  context: "null",
  moduleContext: "null",
  output: {
    file: "live/js/toggler.esm.js",
    format: "esm",
  },
},
  // {
  //   input: "node_modules/ce-theme-switcher/src/index.js",
  //   plugins: [resolve(), minifyHTML(), terser()],
  //   output: {
  //     file: "live/js/toggler.es5.js",
  //     format: "iife",
  //   },
  // }
];
