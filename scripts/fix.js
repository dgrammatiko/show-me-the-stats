const thumbs = require('./process-images.js');
const { sync } = require('glob');

sync(`./src_images/*.{jpg,png}`).forEach((file) => {
    thumbs(file);
});
