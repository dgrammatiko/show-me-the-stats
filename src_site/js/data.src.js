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
    <div class="card-header">
      <a href="${item.href}"><h3>${item.title}</h3></a>
    </div>
    <div class="card-body">
      <picture class="card-image">
        <img loading="lazy" .dataset=${{ src: item.imageSrc ? item.imageSrc.replace('/images/', '/images/thumbs/') : '' }} alt=${item.imageAlt} ref=${lazyload}/>
      </picture>
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
