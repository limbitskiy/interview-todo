<template>
  <div class="task-list bg-[var(--white-color)] p-4 border border-black rounded-[var(--border-radius)] flex flex-col gap-2 w-full">
    <ul class="task-list-inner">
      <li v-for="task in data" :key="task.id" class="flex items-center justify-between">
        <div class="task start">
          <UCheckbox v-model="task.selected" name="task checkbox" :label="task.text" />
        </div>
        <div class="task-end flex items-center">
          <UButton variant="ghost" color="blue" :ui="{ rounded: 'rounded-full' }" icon="material-symbols:edit-outline" @click="() => onEdit(task)"></UButton>
          <UButton variant="ghost" color="red" :ui="{ rounded: 'rounded-full' }" icon="material-symbols-light:delete-outline-sharp" @click="() => onConfirmRemoval(task)"></UButton>
        </div>
      </li>
    </ul>
    <UButton
      class="text-black text-[16px] bg-[var(--green-color)] hover:bg-[#CBF0D5] w-full py-2 !text-center font-base border border-black"
      icon="material-symbols:add-2"
      :ui="{ rounded: 'rounded-full' }"
      block
      @click="onCreateTask"
      >Создать</UButton
    >
  </div>

  <!-- edit modal -->
  <UModal v-model="isEditModalOpen">
    <div class="p-4 flex flex-col gap-4">
      <div class="form flex flex-col gap-2 items-start">
        <label class="text-[12px] text-[#151515]">Текст заметки:</label>
        <UInput v-model="currentTask!.text" class="w-full border border-black rounded-[18px]" size="xl" :ui="{ rounded: 'rounded-[18px]' }" />
      </div>
      <div class="btns flex gap-2 justify-end">
        <UButton
          class="text-black text-[18px] bg-[var(--red-color)] hover:bg-[#FFBCB2] py-2 px-6 !text-center font-base border border-black"
          icon="humbleicons:times"
          :ui="{ rounded: 'rounded-full' }"
          @click="
            () => {
              isEditModalOpen = false;
            }
          "
        ></UButton>
        <UButton
          class="text-black text-[18px] bg-[var(--green-color)] hover:bg-[#CBF0D5] py-2 px-6 !text-center font-base border border-black"
          icon="material-symbols:check"
          :ui="{ rounded: 'rounded-full' }"
          @click="onConfirmEdit"
        ></UButton>
      </div>
    </div>
  </UModal>

  <!-- confirmation modal -->
  <UModal v-model="isConfirmRemovalModalOpen">
    <div class="p-4 flex flex-col gap-4">
      <div class="question flex flex-col gap-2 items-start">
        <span>Вы уверены что хотите удалить заметку?</span>
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
          @click="onRemoveTask"
        ></UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import type { Task } from "~/types.d.ts";

const props = defineProps<{
  data: Task[] | undefined;
}>();

const isEditModalOpen = ref(false);
const isConfirmRemovalModalOpen = ref(false);
const currentTask = ref<Task | null>();

const { insertOrPushItem, removeItem } = useHandleData();

const onEdit = (task: Task) => {
  isEditModalOpen.value = true;
  currentTask.value = { ...task };
};

const onConfirmEdit = () => {
  insertOrPushItem(props.data!, currentTask.value!);
  isEditModalOpen.value = false;
};

const onConfirmRemoval = (task: Task) => {
  currentTask.value = task;
  isConfirmRemovalModalOpen.value = true;
};

const onRemoveTask = () => {
  removeItem(props.data!, currentTask.value!);
  isConfirmRemovalModalOpen.value = false;
};

const onCreateTask = () => {
  currentTask.value = {
    id: getNextFreeId(props.data!),
    text: "",
    selected: false,
  };

  isEditModalOpen.value = true;
};
</script>
