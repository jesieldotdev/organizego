import { Archive, Check, Ellipsis, Menu, Trash } from "lucide-react"
import { useState } from "react"
import { Task } from "../../../../models/models"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'; // Importa o locale pt-br
import { useAppContext } from "../../../../context/AppContext";
import { ControllerCard } from "./viewController";

dayjs.locale('pt-br');
interface CardProps {
    todo: Task
}



export const Card = ({ todo }: CardProps) => {

    const {
        done,
        onChangeState,
        onRemoveTask,
        tagSearch
    } = ControllerCard({ todo })

    const formattedDate = todo.created_at ? dayjs(todo.created_at).format("DD [de] MMMM") : 'Data inválida';
 


    return (
        <div className={`mb-2 flex flex-col justify-between rounded-lg p-4 m-1 bg-white cursor-pointer shadow-sm max-h-72`}>

            <div className="flex justify-between ">
                <p className="bg-blue-sec p-1 px-2 rounded-lg text-xs font-bold text-iphone-blue-2">Tarefa</p>
                <button>
                    <Ellipsis /></button>
            </div>

            <div >
                <p onClick={async () => await onChangeState(todo.id, todo?.status)} className={`font-bold text-lg text-zinc-600 p-2  ${todo.status === "completed"  ? `line-through` : ''}`}>{todo?.title}</p>
                <p className={`font-normal text-zinc-600 p-2 whitespace-normal overflow-hidden line-clamp-2 ${todo.status === "completed" ? `line-through` : ''}`}>
                    {todo?.description}
                </p>

                {/* <div className={`font-normal text-sm  p-2 overflow-ellipsis text-green-400 `}>{!!todo.tags.length && todo.tags.map(item => <div key={item}><button onClick={() => tagSearch(item)} className="underline " >#{item}</button><br /></div>)}</div> */}
            </div>

            <div className="flex flex-row align-bottom justify-between  border-t mt-4 pt-2">

                <div className="flex align-middle">

                    <p className=" text-xs text-slate-400 mr-2">{formattedDate}</p>
                    {
                        todo.status === "completed"  ? <div className="bg-iphone-blue text-iphone-white text-xs rounded-full p-1"><Check size={12} /></div> : null
                    }
                </div>




                <Archive onClick={() => onRemoveTask(todo?.id)} className="mt-auto w-5 h-5 text-zinc-800" />


            </div>

        </div>
    )
}