import { useStorage } from "@vueuse/core";
import type { Todo } from "~/types";

export const useTodoStore = defineStore("todo", () => {
  const state = ref({
    todos: useStorage("todos", <Todo[]>[]),
  });

  const todos = computed(() => state.value.todos);

  const addTodo = (todo: Todo) => {
    state.value.todos.push(todo);
  };

  const setTodo = (todo: Todo) => {
    const idx = state.value.todos.findIndex((stateTodo) => stateTodo.id === todo.id);

    if (idx >= 0) {
      state.value.todos.splice(idx, 1, todo);
    } else {
      state.value.todos.push(todo);
    }
  };

  const removeTodo = (todoId: number) => {
    const idx = state.value.todos.findIndex((stateTodo) => stateTodo.id === todoId);
    state.value.todos.splice(idx, 1);
  };

  return { todos, addTodo, setTodo, removeTodo };
});
