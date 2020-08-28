const { spawn } = require('child_process');
const htmlmin = require("html-minifier");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("inlineCss", (path) => {
    let cssCached;
    if (fs.existsSync(`${process.cwd()}/src_site/${path}`)) {
      cssCached = fs.readFileSync(`${process.cwd()}/src_site/${path}`, { encoding: 'utf8' });
    } else {
      console.log('Crap');
    }
    return cssCached;
  })

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addPassthroughCopy('src_site/css', 'live/css');
  eleventyConfig.addPassthroughCopy('src_site/js', 'live/js_src');
  eleventyConfig.addPassthroughCopy('data/final.json', 'live/final.json');
  eleventyConfig.addPassthroughCopy('src_site/images');

  eleventyConfig.on('afterBuild', () => {
    spawn('./node_modules/.bin/rollup', ['-c', 'rollup.config.js']);
  });

  return {
    pathPrefix: "/",
    passthroughFileCopy: true,
    dir: {
      input: 'src_site',
      output: 'live',
    },
  };
};


