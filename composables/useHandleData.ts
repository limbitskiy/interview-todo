import type { Task, Todo } from "~/types";

export const useHandleData = () => {
  function insertOrPushItem(data: (Todo | Task)[], newItem: Todo | Task) {
    const idx = data?.findIndex((task) => task.id === newItem!.id);

    if (Number.isInteger(idx) && idx >= 0 && newItem) {
      data?.splice(idx, 1, newItem);
    } else {
      data?.push(newItem);
    }
  }

  function removeItem(data: (Todo | Task)[], newItem: Todo | Task) {
    const idx = data?.findIndex((task) => task.id === newItem!.id);

    if (Number.isInteger(idx) && idx >= 0 && newItem) {
      data?.splice(idx, 1);
    }
  }

  return { insertOrPushItem, removeItem };
};
