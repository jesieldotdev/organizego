import { getNestedField } from "../../utils/utils";
import { getDefaultTaskItem } from "./utils";

export const getTask =
  (state: RootState) =>
  <T extends FlattenKeys<TaskState>>(field: T) =>
    getNestedField(state.task, field);


  export const getTaskItem = (state: RootState) => (): TaskItem => {
    const { items, selectedItemIndex } = state.task;
    return items[selectedItemIndex] ?? getDefaultTaskItem();
  };