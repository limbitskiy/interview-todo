<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
  </Head>

  <div
    class="main grid grid-rows-[auto_245px] max-w-[1000px] bg-[var(--red-color)] flex-1 rounded-[var(--border-radius)] m-2 overflow-hidden md:m-0 md:rounded-none md:grid-rows-[60px_auto]"
  >
    <div class="desktop-header bg-[#333333] h-[60px] justify-between text-white items-center px-6 hidden md:flex">
      <span class="text-[20px]">{{ pageTitle }}</span>
      <div class="btns flex gap-2 items-center">
        <UButton
          class="text-black text-[18px] py-2 px-8 !text-center font-base border border-black hover:bg-[#76b1fd]"
          icon="carbon:undo"
          :ui="{ rounded: 'rounded-full' }"
          color="sky"
          @click="onUndo"
        ></UButton>
        <UButton
          class="text-black text-[18px] bg-[var(--red-color)] hover:bg-[#FFBCB2] py-2 px-8 !text-center font-base border border-black"
          icon="humbleicons:times"
          :ui="{ rounded: 'rounded-full' }"
          @click="$router.back()"
        ></UButton>
        <UButton
          class="text-black text-[18px] bg-[var(--green-color)] hover:bg-[#CBF0D5] py-2 px-8 !text-center font-base border border-black"
          icon="material-symbols:check"
          :ui="{ rounded: 'rounded-full' }"
          @click="onConfirmTodo"
        ></UButton>
      </div>
    </div>

    <div class="content py-4 px-6">
      <div class="top-toolbar flex justify-end md:hidden">
        <UButton variant="ghost" :ui="{ rounded: 'rounded-full' }" color="gray" icon="carbon:undo" @click="onUndo"></UButton>
        <UButton variant="ghost" :ui="{ rounded: 'rounded-full' }" color="gray" icon="humbleicons:times" @click="$router.back()"></UButton>
        <UButton variant="ghost" :ui="{ rounded: 'rounded-full' }" color="gray" icon="material-symbols:check" @click="onConfirmTodo"></UButton>
      </div>

      <div class="todo-form flex flex-col gap-4">
        <div class="form-title flex flex-col gap-2 items-start">
          <label class="text-[12px] text-[#151515]">Название заметки:</label>
          <UInput v-model="todoClone!.title" class="w-full border border-black rounded-[18px]" size="xl" :ui="{ rounded: 'rounded-[18px]' }" />
        </div>

        <div class="task-list-cnt flex flex-col gap-2 items-start">
          <label class="text-[12px] text-[#151515]">Список задач:</label>
          <TaskList :data="todoClone?.tasks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRefHistory } from "@vueuse/core";

import type { Todo } from "~/types";

const route = useRoute();
const todoId = route.params.id;

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);
const { setTodo } = todoStore;

const currentTodo = todos.value.find((todo) => todo.id === +todoId);

const todoClone = ref<Todo | null>(null);

if (currentTodo) {
  todoClone.value = JSON.parse(JSON.stringify(currentTodo));
} else {
  todoClone.value = {
    id: getNextFreeId(todos.value),
    title: "",
    tasks: [],
  };
}

const { undo: onUndo } = useRefHistory(todoClone, {
  deep: true,
});

const pageTitle = ref(`Задача: "${todoClone.value?.title}"`);

const onConfirmTodo = () => {
  setTodo(todoClone.value!);
  navigateTo("/");
};
</script>
