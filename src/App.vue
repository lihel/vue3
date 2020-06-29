<template>
  <div>
    <!-- <img src="./logo.png" /> -->
    <h1>Hello Vue 3!{{top}}</h1>
    <!-- <button @click="inc">Clicked {{ count }} times.</button> -->
    <input :class="{fixeditem:top}" type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <ul>
      <li
        @click="toggle(index)"
        :class="[{done:todo.completed},'todo-item']"
        v-for="(todo,index) in todos"
        :key="todo.id"
      >{{todo.title}}</li>
    </ul>
    <div>{{remaining}}</div>
  </div>
</template>

<script>
// composition API最好的特性就是可以拆分独立的函数，放在别的文件里
// vue2只能用mixin来做，但是mixin会找不到源头，也会有重名bug
// 如果不 import 打包时可以丢掉，就是所谓的tree-shaking
import { ref, reactive, toRefs, computed } from "vue";
import useAddTodo from "./addTodo";
import useScroll from "./useScroll";

export default {
  setup() {
    // const count = ref(0);
    // 定义一个 count 的响应式数据，并赋值为 0
    // ref 将给定的值(确切的说是基本数据类型)创建一个响应式的数据对象
    const state = reactive({
      newTodo: "",
      todos: [
        { id: "1", title: "吃饭", completed: true },
        { id: "2", title: "睡觉", completed: false },
        { id: "3", title: "打豆豆", completed: false },
        { id: "4", title: "打豆豆", completed: false },
        { id: "5", title: "打豆豆", completed: false },
        { id: "6", title: "打豆豆", completed: false },
        { id: "7", title: "打豆豆", completed: false }
      ]
    });
    // vue3中computed是函数，不使用对象配置的方式
    const remaining = computed(
      () => state.todos.filter(todo => !todo.completed).length
    );
    function toggle(i) {
      state.todos[i].completed = !state.todos[i].completed;
    }
    // 数据来源清晰
    const { addTodo } = useAddTodo(state);
    const { top } = useScroll();

    return {
      // toRefs 可以将reactive创建出的对象展开为基础类型
      ...toRefs(state),
      addTodo,
      remaining,
      toggle,
      top
    };
  }
};
</script>

<style scoped>
li.done {
  text-decoration: line-through;
  cursor: pointer;
}
.todo-item {
  height: 100px;
}
input.fixeditem {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
