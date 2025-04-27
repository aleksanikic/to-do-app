import { useTaskContext } from "./TaskProvider.jsx";
import React from "react";

export default function ListItem({ task, isCompleted }) {
    const { completeHandler, uncompleteHandler } = useTaskContext();
    

    return (
        <div className="flex flex-row  justify-between items-center w-4x p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 flex-wrap ">
            <div className="wrap">
                <p className="font-medium ">{task.title}</p>
                {isCompleted && task.completedDate && (
                    <p className="text-sm text-green-500">
                        Completed on:
                        {new Date(task.completedDate).toLocaleDateString()}
                    </p>
                )}
            </div>
            <button
                onClick={() =>
                    isCompleted
                        ? uncompleteHandler(task.id)
                        : completeHandler(task.id)
                        
                }
                className={
                    !isCompleted
                        ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                        : " bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                }
            >
                {isCompleted ? "Undo" : "Complete"}
            </button>
        </div>
    );
}
