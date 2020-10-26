import { html } from "uhtml";
import { loadmore } from '../utils/observer.js';
import { imagePlaceholder } from '../utils/image-placeholder.js';
import { renderModal } from './modal.js';

function showModal(event) {
  let element = event.target;
  const data = document.store.data[element.dataset.i];

  renderModal(document.getElementById('modal'), data, element.dataset.i);
}

export const renderCard = (item, i, length, total) => {
  const src = `/images/small/${btoa((new URL(item.href)).origin)}.jpg`;
  return html`
<article class="box card">
  <div class="card-header">
    <h1>${item.title}</h1>
  </div>
  <div class="card-body">
    <picture class="card-image">
      <img ref=${loadmore} .dataset=${{ i: i, src: src, length: length, total: total }} src=${imagePlaceholder} decoding="async" loading="lazy" alt=${item.imageAlt} width="280" height="210"/>
    </picture >
    <div class="card-details">
      <ul>
        <li>
          Performace: <span>${Math.round(item.lighthouse.performance * 100)}%</span>
        </li>
        <li>
          FCP:
              <span>${(item.firstContentfulPaint / 1000).toFixed(1)}s</span>
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
