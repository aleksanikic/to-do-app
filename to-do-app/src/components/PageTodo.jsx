import React from "react";
import { useTaskContext } from "./TaskProvider.jsx";
import ListItem from "./ListItem.jsx";

export default function PageTodo({ children }) {
    const {
        completedTasks,
        uncompletedTasks,
        rightSort,
        setRightSort,
        leftSort,
        setLeftSort,
        loading,
        visibleCount,
        loadMore,
    } = useTaskContext();

    const isCompleted = children.includes("Completed");
    const tasks = isCompleted ? completedTasks : uncompletedTasks;
    const type = isCompleted ? "completed" : "uncompleted";
    const visibleTasks = tasks.slice(0, visibleCount[type]);

    return (
        <div className="w-full md:w-1/2 p-4 wrap ">
            <h2 className="text-x1 font-bold mb-4">{children}</h2>

            {isCompleted && (
                <select
                    value={rightSort}
                    onChange={(event) => {
                        setRightSort(event.target.value);
                    }}
                    className="mb-5 p-2 border rounded"
                >
                    <option value="date-asc">Newest date</option>
                    <option value="data-desc">Oldest date</option>
                    <option value="title-asc">Title a-z</option>
                    <option value="title-desc">Title z-a</option>
                </select>
            )}
            {!isCompleted && (
                <select
                    value={leftSort}
                    onChange={(event) => setLeftSort(event.target.value)}
                    className="mb-5 p-2 border rounded"
                >
                    <option value="title-asc">Title a-z</option>
                    <option value="title-desc">Title z-a</option>
                </select>
            )}

            {loading ? (
                <div className="flex justify-center py-8">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {visibleTasks.length > 0 ? (
                        visibleTasks.map((task) => {
                            return (
                                <ListItem
                                    key={task.id}
                                    task={task}
                                    isCompleted={isCompleted}
                                />
                            );
                        })
                    ) : (
                        <p className="text-center">nothing found</p>
                    )}
                </div>
            )}
            {tasks.length > visibleTasks.length && !loading && (
                <button
                    onClick={() => loadMore(type)}
                    className="bg-gray-500 hover:bg-gray-700 mt-4 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Load more
                </button>
            )}
        </div>
    );
}
