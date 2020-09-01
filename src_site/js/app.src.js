import { render, html } from 'uhtml';
import { Store } from './utils/store.js';
import { loadmore } from './utils/observer.js';
import { navigation } from './components/filters.js';
import { renderModal } from './components/modal.js'
import { imagePlaceholder } from './utils/image-placeholder.js'

document.dataLength = 10;
document.store = new Store();

document.addEventListener('updated', () => render(
  document.getElementById("content"),
  html`<section class="cards">${document.store.data.map((item, i) => renderCard(item, i, document.store.data.length, document.data.length))}</section>`
));

function showModal(event) {
  let element = event.target;

  const data = document.store.data[element.dataset.i];

  renderModal(document.getElementById('modal'), data, element.dataset.i);
}

const renderCard = (item, i, length, total) => {
  const src = `/images/small/${btoa((new URL(item.href)).origin)}.jpg`;
  return html`
<article class="box card">
  <div class="card-header">
    <h1>${item.title}</h1>
  </div>
  <div class="card-body">
    <picture class="card-image">
      <img ref=${loadmore} .dataset=${{ i: i, src: src, length: length, total: total }} loading="lazy" src=${imagePlaceholder} alt=${item.imageAlt} />
    </picture >
    <div class="card-details">
      <ul>
        <li>
          Performace: <span>${Math.round(item.lighthouse.performance * 100)}%</span>
        </li>
        <li>
          FCP:
              <span>${(item.firstContentfulPaint / 1000).toFixed(3)}Sec </span>
        </li>
        <li>
          Best practices:
              <span>${Math.round(item.lighthouse.bestPractices * 100)}%</span>
        </li>
        <li>
          Accessibility:
              <span>${Math.round(item.lighthouse.accessibility * 100)}%</span>
        </li>
        <li>SEO: <span>${Math.round(item.lighthouse.seo * 100)}%</span></li>
        <li>
          carbon footprint: <span>${item.lighthouse.carbon}</span>
        </li>
      </ul>
    </div>
    <button class="showModal" type="button" onclick=${showModal} data-i=${i} >The results</button>
  </div>
</article>`;
};


// Get the data, update the store
const dataString = document.querySelector('#data-source').innerHTML
document.data = JSON.parse(dataString);

document.store.data = document.data.slice(0, document.dataLength);

function fetchData() {
  fetch('/data.json')
    .then(resp => resp.json())
    .then(newData => {
      document.data = newData;
      document.store.data = document.data.slice(0, document.dataLength);
    })
    .catch(error => {
      console.log('💩 we\'ve messed up big time');
    });
}
requestIdleCallback(fetchData)

navigation();
