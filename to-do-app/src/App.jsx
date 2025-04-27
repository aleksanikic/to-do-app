import PageTodo from "./components/PageTodo.jsx";
import Navbar from "./components/Navbar.jsx";



function App() { 
    return (
        <div className="size-full"> 
            <Navbar />
            <div className="flex flex-row basis-full justify-center flex-wrap size-full">
                <PageTodo>Pending:</PageTodo>
                <PageTodo>Completed:</PageTodo>
            </div>
        </div>
    );
}

export default App;
