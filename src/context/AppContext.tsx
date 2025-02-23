import React, { ReactNode, SetStateAction } from "react";
import { createContext, useContext } from "react";
import { Task } from "../models/models";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase.config";





type AppContextProps = {
    tasks: Task[]
    setTasks: (t: Task[]) => void
    isLoading: boolean
    setIsLoading: (b: boolean) => void
    isSidebarOpen: boolean
    setIsSidebarOpen: (b: boolean) => void
    fetchTasks: () => void
    changeOrder: () => void
    isReverseOrder: boolean
    isLogging: boolean
    user: User | undefined
    logout: () => void
    activeTab: 'all' | 'pendents' | 'completed'
    setActiveTab: React.Dispatch<SetStateAction<'all' | 'pendents' | 'completed'>>
    searchText: string
    setSearchText: React.Dispatch<SetStateAction<string>>
    quantities: { value: string, qtt: number }[]
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {

    const [tasks, setTasks] = React.useState<Task[]>([])
    const [quantities, setQuantities] = React.useState<{ value: string, qtt: number }[]>([])
    const [isLoading, setIsLoading] = React.useState(true);
    const [isReverseOrder, setIsReverseOrder] = React.useState(true)
    const [isLogging, setIsLogging] = React.useState(true)
    const [user, setUser] = React.useState<User>()
    const [activeTab, setActiveTab] = React.useState<'all' | 'pendents' | 'completed'>('all');
    const [searchText, setSearchText] = React.useState<string>('')
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    function logout() {
        try {
            auth.signOut()
            setUser(undefined)
        } catch (error) {
            console.log(error)
        }
    }

    function checkUserLoggedIn() {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogging(true);
                setUser(user);
            } else {
                setIsLogging(false);
            }
        });

        return () => unsubscribe();
    }




    async function fetchTasks() {
        fetch(`${import.meta.env.VITE_API_URL}/tasks`)
            .then(response => response.json())
            .then(data => {
                const tasks: Tasks = data.tasks
                // const tasks = data.filter((task: Task) => task.author === user?.email);
                setTasks(tasks);
                // setTasks(isReverseOrder ? tasks : tasks.reverse());
                setIsLoading(false);
            });
    }

    async function changeOrder() {
        setIsReverseOrder(!isReverseOrder)
        await fetchTasks()
    }

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
        }, 200);

        // fetch(`${import.meta.env.VITE_API_URL}/tasks`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setTasks(data.tasks);
        //         // setTasks(isReverseOrder ? data.reverse() : data);
        //         setIsLoading(false);
        //     });

        return () => clearTimeout(timeoutId);
    }, []);

    React.useEffect(() => {
        checkUserLoggedIn()

        // if (activeTab === 'completed') {
            const completed = tasks.filter(item => item.status === 'completed').length
            const pendents = tasks.filter(item => item.status === 'incomplete').length
            setQuantities([
                {
                    value: 'completed',
                    qtt: completed
                },
                {
                    value: 'pendents',
                    qtt: pendents
                }
            ])

        // }

    }, [tasks]);



    return (
        <AppContext.Provider value={{
            tasks,
            setTasks,
            isLoading,
            setIsLoading,
            fetchTasks,
            changeOrder,
            isReverseOrder,
            isLogging,
            user,
            logout,
            activeTab,
            setActiveTab,
            searchText,
            setSearchText,
            quantities,
            isSidebarOpen,
            setIsSidebarOpen
        }}>
            {children}
        </AppContext.Provider>
    );
}


export function useAppContext(): AppContextProps {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppContext');
    }
    return context;
}