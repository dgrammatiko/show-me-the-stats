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

  eleventyConfig.addPassthroughCopy('src_site/js', 'live/js');
  eleventyConfig.addPassthroughCopy('src_site/css', 'live/css');
  eleventyConfig.addPassthroughCopy('data/final.json', 'live/final.json');
  eleventyConfig.addPassthroughCopy('images', 'live/images');

  return {
    pathPrefix: "/",
    passthroughFileCopy: true,
    dir: {
      input: 'src_site',
      output: 'live',
    },
  };
};
