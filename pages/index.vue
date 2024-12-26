<template>
  <div
    class="main grid grid-rows-[50px_auto_144px] max-w-[1000px] bg-[var(--yellow-color)] flex-1 rounded-[var(--border-radius)] m-2 overflow-hidden md:m-0 md:rounded-none md:grid-rows-[60px_auto]"
  >
    <h1 class="text-[18px] uppercase font-bold mt-4 mb-2 md:hidden">Заметки</h1>
    <div class="desktop-header bg-[#333333] h-[60px] justify-between text-white items-center px-6 hidden md:flex">
      <span class="text-[20px]">Заметки</span>
      <div class="btns">
        <UButton
          class="text-black text-[18px] bg-[var(--green-color)] hover:bg-[#CBF0D5] py-2 px-8 !text-center font-base border border-black"
          icon="material-symbols:add-2"
          :ui="{ rounded: 'rounded-full' }"
          block
          @click="onCreateTodo"
          >Создать заметку</UButton
        >
      </div>
    </div>

    <TodoList @todo-click="onEditTodo" />

    <Footer>
      <div class="todo-total flex gap-2 justify-start text-gray-500 text-sm">
        <span>Всего заметок:</span>
        <span>{{ todos.length }}</span>
      </div>
      <UButton
        class="text-black text-[18px] bg-[var(--green-color)] hover:bg-[#CBF0D5] w-full py-2 !text-center font-base border border-black"
        icon="material-symbols:add-2"
        :ui="{ rounded: 'rounded-full' }"
        block
        @click="onCreateTodo"
        >Создать заметку</UButton
      >
    </Footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Список задач",
});

const todoStore = useTodoStore();

const { todos } = storeToRefs(todoStore);

const onCreateTodo = () => {
  navigateTo(`/todo/new`);
};
const onEditTodo = (todoId: number) => {
  navigateTo(`/todo/${todoId}`);
};
</script>
