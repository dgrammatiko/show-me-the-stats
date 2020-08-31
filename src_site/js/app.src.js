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
  html`<ul class="cards">${document.store.data.map((item, i) => renderCard(item, i, document.store.data.length, document.data.length))}</ul>`
));

function showModal(event) {
  let element = event.target;
  if (!element.classList.contains('card')) {
    element = element.closest('.card')
  }

  const data = document.store.data[element.dataset.i];

  renderModal(document.getElementById('modal'), data);
}

const renderCard = (item, i, length, total) => {
  const src = `/images/small/${btoa((new URL(item.href)).origin)}.jpg`;
  return html`<li tabindex="0" class="card" onclick=${showModal} data-i=${i} >
    <div class="card-header">
      <h3>${item.title}</h3>
    </div>
    <div class="card-body">
      <picture class="card-image">
        <img ref=${loadmore} .dataset=${{ i: i, src: src, length: length, total: total }} loading="lazy" src=${imagePlaceholder} alt=${item.imageAlt} />
      </picture >
  <div class="card-details">
    <ul>
      <li>
        Performace: <span>${Math.round(item.metrics.performance)}%</span>
      </li>
      <li>
        First contentful paint:
            <span>${item.metrics.firstContentfulPaint.toFixed(2)}Sec </span>
      </li>
      <li>
        Best practices:
            <span>${Math.round(item.metrics.bestPractices)}%</span>
      </li>
      <li>
        Accessibility:
            <span>${Math.round(item.metrics.accessibility)}%</span>
      </li>
      <li>SEO: <span>${Math.round(item.metrics.seo)}%</span></li>
      <li>
        carbon footprint: <span>${item.metrics.carbon.toFixed(3)}</span>
      </li>
    </ul>
    </div>
  </li>`;
};


// Get the data, update the store
const dataString = document.querySelector('#data-source').innerHTML
document.data = JSON.parse(dataString);

document.store.data = document.data.slice(0, document.dataLength);

fetch('/data.json')
  .then(resp => resp.json())
  .then(newData => {
    document.data = newData;
    document.store.data = document.data.slice(0, document.dataLength);
  })
  .catch(error => {
    console.log('💩 we\'ve messed up big time');
  });

navigation();
