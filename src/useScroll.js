// 拆分独立的逻辑功能，返回滚动高度
import { ref, onMounted, onUnmounted } from "vue";

export default function useScroll() {
  const top = ref(0);
  function update(e) {
    top.value = window.scrollY;
  }
  // 生命周期
  onMounted(() => {
    window.addEventListener("scroll", update);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", update);
  });
  return { top };
}
