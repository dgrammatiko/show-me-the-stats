import { render, html } from 'uhtml' //'https://unpkg.com/uhtml?module';

window.renderData = [];

// const lazyload = (element) => {
//   const io = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         element.src = element.getAttribute("data-src");
//         observer.disconnect();
//       }
//     });
//   });

//   io.observe(element);
// };
// ref=${ lazyload }

const loadmore = (element) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const triggerUpdate = parseInt(element.dataset.length, 10) === parseInt(element.dataset.i, 10) + 1;
        if (parseInt(element.dataset.i, 10) + 1 < parseInt(element.dataset.length, 10)) {
          observer.disconnect();
        }

        if (triggerUpdate) {
          window.renderData = window.allData.slice(0, parseInt(element.dataset.length, 10) + 10);
          observer.disconnect();
          renderApp();
        }

      }
    });
  });

  io.observe(element);
};

const renderApp = () => render(
  document.getElementById("content"),
  html`<ul class="cards">
  ${ renderData.map((item, i) => renderCard(item, i, renderData.length))}
    </ul> `
);

const renderCard = (item, i, length) => {
  const src = `/images/small/${btoa((new URL(item.href)).origin)}.jpg`;
  return html`<li class="card" ref=${loadmore} .dataset=${{ i: i, length: length }} >
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
    </div >
  </li > `;
};

const dataString = document.querySelector('#data-source').innerHTML
window.allData = JSON.parse(dataString);
window.renderData = window.allData.slice(0, 10)

if (window.renderData) {
  renderApp()
}
