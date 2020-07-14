// 防抖功能函数
// 采用存储时间变量
export default function debounce(fn, delay) {
  let time = null;
  return function () {
    if (time) {
      clearInterval(time);
    }
    time = setTimeout(fn, delay);
  };
}
