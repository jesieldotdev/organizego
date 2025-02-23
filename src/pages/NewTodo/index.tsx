import { Calendar, CalendarCheck, ChevronLeft, Ellipsis, X } from "lucide-react";
import { ControllerNewTodo } from "./viewController";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TagComponent from "./components/Tags";
import DateRangePicker from "./components/DateRangerPicker";
import { NewTaskModalDesktop } from "./components/NewTaskModalDesktop";
import { NewTaskMobile } from "./components/NewTaskMobile";

export const NewTodo = ({ onClose }) => {
    const {
        addTodoHandler,
        description,
        setDescription,
        title,
        setTitle,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        tags,
        setTags,

    } = ControllerNewTodo(
        { onClose }
    );

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) setIsMobile(true);
    }, []);

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex justify-end items-right bg-black bg-opacity-40 z-10"
            onClick={handleClickOutside}
        >
            
            <motion.div
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full sm:max-w-lg p-4 sm:p-6 bg-white rounded-3xl rounded-r-none shadow-2xl "
            >
                {isMobile ? (
                    <NewTaskMobile
                        title={title}
                        setTitle={setTitle}
                        addTodo={addTodoHandler}
                        description={description}
                        endDate={endDate}
                        onClose={onClose}
                        setDescription={setDescription}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                        setTags={setTags}
                        startDate={startDate}
                        tags={tags}

                    />
                ) : (
                    <NewTaskModalDesktop
                        title={title}
                        setTitle={setTitle}
                        addTodo={addTodoHandler}
                        description={description}
                        endDate={endDate}
                        onClose={onClose}
                        setDescription={setDescription}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                        setTags={setTags}
                        startDate={startDate}
                        tags={tags}

                    />
                )}
            </motion.div>
        </div>
    );
};
