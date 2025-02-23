import { AxiosResponse } from "axios";
import { setTask as setTaskTask } from "./reducer";
import { stringify } from "querystring";

interface Response {
  message: string;
  tasks: TaskItem[]
}

export const setTask =
  (...[, , , dispatch]: any) =>
    <T extends FlattenKeys<TaskState>>(
      field: T,
      value: DeepType<TaskState, T>
    ): void =>
      dispatch(setTaskTask(field, value));


export const setTaskItem =
  (getState: () => RootState, actions: ActionsType) =>
    <T extends FlattenKeys<TaskItem>>(
      field: T,
      value: DeepType<TaskItem, T>
    ): void => {
      const {
        task: { setTask },
      } = actions;
      const state = getState();

      const selectedCartItemIndex = state.task.selectedItemIndex;
      const selectedItem = state.task.items[selectedCartItemIndex];
      if (!selectedItem) return;

      setTask(`items.${selectedCartItemIndex}.${field}`, value as any);
    };


export const getTasks =
  (_getState: () => RootState, actions: ActionsType) =>
    (searchFilter?: SearchFilter<TaskItem>) =>
      new Promise<AxiosResponse<Response>>((resolve, reject) => {
        const {
          request: { GET },
        } = actions;
        GET
          <Response>("tasks")
          .then(resolve)
          .catch((error) => {
            console.error("Error in getTasks:", error);
            reject(error);
          });
      });

export const filterTasks =
  (getState: () => RootState, actions: ActionsType) => () =>
    new Promise<Response>((resolve, reject) => {
      const {
        task: { getTasks, setTask },
      } = actions;
      const state = getState();
      const searchFilter = state.task.filter.task.filter;


      getTasks(searchFilter)
        .then(({ data }) => {
          setTask("items", data.tasks);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error in filterTasks:", error);
          reject(error);
        });
    });


