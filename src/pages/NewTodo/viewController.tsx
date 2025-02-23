import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { addTodo } from "../../store/slices/tasks"
import { useDispatch } from 'react-redux';

interface ControllerNewTodoProps {
    onClose: () => void
}

export const ControllerNewTodo = ({ onClose }: ControllerNewTodoProps) => {
    const [title, setTitle] = useState(String)
    const [tags, setTags] = useState<string[]>([])
    const [description, setDescription] = useState(String)
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const route = useNavigate()

const dispatch = useDispatch()

    const date = new Date()
    const { setTasks, user } = useAppContext()

    const addTodoHandler = () => {
        if (title === '' || title === undefined) {
            return enqueueSnackbar('Dê um título para sua tarefa! 👍');
        }
    
        dispatch(addTodo({
            title,
            description,
            startDate,
            tags,
            endDate
        })).then(() => {
            console.log('Tarefa adicionada com sucesso');
            onClose();
        })
        
    };


    return {
        addTodoHandler,
        date,
        description,
        user,
        onClose,
        setDescription,
        title,
        setTitle,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        tags,
        setTags

    }
}

