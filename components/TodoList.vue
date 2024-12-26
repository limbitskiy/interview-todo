<template>
  <TransitionGroup tag="ul" class="todo-list px-4 py-2 flex flex-col gap-4 overflow-y-auto overflow-x-hidden lg:py-8" name="list-animation">
    <li
      v-for="todo in todos"
      :key="todo.id"
      class="border border-black min-h-[65px] rounded-[var(--border-radius)] w-full py-4 px-6 flex flex-col gap-1 items-start cursor-pointer relative"
      :style="`background-color: var(${getRandomBGColor()})`"
    >
      <span class="font-medium">{{ todo.title }}</span>
      <ul class="short-task-list flex flex-col items-start">
        <li v-for="task in todo.tasks.slice(0, 2)" :key="task.id" class="text-[12px]">
          <UCheckbox :modelValue="task.selected" name="task checkbox" :label="task.text" class="pointer-events-none" />
        </li>
      </ul>
      <div class="btns absolute top-4 right-4 flex items-center">
        <UButton color="sky" variant="ghost" :ui="{ rounded: 'rounded-full' }" icon="material-symbols:edit-outline" @click="emit('todo-click', todo.id)"></UButton>
        <UButton color="red" variant="ghost" :ui="{ rounded: 'rounded-full' }" icon="material-symbols-light:delete-outline-sharp" @click="() => onConfirmRemoval(todo)"></UButton>
      </div>
    </li>
  </TransitionGroup>

  <!-- confirmation modal -->
  <UModal v-model="isConfirmRemovalModalOpen">
    <div class="p-4 flex flex-col gap-4">
      <div class="question flex flex-col gap-2 items-start">
        <span>Вы уверены что хотите удалить задание?</span>
      </div>
      <div class="btns flex gap-2 justify-end">
        <UButton
          class="text-black text-[18px] bg-[var(--red-color)] hover:bg-[#FFBCB2] py-2 px-6 !text-center font-base border border-black"
          icon="humbleicons:times"
          :ui="{ rounded: 'rounded-full' }"
          @click="
            () => {
              isConfirmRemovalModalOpen = false;
            }
          "
        ></UButton>
        <UButton
          class="text-black text-[18px] bg-[var(--green-color)] hover:bg-[#CBF0D5] py-2 px-6 !text-center font-base border border-black"
          icon="material-symbols:check"
          :ui="{ rounded: 'rounded-full' }"
          @click="onRemoveCurrentTask"
        ></UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import type { Todo } from "~/types";

const emit = defineEmits<{
  "todo-click": [todoId: number];
}>();

const todoStore = useTodoStore();

const { todos } = storeToRefs(todoStore);

const { removeItem } = useHandleData();

const currentTodo = ref<Todo | null>();

const colorMap = ["--red-color", "--green-color", "--purple-color", "--pink-color"];

const isConfirmRemovalModalOpen = ref(false);

const onConfirmRemoval = (todo: Todo) => {
  currentTodo.value = todo;
  isConfirmRemovalModalOpen.value = true;
};

const onRemoveCurrentTask = () => {
  removeItem(todos.value, currentTodo.value!);
  isConfirmRemovalModalOpen.value = false;
};

const getRandomBGColor = () => {
  return colorMap[Math.floor(Math.random() * colorMap.length)];
};
</script>
