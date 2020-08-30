const PerfLeaderboard = require("performance-leaderboard");
const { existsSync, mkdirSync } = require("fs");
const url = require('url');
const { readFile, writeFile } = require("fs").promises;

if (!existsSync('./src_site/sitesData.json')) {
  throw new Error('No input file...')
}
if (!existsSync('./src_data')) {
  mkdirSync('./src_data')
}

(async () => {
  const initialDataText = await readFile('./src_site/sitesData.json', { encoding: 'utf8' });
  const initialData = await JSON.parse(initialDataText);
  const urlsForAudit = [];

  for (const [index, site] of initialData.entries()) {
    const { href, host, pathname, protocol } = new url.parse(site.href)
    if (index < 101) {
      urlsForAudit.push(`${protocol}//${host}/`);
      console.error(host.replace(/^www\./, '').replace(/\./g, '_'))
    }
  }

  const lighthoseData = await PerfLeaderboard(urlsForAudit, 3, { launchOptions: {} });

  // lighthoseData.forEach(lh => {
  //   initialData.forEach((data, idx) => {
  //     if (lh.requestedUrl.includes(data.themeUrl)) {
  //       carbonVal = (lh.weight.total / 1024 / 1024 / 1024) * 0.06 * 1000;
  //       const tempCur = {
  //         performance: (Math.round((lh.lighthouse.performance + Number.EPSILON) * 100) / 100) * 100,
  //         bestPractices: (Math.round((lh.lighthouse.bestPractices + Number.EPSILON) * 100) / 100) * 100,
  //         accessibility: (Math.round((lh.lighthouse.accessibility + Number.EPSILON) * 100) / 100) * 100,
  //         seo: (Math.round((lh.lighthouse.seo + Number.EPSILON) * 100) / 100) * 100,
  //         carbon: carbonVal.toFixed(3),
  //         firstContentfulPaint: (Math.round((lh.firstContentfulPaint + Number.EPSILON) * 100) / 100),
  //         firstMeaningfulPaint: (Math.round((lh.largestContentfulPaint + Number.EPSILON) * 100) / 100),
  //         firstCPUIdle: (Math.round((lh.totalBlockingTime + Number.EPSILON) * 100) / 100),
  //         interactive: (Math.round((lh.timeToInteractive + Number.EPSILON) * 100) / 100),
  //       };

  //       initialData[idx] = { ...data, ...tempCur }
  //     }
  //   })
  // });

  await writeFile('./src_data/sitesData-with-LH_0-100.json', lighthouseData, { encoding: 'utf - 8' });
})()
