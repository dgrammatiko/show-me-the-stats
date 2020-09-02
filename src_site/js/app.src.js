import { render, html } from 'uhtml';
import { Store } from './utils/store.js';
import { navigation } from './components/filters.js';
import { renderCard } from './components/card.js';

document.dataLength = 10;
document.store = new Store();

document.addEventListener('updated', () => render(
  document.getElementById("content"),
  html`<section class="cards">${document.store.data.map((item, i) => renderCard(item, i, document.store.data.length, document.data.length))}</section>`
));

// Get the data, update the store
const dataString = document.querySelector('#data-source').innerHTML
document.data = JSON.parse(dataString);

document.store.data = document.data.slice(0, document.dataLength);

function fetchData() {
  fetch('/data.json')
    .then(resp => resp.json())
    .then(newData => {
      document.data = newData;
      document.store.data = document.data.slice(0, document.dataLength);
    })
    .catch(error => {
      console.log('💩 we\'ve messed up big time');
    });
}
requestIdleCallback(fetchData)

navigation();
