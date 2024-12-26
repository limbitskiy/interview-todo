import type { Task, Todo } from "~/types";

export const getNextFreeId = (data: (Todo | Task)[]) => {
  const tasksClone: (Todo | Task)[] = JSON.parse(JSON.stringify(data));
  const sorted = tasksClone.sort((a, b) => a.id - b.id);

  if (sorted.length) {
    return sorted[sorted.length - 1].id + 1;
  } else {
    return 0;
  }
};
