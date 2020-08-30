const TransformStreamCallback = (callback) => {
  if ('TransformStream' in self) {
    return callback();
  }
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = '/stream-module.js';
  s.addEventListener('load', callback);
  document.getElementsByTagName('head')[0].appendChild(s);
};
