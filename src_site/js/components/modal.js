import { render, html } from "uhtml"
import { imagePlaceholder } from '../utils/image-placeholder.js'
const KEYCODE = {
  TAB: 9,
  ESC: 27,
};

const host = location.origin;

function imageLoad(img) {
  img.src = `${host}${img.dataset.src}`;
  img.style.opacity = 1;
}
function closeModal(event) {
  let element = event.target.closest('.modal')
  if (element) {
    element.close(element)
  }
}

function modalEncapsulation(modal) {
  modal.modalIsOpen = true;
  modal.focusableElements = [].slice.call(modal.querySelectorAll(['button:not([disabled])', 'a[href]', 'area[href]', '[tabindex]:not([tabindex^="-"])'].join()));

  function keycontrol(e) {
    // ESC key
    if (e.keyCode === KEYCODE.ESC) {
      modal.close(modal);
    }

    // TAB key
    if (e.keyCode === KEYCODE.TAB) {
      // this.handleTabEvent(e);
      // Get the index of the current active element within the modal
      const focusedIndex = modal.focusableElements.indexOf(document.activeElement);

      // Handle TAB event if need to skip
      // If first element is focused and shift key is in use
      if (e.shiftKey && (focusedIndex === 0 || focusedIndex === -1)) {
        // Focus last item within modal
        modal.focusableElements[modal.focusableElements.length - 1].focus();
        e.preventDefault();
      }
      // If last element is focused and shift key is not in use
      if (!e.shiftKey && focusedIndex === modal.focusableElements.length - 1) {
        // Focus first item within modal
        modal.focusableElements[0].focus();
        e.preventDefault();
      }
    }
  };

  modal.close = (element) => {
    element.modalIsOpen = false;
    document.body.style.overflow = 'unset';
    element.style.animationName = 'fadeOutDown';
    element.style.visibility = 'hidden';
    element.style.opacity = 0;
    const img = element.querySelector('[loading="lazy"]');
    const link = document.querySelector(`button[data-i="${element.dataset.i}"]`);
    img.src = imagePlaceholder;
    document.removeEventListener(document, element.keycontrol);

    if (link)
      link.focus();
  }

  // Open
  modal.style.animationName = 'fadeInUp';
  document.body.style.overflow = 'hidden';
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;
  modal.keycontrol = keycontrol;
  document.addEventListener('keydown', modal.keycontrol);


  modal.addEventListener('animationend', () => {
    if (modal.modalIsOpen && modal.focusableElements.length) {
      modal.focusableElements[0].focus();
    }
  });


}

export const renderModal = (where, data, index) => {
  const image = `/images/large/${data.imageSrc}.jpg`
  render(
    where,
    html`
<div class="modal" ref=${modalEncapsulation} role="dialog" aria-labelledby="modal-label" aria-hidden="false" data-i=${index} >
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-heading">${data.title}</h3>
      <button tabindex="0" class="modal-close-icon" aria-label="close" onclick=${closeModal}>&times;</button>
    </div>

    <div class="modal-body">
      <picture class="card-image">
        <img loading="lazy" src=${imagePlaceholder} data-src=${image} alt=${data.imageAlt} ref=${imageLoad} />
      </picture>
      <a href="#">test</a>
      <ul>
        <li>Performace: <span>${data.lighthouse.performance}%</span></li>
        <li>First contentful paint:<span>${data.firstContentfulPaint.toFixed(2)}Sec </span></li>
        <li>Best practices: <span>${Math.round(data.lighthouse.bestPractices)}%</span></li>
        <li>Accessibility:<span>${Math.round(data.lighthouse.accessibility)}%</span></li>
        <li>SEO: <span>${Math.round(data.lighthouse.seo)}%</span></li>
        <li>carbon footprint: <span>${data.lighthouse.carbon}</span></li>
      </ul>
      <p>${data.text}</p>
    </div>
  </div>
</div>`
  );
}
