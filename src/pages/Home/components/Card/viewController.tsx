import { useAppContext } from "../../../../context/AppContext"
import { Task } from "@/models/models"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from 'notistack';
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskState, fetchTasks, removeTodo } from "../../../../store/slices/tasks";
interface ControllerCardProps{
    todo: Task
}

export const ControllerCard = ({
    todo
}:ControllerCardProps) => {

    const { setSearchText } = useAppContext()
    const [done, setDone] = useState(false)





    function tagSearch(item: string){
        setSearchText(item)
    }

    const dispatch: AppDispatch = useDispatch();
    const {  loading, name, tasks } = useSelector((state: RootState) => state.tasks);

    const onChangeState = async (taskId: number, currentStatus: string) => {
      try {
        // Despachando a ação changeTaskState para atualizar o status da tarefa
        const newStatus = currentStatus === 'completed' ? 'incomplete' : 'completed';
        
        // Dispara a ação para alterar o estado da tarefa
        await dispatch(changeTaskState({ taskId, status: newStatus })).unwrap();
        
        enqueueSnackbar('Estado da tarefa atualizado com sucesso!');
      } catch (error: any) {
        // Melhorando o tratamento de erro
        const errorMessage = error?.message || 'Erro desconhecido ao atualizar o estado da tarefa';
        enqueueSnackbar(errorMessage);
      }
    };
    

    const onRemoveTask = async (taskId: number) => {
        try {
          // Despachando a ação removeTodo e aguardando sua conclusão
          await dispatch(removeTodo(taskId)).unwrap();
          enqueueSnackbar('Tarefa excluída!');
        } catch (error) {
          enqueueSnackbar('Erro ao excluir a tarefa: ' + error);
        }
      };


      useEffect(()=> {
        if(todo.status === "incomplete") return setDone(false)
        else return  setDone(true)
      },[ dispatch])

      console.log(done)

    return {
        onRemoveTask,
        onChangeState,
        done,
        tagSearch
    }
}