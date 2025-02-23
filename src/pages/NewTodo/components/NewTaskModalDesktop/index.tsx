import { Calendar, CalendarCheck, X } from "lucide-react"
import { SetStateAction } from "react"
import TagComponent from "../Tags"
import DateRangePicker from "../DateRangerPicker"

interface NewTaskModalDesktopProps {
    title: string
    setTitle: React.Dispatch<SetStateAction<string>>
    description: string
    setDescription: React.Dispatch<SetStateAction<string>>
    onClose: () => void
    setTags: React.Dispatch<React.SetStateAction<string[]>>
    tags: string[]
    setStartDate: React.Dispatch<React.SetStateAction<Date>>
    setEndDate: React.Dispatch<React.SetStateAction<Date>>
    startDate: Date
    endDate: Date
    addTodo: ()=>void

}

export const NewTaskModalDesktop = ({
    description,
    setDescription,
    onClose,
    tags,
    setTags,
    setEndDate,
    setStartDate,
    startDate,
    endDate,
    addTodo,
    title,
    setTitle


}: NewTaskModalDesktopProps) => {
    return (
        <>
            <div className="flex justify-between z-10">
                <div className="flex">
                    <p className="text-lg text-zinc-600 font-extrabold mb-2 sm:mb-4 uppercase">Nova tarefa</p>
                </div>
                <button onClick={() => onClose()}><X /></button>
            </div>
            <p className="mb-2 font-bold text-zinc-600">Título</p>
            <input
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Estudar direito constitucional"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <p className="mb-2 font-bold text-zinc-600">Descrição</p>
            <textarea
                className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Escreva a descrição da tarefa"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TagComponent tags={tags} setTags={setTags} />
            <DateRangePicker
                endDate={endDate}
                startDate={startDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate} />
            <button
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    addTodo()
                }}
                type="submit"
                className="text-white flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 transition duration-300">
                <CalendarCheck className="mr-2" />
                Salvar tarefa
            </button>
        </>
    )
}