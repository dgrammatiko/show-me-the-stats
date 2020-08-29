const { readFile } = require('fs').promises;

module.exports = async () => {
  const dataNewText = await readFile('./src_site/sitesData.json', { encoding: 'utf8' });
  const dataNew = await JSON.parse(dataNewText);

  const finalData = [];
  dataNew.forEach((item, i) => {
    if (i < 11) {
      const newItem = item
      newItem.metrics = {
        performance: 0,
        firstContentfulPaint: 0,
        firstMeaningfulPaint: 0,
        firstCPUIdle: 0,
        interactive: 0,
        bestPractices: 0,
        accessibility: 0,
        seo: 0,
        carbon: 0
      }
      finalData.push(newItem)
    }
  })

  return finalData
}
