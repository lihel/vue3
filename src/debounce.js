export default function debounce(fn, delay) {
  let time = null;
  return function () {
    if (time) {
      clearInterval(time);
    }
    time = setTimeout(fn, delay);
  };
}
