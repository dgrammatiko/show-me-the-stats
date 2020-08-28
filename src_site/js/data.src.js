import { render, html } from "uhtml";

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
  const url = `Screenshot of ${new URL(item.href).hostname
    .replace("www.", "")
    .replace(/\//, " ")}`;
  const src =
    item.metrics.performance === 0
      ? ""
      : `/images/thumbs/${new URL(item.href).hostname.replace("www.", "")}.jpg`;
  return html` <li class="card" .dataset=${{ i: i }}>
    <div style="height: 3rem">
      <a href="${item.href}"><h3>${item.title}</h3></a>
    </div>
    <picture>
      <img loading="lazy" .dataset=${{ src: src }} alt=${url} />
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
    html` <blockquote>
      <p>
        <b
          >Data from Joomla's
          <a rel="external" href="https://showcase.joomla.org"
            >Showcase Directory</a
          ></b
        >
      </p>
    </blockquote>
    <ul class="cards">
      ${data.map((item, i) => renderCard(item, i))}
    </ul>`
  );

  const images = [].slice.call(
    document.querySelectorAll('img[loading="lazy"]')
  );
  images.forEach(lazyload);
}




// fetch("/final.json")
//   .then((response) => {
//     debugger;
//     if (response.status >= 200 && response.status < 300) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(new Error(response.statusText));
//     }
//   })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     render(
//       document.getElementById("content"),
//       html` <blockquote>
//           <p>
//             <b
//               >Data from Joomla's
//               <a rel="external" href="https://showcase.joomla.org"
//                 >Showcase Directory</a
//               ></b
//             >
//           </p>
//         </blockquote>
//         <ul class="cards">
//           ${data.map((item, i) => renderCard(item, i))}
//         </ul>`
//     );

//     const images = [].slice.call(
//       document.querySelectorAll('img[loading="lazy"]')
//     );
//     images.forEach(lazyload);
//   })
//   .catch((error) => {
//     render(
//       document.getElementById("content"),
//       html`<h1>💩, that wasn't expected</h1>`
//     );
//     console.log("Request failed", error);
//   });
