const { existsSync, readFileSync, writeFileSync } = require('fs');
const { readFile } = require('fs').promises;

// url
const finalData = [];
const nullData = {
  lighthouse: {
    version: '6.1.0',
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    carbon: 0,
    total: 0
  },
  firstContentfulPaint: 0,
  speedIndex: 0,
  largestContentfulPaint: 0,
  totalBlockingTime: 0,
  cumulativeLayoutShift: 0,
  timeToInteractive: 0,
  maxPotentialFirstInputDelay: 0,
  timeToFirstByte: 0,
  weight:
  {
    summary: '',
    total: 0,
    image: 0,
    imageCount: 0,
    script: 0,
    scriptCount: 0,
    document: 0,
    font: 0,
    fontCount: 0,
    stylesheet: 0,
    stylesheetCount: 0,
    thirdParty: 0,
    thirdPartyCount: 0
  },
  axe: { passes: 0, violations: 0 }
};

const loop = async () => {
  const dataNewText = await readFile('./src_site/sitesData.json', { encoding: 'utf8' });
  const dataNew = await JSON.parse(dataNewText);

  dataNew.forEach((item, i) => {
    if (i < 10) {
      const newItem = item;
      item.id = i;
      const x = new URL(item.href);
      const filename = x.host.replace(/^\www./, '');
      const file = `./src_data/${filename}.json`;

      if (existsSync(file)) {
        const lighthouseText = readFileSync(file, { encoding: 'utf8' });
        const lighthouse = JSON.parse(lighthouseText);

        if (lighthouse && !lighthouse.error) {
          newItem.lighthouse = lighthouse.lighthouse
          newItem.firstContentfulPaint = lighthouse.firstContentfulPaint
          newItem.speedIndex = lighthouse.speedIndex
          newItem.totalBlockingTime = lighthouse.totalBlockingTime
          newItem.cumulativeLayoutShift = lighthouse.cumulativeLayoutShift
          newItem.timeToInteractive = lighthouse.timeToInteractive
          newItem.maxPotentialFirstInputDelay = lighthouse.maxPotentialFirstInputDelay
          newItem.timeToFirstByte = lighthouse.timeToFirstByte
          newItem.weight = lighthouse.weight
          newItem.axe = lighthouse.axe

          finalData.push(newItem)
        } else {
          finalData.push({ ...newItem, ...nullData })
        }
      } else {
        finalData.push({ ...newItem, ...nullData })
      }
    }
  })
};

module.exports = async () => {
  await loop();

  writeFileSync('./test-data-pre-rendered.json', JSON.stringify(finalData), { encoding: 'utf8' })
  // console.log(finalData.length)
  return finalData
}
