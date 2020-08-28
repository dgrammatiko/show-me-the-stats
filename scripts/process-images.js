const { existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

if (!existsSync('src_site/images')) {
  mkdirSync('src_site/images');
  if (!existsSync('src_site/images/thumbs')) {
    mkdirSync('src_site/images/thumbs');
  }
}

module.exports = async (file) => {
  const resize = data => {
    return sharp(data.file).resize(data.resize)[data.type](data.quality).toFile(data.filename);
  };

  return Promise.all([
    {
      file: file,
      resize: {
        width: 560,
        height: 420,
        fit: 'cover',
        position: 'top',
      },
      quality: 70,
      filename: file.replace(`src_images`, `src_site/images`).replace('.png', `.jpg`),
      type: 'jpeg'
    },
    {
      file: file,
      resize: {
        width: 560,
        height: 420,
        fit: 'cover',
        position: 'top',
      },
      quality: 70,
      filename: file.replace(`src_images`, `src_site/images`).replace('.png', `.webp`),
      type: 'webp'
    },
    {
      file: file,
      resize: {
        width: 280,
        height: 210,
        fit: 'cover',
        position: 'top',
      },
      quality: 60,
      filename: file.replace(`src_images`, `src_site/images/thumbs`).replace('.png', `.jpg`),
      type: 'jpeg'
    },
    {
      file: file,
      resize: {
        width: 280,
        height: 210,
        fit: 'cover',
        position: 'top',
      },
      quality: 60,
      filename: file.replace(`src_images`, `src_site/images/thumbs`).replace('.png', `.webp`),
      type: 'webp'
    }
  ].map(resize))
    .then(() => {
      console.log('Thumbs created ✅')
    });
}
