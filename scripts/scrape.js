const puppeteer = require('puppeteer');
const request = require('request');
const path = require('path');
const thumbs = require('./process-images.js');
const { existsSync, createWriteStream, mkdirSync } = require('fs');
const { writeFile } = require('fs').promises;

if (!existsSync('src_images')) {
  mkdirSync('src_images');
}

let start = process.hrtime();
const baseUrl = 'https://showcase.joomla.org';
const url = `${baseUrl}/browse-sites/newest-first.html`
let siteLinks = [];
const data = [];

function elapsed_time(note) {
  const precision = 3;
  const elapsed = process.hrtime(start)[1] / 1000000;
  console.log(`${note}: ${process.hrtime(start)[0]}s, ${elapsed.toFixed(precision)}ms`);
  start = process.hrtime();
}

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(createWriteStream(path))
      .on('close', callback)
  })
}

(async function () {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  let counter = 0;
  let endNotReached = true;

  while (endNotReached) {
    try {
      await page.goto(`${url}?start=${counter}`, { waitUntil: "load" });
      await page.content();
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('#system .cck_page_items .cck-sites ul.row-fluid li a'),
          e => e.href));
      const linksFiltered = [... new Set(links)].filter(link => !link.includes('?'))

      siteLinks = siteLinks.concat(linksFiltered);

      const paginationCounterText = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.pagination > .counter'),
          e => e.innerText));

      const textArr = paginationCounterText[0].match(/Page\s(\d+)\sof\s(\d+)/);
      console.log(`Urls added: ${siteLinks.length}`);

      endNotReached = !(textArr[1] == textArr[2]);
      counter += 30;
    } catch (err) {
      console.dir(err);
      await browser.close();
      return;
    }
  }

  elapsed_time("Fetching all the pages URLs completed");

  if (siteLinks.length) {
    for await (site of siteLinks) {
      console.log(`Fetching: ${site}`)
      await page.goto(`${site}`, { waitUntil: "load" });
      await page.content();
      // Scrape some data
      const href = await page.evaluate(() => {
        let href = document.querySelector('.visit-site')

        if (href.href) {
          const x = new URL(href.href);
          href = x.origin;
        } else {
          href = '';
        }

        return href;
      });
      const title = await page.evaluate(() => {
        const title = document.querySelector('.site-title')

        return title ? title.innerText : '';
      });
      const text = await page.evaluate(() => {
        const text = document.querySelector('.cck_value.cck_value_textarea')

        return text ? text.innerText : '';
      });
      const image = await page.evaluate(() => {
        const img = document.querySelector('.item > img');
        return {
          src: img && img.src ? img.src : '',
          alt: img && img.getAttribute('alt') ? img.getAttribute('alt') : ''
        };
      });

      const tmpData = {
        href: href,
        title: title,
        text: text,
      }

      if (image.src) {
        const ext = path.extname(image.src).toLowerCase();
        const filename = (Buffer.from(href)).toString('base64');
        const file = `src_images/${filename}${ext}`;
        if (!existsSync(file)) {
          console.log(image.src)
          download(`${image.src}`, file, async () => {
            console.log(`Downloaded: ${file} ✅`)
            await thumbs(file, filename);
          });
        }
        tmpData.imageSrc = `${filename}`;
        tmpData.imageAlt = image.alt || '';
      }

      console.dir(tmpData)
      data.push(tmpData);
    }

    elapsed_time("Fetches completed");
  }

  await writeFile(process.cwd() + '/src_site/sites.json', `${JSON.stringify(siteLinks)}`, { encoding: 'utf-8' });
  await writeFile(process.cwd() + '/src_site/sitesData.json', `${JSON.stringify(data)}`, { encoding: 'utf-8' });
  await browser.close();
  elapsed_time("End of process");
})();
