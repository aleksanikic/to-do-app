import React, { useState, useEffect, createContext, useContext } from "react";

export const TasksContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [filterUserId, setFilterUserId] = useState(null);
    const [leftSort, setLeftSort] = useState("title-asc");
    const [rightSort, setRightSort] = useState("date-desc");
    const [loading, setLoading] = useState(true);

    const [tasksPerClick, setTaskPerClick] = useState(5);
    const [visibleCount, setVisibleCount] = useState({
        completed:5,
        uncompleted:5
    })

    useEffect(() => {
        async function fetchTasks() {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos"
                );
                const data = await response.json();
                const tasksWithDates = data.map((task) => ({
                    ...task,
                    completedDate: task.completed ? new Date() : null,
                }));
                setTasks(tasksWithDates);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, []);

    const completedTasks = tasks.filter(
        (task) =>
            task && typeof task.completed !== "undefined" && task.completed
    );
    const uncompletedTasks = tasks.filter(
        (task) =>
            task && typeof task.completed !== "undefined" && !task.completed
    );
    


    function getSortedTasks(tasks, sortType) {
        const sorted = [...tasks];
        switch (sortType) {
            case "title-asc":
                return sorted.sort((prev, next) =>
                    prev.title.localeCompare(next.title)
                );
            case "title-desc":
                return sorted.sort((prev, next) =>
                    next.title.localeCompare(prev.title)
                );
            case "date-asc":
                return sorted.sort(
                    (prev, next) =>
                        new Date(prev.completedDate) -
                        new Date(next.completedDate)
                );
            case "date-desc":
                return sorted.sort(
                    (prev, next) =>
                        new Date(next.completedDate) -
                        new Date(prev.completedDate)
                );
            default:
                return sorted;
        }
    }

    function completeHandler(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (!task) return null;
                if (task.id === id) {
                    return {
                        ...task,
                        completed: true,
                        completedDate: new Date(),
                    };
                } else {
                    return task;
                }
            })
        );
    }

    function uncompleteHandler(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (!task) return null;
                if (task.id === id) {
                    return {
                        ...task,
                        completed: false,
                        completedDate: null,
                    };
                } else {
                    return task;
                }
            })
        );
    }

    const value = {
        completedTasks: getSortedTasks(
            filterUserId
                ? completedTasks.filter((task) => task.userId === filterUserId)
                : completedTasks,
            rightSort
        ),
        uncompletedTasks: getSortedTasks(
            filterUserId
                ? uncompletedTasks.filter(
                      (task) => (task.userId === filterUserId)
                  )
                : uncompletedTasks,
            leftSort
        ),
        filterUserId,
        setFilterUserId,
        rightSort,
        setRightSort,
        leftSort,
        setLeftSort,
        completeHandler,
        uncompleteHandler,
        loading,
        visibleCount,
        loadMore: (type) =>{
            setVisibleCount(prev => ({
                ...prev,
                [type]:prev[type] + tasksPerClick
            }))
        },
        setTaskPerClick
    };

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}
