export default function (state) {
  function addTodo() {
    state.todos.push({
      id: Math.random(),
      title: state.newTodo,
      completed: false,
    });
    state.newTodo = "";
  }
  return { addTodo };
}
