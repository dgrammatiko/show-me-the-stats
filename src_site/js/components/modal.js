import { render, html } from "uhtml"

const KEYCODE = {
  TAB: 9,
  ESC: 27,
};

function modalEncapsulation(modal) {
  modal.style.display = 'flex';
  modal.style.visibility = 'visible';
  modal.focusableElements = [].slice.call(modal.querySelectorAll(['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'].join()));

  console.log(modal.focusableElements)
  if (modal.focusableElements.length) {
    modal.focusableElements[0].focus();
  }

  function keycontrol(e) {
    debugger;
    // ESC key
    if (e.keyCode === KEYCODE.ESC) {
      console.log(modal)
      modal.style.display = 'none';
      modal.style.visibility = 'hidden';
      modal.removeEventListener(modal, keycontrol);
    }

    // TAB key
    if (e.keyCode === KEYCODE.TAB) {
      // this.handleTabEvent(e);
      // Get the index of the current active element within the modal
      const focusedIndex = modal.focusableElements.indexOf(document.activeElement);
      console.log(focusedIndex)
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

  modal.keycontrol = keycontrol;
  modal.addEventListener('keydown', modal.keycontrol);
  console.log(modal)
}

function closeModal(event) {
  let element = event.target.closest('.light-modal')
  if (element) {
    element.style.display = 'none';
    element.style.visibility = 'hidden';
    element.removeEventListener(element, element.keycontrol);
  }
}

export const renderModal = (where, data) => {
  const image = `/images/large/${data.imageSrc}.jpg`
  render(
    where,
    html`
<div class="light-modal" ref=${modalEncapsulation} role="dialog" aria-labelledby="light-modal-label" aria-hidden="false">
  <div class="light-modal-content animated fadeInUp">
    <div class="light-modal-header">
      <h3 class="light-modal-heading">${data.title}</h3>
      <button class="light-modal-close-icon" aria-label="close" onclick=${closeModal}>&times;</button>
    </div>

    <div class="light-modal-body">
      <picture class="card-image">
        <img loading="lazy" src=${image} />
      </picture>
      <a href="#">test</a>
      <ul>
        <li>Performace: <span>${data.metrics.performance}%</span></li>
        <li>First contentful paint:<span>${data.metrics.firstContentfulPaint.toFixed(2)}Sec </span></li>
        <li>Best practices: <span>${Math.round(data.metrics.bestPractices)}%</span></li>
        <li>Accessibility:<span>${Math.round(data.metrics.accessibility)}%</span></li>
        <li>SEO: <span>${Math.round(data.metrics.seo)}%</span></li>
        <li>carbon footprint: <span>${data.metrics.carbon.toFixed(3)}</span></li>
      </ul>
      <p>${data.text}</p>
    </div>
  </div>
</div>`
  );
}
