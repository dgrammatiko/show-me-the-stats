import { render, html } from 'https://unpkg.com/uhtml?module';

const lazyload = (element) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.src = element.getAttribute("data-src");
        observer.disconnect();
      }
    });
  });

  io.observe(element);
};

const renderCard = (item, i) => {
  return html`<li class="card" .dataset=${{ i: i }}>
    <div style="height: 3rem">
      <a href="${item.href}"><h3>${item.title}</h3></a>
    </div>
    <picture>
      <img loading="lazy" .dataset=${{ src: item.imageSrc ? item.imageSrc.replace('/images/', '/images/thumbs/') : '' }} alt=${item.imageAlt} ref=${lazyload}/>
    </picture>
    <ul>
      <li>Performace: ${Math.round(item.metrics.performance)}%</li>
      <li>
        First contentful paint:
        ${item.metrics.firstContentfulPaint.toFixed(2)}Sec
      </li>
      <li>Best practices: ${Math.round(item.metrics.bestPractices)}%</li>
      <li>Accessibility: ${Math.round(item.metrics.accessibility)}%</li>
      <li>SEO: ${Math.round(item.metrics.seo)}%</li>
      <li>carbon footprint: ${item.metrics.carbon.toFixed(3)}</li>
    </ul>
    <details>
      <summary>Description</summary>
      <p>${item.text}</p>
    </details>
  </li>`;
};

const dataString = document.querySelector('#data-source').innerHTML
const data = JSON.parse(dataString);

if (data) {
  render(
    document.getElementById("content"),
    html`<ul class="cards">
      ${data.map((item, i) => renderCard(item, i))}
    </ul>`
  );
}
