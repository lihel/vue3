// 拆分独立的逻辑功能，返回滚动高度
import { ref, onMounted, onUnmounted } from "vue";
import debounce from "./debounce";

export default function useScroll() {
  const top = ref(0);
  function update(e) {
    top.value = window.scrollY;
  }
  // 生命周期
  onMounted(() => {
    window.addEventListener("scroll", debounce(update,1000));
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", update);
  });
  return { top };
}
