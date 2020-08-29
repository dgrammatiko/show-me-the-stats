export const store = new Proxy({
    data: []
}, {
    get(target, property) {
        return target[property]
    },
    set(target, property, value) {
        target[property] = value;
        document.dispatchEvent((new CustomEvent('updated', {})))
        return true
    }
});
