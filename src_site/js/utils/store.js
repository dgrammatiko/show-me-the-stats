export const Store = function () {
  let data = [];

  Object.defineProperty(this, 'data', {
    get: function () {
      return data;
    },
    set: function (value) {
      data = value;
      window.document.dispatchEvent((new CustomEvent('updated', {})))
    }
  });
}
