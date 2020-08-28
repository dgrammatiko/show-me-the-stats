const { readFile } = require('fs').promises;

module.exports = async () => {
    const data = await readFile('./src_site/final.json', { encoding: 'utf8' });
    return await JSON.parse(data);
}
