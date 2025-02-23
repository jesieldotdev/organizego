import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useState, useEffect } from "react";
import React from "react";
import useStore from "../../hooks/useStore";



export const ControllerHome = () => {
    const {
        activeTab,
        searchText,
        isSidebarOpen,
        setIsSidebarOpen,
        changeOrder,
        isReverseOrder,
        isLogging,
        logout,
        user,
        isLoading,
     
    } = useAppContext();


    const [, actions, select] = useStore();

    const {
        task: {
            filterTasks
        }
    } = actions

    const tasks = select('task.items')
    

    const route = useNavigate();

    const options = ["Pendentes", "Feitas"];

    // React.useEffect(() => {
    //     if (!isLogging) route("/login");
    // }, [isLogging]);

    function onNewTodo() {
        route("/new");
        return;
    }

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNewTodo = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSidebarOpen(false);
    };

    function getTasks() {
        if (!tasks) return [];

        let filter = tasks;

        switch (activeTab) {
            case "all":
                break;
            // case "pendents":
            //     filter = filter.filter(item => item.status === "incomplete");
            //     break;
            // case "completed":
            //     filter = filter.filter(item => item.status === "completed");
            //     break;
            default:
                break;
        }

        if (searchText) {
            filter = filter.filter(
                (                item: { title: string; description: string; }) =>
                    item.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    item.description
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) 
                    // item.tags.some(tag =>
                    //     tag.toLowerCase().includes(searchText.toLowerCase())
                    // )
            );
        }

        return filter;
    }

    
   useEffect(() => {
    filterTasks()
      }, []);
    
   

    return {
        tasks: getTasks,
        changeOrder,
        isReverseOrder,
        isLogging,
        logout,
        user,
        toggleOption,
        onNewTodo,
        options,
        selectedOptions,
        handleCloseModal,
        getTasks,
        handleNewTodo,
        isModalOpen,
        setIsSidebarOpen,
        isSidebarOpen
    };
};
