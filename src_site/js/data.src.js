import { render, html } from 'uhtml';
import { Store } from './store.js';
import { loadmore } from './observer.js';
import { navigation } from './filters.js';

document.store = new Store();

document.addEventListener('updated', () => render(
  document.getElementById("content"),
  html`<ul class="cards">${document.store.data.map((item, i) => renderCard(item, i, document.store.data.length, document.data.length))}</ul>`
));

const renderCard = (item, i, length, total) => {
  const src = `/images/small/${btoa((new URL(item.href)).origin)}.jpg`;
  return html`<li class="card" ref=${loadmore} .dataset=${{ i: i, length: length, total: total }} >
    <div class="card-header">
      <a href="${item.href}"><h3>${item.title}</h3></a>
    </div>
    <div class="card-body">
      <picture class="card-image">
        <img loading="lazy" src=${src} alt=${item.imageAlt} />
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
    <details>
      <summary>Description</summary>
      <p>${item.text}</p>
    </details>
  </div>
    </div>
  </li>`;
};


// Get the data, update the store
const dataString = document.querySelector('#data-source').innerHTML
document.data = JSON.parse(dataString);

document.store.data = document.data.slice(0, 10);

fetch('/data.json')
  .then(resp => resp.json())
  .then(newData => {
    document.data = newData;
    document.store.data = document.data.slice(0, 10);
  })
  .catch(error => {
    console.log('💩 we\'ve messed up big time');
  });

navigation();
