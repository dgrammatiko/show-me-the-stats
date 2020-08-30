import { render, html } from "uhtml"

let focusableElements = [];
const KEYCODE = {
  TAB: 9,
  ESC: 27,
};

function modalEncapsulation(modal) {
  modal.style.display = 'table';
  focusableElements = [].slice.call(modal.querySelectorAll(['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'].join()));

  if (focusableElements.length) {
    focusableElements[0].focus();
  }

  function keycontrol(e) {
    // ESC key
    if (e.keyCode === KEYCODE.ESC) {
      console.log(modal)
      modal.style.display = 'none';
      document.removeEventListener(modal, keycontrol);
    }

    // TAB key
    if (e.keyCode === KEYCODE.TAB) {
      // this.handleTabEvent(e);
      // Get the index of the current active element within the modal
      const focusedIndex = focusableElements.indexOf(document.activeElement);
      // Handle TAB event if need to skip
      // If first element is focused and shift key is in use
      if (e.shiftKey && (focusedIndex === 0 || focusedIndex === -1)) {
        // Focus last item within modal
        focusableElements[focusableElements.length - 1].focus();
        e.preventDefault();
      }
      // If last element is focused and shift key is not in use
      if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
        // Focus first item within modal
        focusableElements[0].focus();
        e.preventDefault();
      }
    }
  };

  document.addEventListener('keyup', keycontrol);

  // window.addEventListener('click', (event) => {
  //   const clickedEl = event.target
  //   console.log(clickedEl)
  //   // if (clickedEl.closest('.modal') !== modal) {
  //   //   modal.parentNode.innerHTML = ''
  //   // }
  // });
  console.log(modal)
}

export const renderModal = (where, data) => {
  render(
    where,
    html`
<div id="modal-container" ref=${modalEncapsulation} style="display: table;">
  <div class="modal-background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>`
  );
}
