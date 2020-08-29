const { existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

if (!existsSync('src_site/images')) {
  mkdirSync('src_site/images');
  if (!existsSync('src_site/images/small')) {
    mkdirSync('src_site/images/small');
  }
  if (!existsSync('src_site/images/large')) {
    mkdirSync('src_site/images/large');
  }
}

module.exports = async (file, name) => {
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
      filename: `src_site/images/large/${name}.jpg`,
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
      filename: `src_site/images/large/${name}.webp`,
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
      filename: `src_site/images/small/${name}.jpg`,
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
      filename: `src_site/images/small/${name}.webp`,
      type: 'webp'
    }
  ].map(resize))
    .then(() => {
      console.log('Thumbs created ✅')
    });
}
