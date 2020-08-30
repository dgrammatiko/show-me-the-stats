export const loadmore = (element) => {
  if (element.customObserver) element.customObserver.unobserve(element)

  element.customObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const triggerUpdate = parseInt(element.dataset.length, 10) === parseInt(element.dataset.i, 10) + 1;
        if (triggerUpdate) {
          if (parseInt(element.dataset.length, 10) < parseInt(element.dataset.total, 10)) {
            document.dataLength = parseInt(element.dataset.length, 10) + 10
            document.store.data = document.data.slice(0, document.dataLength);
          }
        }
        observer.disconnect();
      }
    });
  });

  element.customObserver.observe(element);
};
