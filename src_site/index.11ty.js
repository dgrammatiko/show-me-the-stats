const imagePlaceholder = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJpbWFnZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWltYWdlIGZhLXctMTYiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNDY0IDY0SDQ4QzIxLjQ5IDY0IDAgODUuNDkgMCAxMTJ2Mjg4YzAgMjYuNTEgMjEuNDkgNDggNDggNDhoNDE2YzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhWMTEyYzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6bS02IDMzNkg1NGE2IDYgMCAwIDEtNi02VjExOGE2IDYgMCAwIDEgNi02aDQwNGE2IDYgMCAwIDEgNiA2djI3NmE2IDYgMCAwIDEtNiA2ek0xMjggMTUyYy0yMi4wOTEgMC00MCAxNy45MDktNDAgNDBzMTcuOTA5IDQwIDQwIDQwIDQwLTE3LjkwOSA0MC00MC0xNy45MDktNDAtNDAtNDB6TTk2IDM1MmgzMjB2LTgwbC04Ny41MTUtODcuNTE1Yy00LjY4Ni00LjY4Ni0xMi4yODQtNC42ODYtMTYuOTcxIDBMMTkyIDMwNGwtMzkuNTE1LTM5LjUxNWMtNC42ODYtNC42ODYtMTIuMjg0LTQuNjg2LTE2Ljk3MSAwTDk2IDMwNHY0OHoiPjwvcGF0aD48L3N2Zz4=';

const renderCard = (item, i, length, total) => {
  // const src = `/images/small/${btoa((new URL(item.href)).origin)}.jpg`;
  const src = `/images/small/${Buffer.from((new URL(item.href)).origin).toString('base64')}.jpg`;

  return `<article class="box card">
  <div class="card-header">
    <h1>${item.title}</h1>
  </div>
  <div class="card-body">
    <picture class="card-image">
      <img data-i="${i}" data-src="${src}" data-length="${length}" data-total="${total}" loading="lazy" src="${imagePlaceholder}" alt="${item.imageAlt}" width="280" height="210" />
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
    <button class="showModal" type="button" data-i="${i}" >The results</button>
  </div>
</article>`;
};

class Test {
  async data() {
    return {
      name: 'text',
      title: 'All the data from showcase.joomla.org',
      layout: 'base.njk',
      // … other front matter keys
    };
  }

  async render(data) {
    const xxx = await data.prerenderData
    let loopOutput = '';
    for (const [i, item] of xxx.entries()) {
      loopOutput += renderCard(item, i, xxx.length, xxx.length)
    }

    return `<section class="cards">${loopOutput}</section>`
  }
}

module.exports = Test;
