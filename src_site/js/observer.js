export const loadmore = (element) => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const triggerUpdate = parseInt(element.dataset.length, 10) === parseInt(element.dataset.i, 10) + 1;
                if (triggerUpdate) {
                    if (parseInt(element.dataset.length, 10) < parseInt(element.dataset.total, 10)) {
                        store.data = allData.slice(0, parseInt(element.dataset.length, 10) + 10);
                    }
                }
                observer.disconnect();
            }
        });
    });

    io.observe(element);
};
