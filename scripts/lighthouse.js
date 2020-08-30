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
if (!existsSync('./src_data_all')) {
  mkdirSync('./src_data_all')
}

let lighthoseData;

(async () => {
  const initialDataText = await readFile('./src_site/sitesData.json', { encoding: 'utf8' });
  const initialData = await JSON.parse(initialDataText);
  const urlsForAudit = [];

  for (const [index, site] of initialData.entries()) {
    const { href, host, pathname, protocol } = new url.parse(site.href)
    if (index < 1) {
      urlsForAudit.push(`${protocol}//${host}/`);
    }
  }

  lighthouseData = await PerfLeaderboard(urlsForAudit, 3, { launchOptions: {} });

  // Store each site data as a json file
  lighthouseData.forEach(async (lh) => {
    const { href, host, pathname, protocol } = new url.parse(lh.requestedUrl)

    // Add carbon Footprint
    lh.lighthouse.carbon = parseFloat((lh.weight.total / 1024 / 1024 / 1024) * 0.06 * 1000).toPrecision(3);

    await writeFile(`./src_data/${host.replace(/^www\./, '').replace(/\./g, '_')}.json`, JSON.stringify(lh), { encoding: 'utf8' });
  });

  // @todo remove these files
  await writeFile('./src_data_all/sitesData-with-LH_0-100.json', JSON.stringify(lighthouseData), { encoding: 'utf8' });
})()
