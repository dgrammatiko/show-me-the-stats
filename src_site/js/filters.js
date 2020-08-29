import { html, render } from 'uhtml';
import { sortData } from './sort-algo.js';

const sortIt = (event) => {
  const element = event.target;
  console.log({
    sortBy: element.value,
    direction: direction.value,
  })
  sortData({
    sortBy: element.value,
    direction: direction.value,
  });
}

const changeDirection = (event) => {
  const element = event.target;
  console.log({
    sortBy: order.value,
    direction: element.value,
  })
  sortData({
    sortBy: order.value,
    direction: element.value,
  });
}

export const navigation = () => {
  render(
    document.querySelector('header'),
    html`<nav>
      <ul style="display: flex; flex: 0 1; flex-direction: row;">
        <li style="display: flex; flex: 0 1; flex-direction: row;">
          <label for="order" style="align-self: center">Order: </label>
          <select id="order" style="align-self: center; min-width: 220px" onchange=${sortIt}>
            <option value="id">📅 Added</option>
            <option value="title">🆒 Name</option>
            <option value="performance">🏎 Performance</option>
            <option value="accessibility">♿️ Accessibility</option>
            <option value="bestPractices">♻️ Best Practices</option>
            <option value="seo">🌐 SEO</option>
            <option value="carbon">🌲 Carbon footprint</option>
          </select>
        </li>
        <li style="display: flex; flex: 0 1; flex-direction: row;">
          <label for="direction" style="align-self: center">Direction: </label>
          <select id="direction" style="align-self: center; min-width: 140px" onchange=${changeDirection}>
            <option value="desc">⏬ Desc</option>
            <option value="asc">⏫ Asc</option>
          </select>
        </li>
      </ul>
    </nav>`
  );
}
