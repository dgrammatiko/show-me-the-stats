import { html, render } from 'uhtml';
import { sortData } from '../utils/sort-algo.js';

const sortIt = (event) => {
  const element = event.target;
  sortData({
    sortBy: element.value,
    direction: direction.value,
  });
}

const changeDirection = (event) => {
  const element = event.target;
  sortData({
    sortBy: order.value,
    direction: element.value,
  });
}

export const navigation = () => {
  render(
    document.querySelector('header'),
    html`<nav>
      <ul style="display: flex; flex: 1 0; flex-direction: inherit; flex-wrap: wrap; justify-content: center;">
        <li>
          <label for="order">Order: </label>
          <select id="order" style="min-width: 220px" onchange=${sortIt}>
            <option value="id">📅 Added</option>
            <option value="title">🆒 Name</option>
            <option value="performance">🏎 Performance</option>
            <option value="firstContentfulPaint">👩‍🎨 FCP</option>
            <option value="accessibility">♿️ Accessibility</option>
            <option value="bestPractices">♻️ Best Practices</option>
            <option value="seo">🌐 SEO</option>
            <option value="carbon">🌲 Carbon footprint</option>
          </select>
        </li>
        <li>
          <label for="direction">Direction: </label>
          <select id="direction" style="min-width: 140px" onchange=${changeDirection}>
            <option value="desc">⏬ Desc</option>
            <option value="asc">⏫ Asc</option>
          </select>
        </li>
      </ul>
    </nav>`
  );
}
