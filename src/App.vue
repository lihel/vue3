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
import { ref, reactive, toRefs, computed } from "vue";
import useAddTodo from "./addTodo";
import useScroll from "./useScroll";

export default {
  setup() {
    // const count = ref(0);
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
    const remaining = computed(
      () => state.todos.filter(todo => !todo.completed).length
    );
    function toggle(i) {
      state.todos[i].completed = !state.todos[i].completed;
    }
    const { addTodo } = useAddTodo(state);
    const { top } = useScroll();
    return {
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
