import React, { useEffect, useState } from "react";
import { useTaskContext } from "./TaskProvider.jsx";

export default function Navbar() {
    const { filterUserId, setFilterUserId } = useTaskContext();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                if (!response.ok) {
                    throw new Error("Cannot fetch data");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, []);
    return (
        <nav className="relative flex w-full flex-wrap items-center  bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4 ">
            <div className="flex w-full flex-wrap items-center px-3">
                <div className="flex wrap justify-center ms-2">
                    <a className="text-xl text-black dark:text-white" href="#">
                        TO-DO LIST
                    </a>
                    <select
                        className='bg-white rounded text-black min-w-38 ml-3'
                        value={filterUserId || ""}
                        onChange={(event) => {
                            setFilterUserId(
                                event.target.value
                                    ? parseInt(event.target.value)
                                    : null
                            );
                        }}
                    >
                        <option value="">All users</option>
                        {users.map(user=>{
                            return <option key={user.id} value={user.id}>
                                {user.id}. {user.name}
                            </option>
                        })}
                    </select>
                </div>
            </div>
        </nav>
    );
}
