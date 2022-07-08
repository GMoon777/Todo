import { useState } from 'react'

const Todo = () => {

    // states
    const [tasksState, setTaskState] = useState([])
    const [taskTitleState, setTaskTitleState] = useState("")
    const [todoListName, setTodoListName] = useState("My Todo List")
    const [todoListNameHolder, setTodoListNameHolder] = useState("")
    const [todoListTasksAmount, setTodoListTasksAmount] = useState("")
    const [isFiltered, setIsFiltered] = useState(false)
    const [preFilteredList, setPreFilteredList] = useState([])

    // new task template prototype
    function Task(title) {
        this.title = title;
        this.completed = false;
        this.createdAt = Date.now()
        this.completedAt = null;
        this.isPriority = false;
        this.id = Math.round((Math.floor(Math.random() * 10000000000) + 1) / 1) * 1
    }

    const setTaskListLengthText = function (showNothing) {
        let list = []
        if (isFiltered === false) {
            list = tasksState
        }
        else {
            list = preFilteredList
        }
        if (showNothing === false) {
            if (list.length === 1) {
                setTodoListTasksAmount("(" + list.length + " " + "Item" + ")")
            }
            else if (list.length === 0) {
                setTodoListTasksAmount("")
            }
            else {
                setTodoListTasksAmount("(" + list.length + " " + "Items" + ")")
            }
        }
        else {
            setTodoListTasksAmount("")
        }
    }

    const sortTodoList = function (type, e) {
        e.preventDefault(e);
        let filteredList = tasksState
        if (type === "ABC") {
            filteredList.sort(((a, b) => a.title.localeCompare(b.title)))
            setTaskState([...filteredList])
        }
        else if (type === "Time") {
            filteredList.sort(((a, b) => a.createdAt > b.createdAt))
            setTaskState([...filteredList])
        }
    }

    const filterTodoList = function (title, e) {
        e.preventDefault(e);
        if (taskTitleState !== "") {
            if (todoListName === "Please enter a name for your item") {
                setTaskListLengthText(false)
                setTodoListName(todoListNameHolder)
            }
        }
        let filteredList = []
        tasksState.map(item => {

            if (isFiltered === false) {
                if (taskTitleState !== "") {
                    if (item.title === title) {
                        setPreFilteredList([...tasksState])
                        filteredList.push(item)
                        setTaskState([...filteredList])
                        setIsFiltered(true)
                    }
                }
            }
            else {
                setIsFiltered(false)
                setTaskState([...preFilteredList])
                setTaskTitleState("")
            }
        })

    }

    const changeTodoListName = function (name, e) {
        e.preventDefault(e);
        if (taskTitleState !== "") {
            setTodoListName(name)
            setTaskTitleState("")
        }
    }

    const addTask = function (e) {
        e.preventDefault(e);
        if (isFiltered !== true) {
            if (taskTitleState !== "") {
                let taskHolder = tasksState
                const newTask = new Task(taskTitleState)
                taskHolder.push(newTask)
                setTaskState([...taskHolder])
                setTaskTitleState("")
                setTaskListLengthText(false)
                if (todoListName === "Please enter a name for your item") {
                    setTodoListName(todoListNameHolder)
                }
            }
            else {
                if (todoListName !== "Please enter a name for your item") {
                    setTodoListNameHolder(todoListName)
                    setTodoListName("Please enter a name for your item")
                    setTaskListLengthText(true)
                }
            }
        }
    }
    const deleteTask = function (id) {
        let list = []
        if (isFiltered === false) {
            list = tasksState
        }
        else {
            list = preFilteredList
        }

        list.map(item => {
            if (item.id === id) {
                let check = list.indexOf(item)
                let taskHolder = list
                taskHolder.splice(check, 1,)
                setTaskState([...taskHolder])
                setTaskListLengthText(false)
                if (todoListName === "Please enter a name for your item") {
                    setTodoListName(todoListNameHolder)
                }
            }

        })
        if (isFiltered === true) {
            setIsFiltered(false)
            setTaskTitleState("")
        }
    }
    // select a data source to work on based on if you are viewing a filter source or not
    // not viewing filtered data so use main task list
    // viewing filtered task list (only a couple of selected tasks) and so use the saved list (before filtering)
    // accepts two arguments 1. the id of the task 2. a Boolean letting the function know if this action is to set the task as priority
    // check to see if the pass in id matches one of the task objects mapped 
    // check if this is a priority switch call 
    // create a temporary task object
    // check if the item has been completed before
    // check to see if the task is marked as priority
    // if it's not a priority task simply mark it as completed and timestamp the completion
    // if it's a priority task mark it as completed and remove the priority flag
    // if task has been completed before mark it as not completed 
    // find the index of the task
    // create a copy of the previous list of tasks
    // replace the existing task with the updated task
    // replace the task list in state with the updated task list
    // function called with a priorityCall
    // check to see if the task is already completed and if not...
    // change the priority status of the task
    // find the index of the task
    // create a copy of the previous list of tasks
    // replace the existing task with the updated task
    // replace the task list in state with the updated task list              
    // check if we are currently viewing a filtered list and toggle it off if so

    const updateCheckedState = function (id, priorityCall) {
        let list = []
        if (isFiltered === false) {
            list = tasksState
        }
        else {
            list = preFilteredList
        }
        list.map(item => {
            if (item.id === id) {
                if (priorityCall === false) {
                    let updatedTask = {}
                    if (item.completedAt === null) {
                        if (item.isPriority === false) {
                            updatedTask = { ...item, completedAt: Date.now(), completed: !item.completed };
                        }
                        else {
                            updatedTask = { ...item, completedAt: Date.now(), completed: !item.completed, isPriority: !item.isPriority };
                        }
                    }
                    else if (item.completedAt !== null) {
                        updatedTask = { ...item, completedAt: null, completed: !item.completed };
                    }
                    let check = list.indexOf(item)
                    let taskHolder = list
                    taskHolder.splice(check, 1, updatedTask)
                    setTaskState([...taskHolder])
                    if (isFiltered === true) {
                        setIsFiltered(false)
                        setTaskTitleState("")
                    }
                }
                else {
                    if (item.completed !== true) {
                        let updatedTask = { ...item, isPriority: !item.isPriority };
                        let check = list.indexOf(item)
                        let taskHolder = list
                        taskHolder.splice(check, 1, updatedTask)
                        setTaskState([...taskHolder])
                        if (isFiltered === true) {
                            setIsFiltered(false)
                            setTaskTitleState("")
                        }
                    }
                }
            }

        })

    }

    return (
        <div className="app">
            <h1>{todoListName} {todoListTasksAmount}</h1>

            <form>
                <input placeholder="name..." value={taskTitleState} onChange={(e) => setTaskTitleState(e.target.value)}>
                </input>
                <button onClick={(e) => addTask(e)}>Add Task</button>
                <button onClick={(e) => filterTodoList(taskTitleState, e)}>{isFiltered ? 'Show All' : 'Filter By Name'}</button>
                <button onClick={(e) => sortTodoList("ABC", e)}>Sort By Alphabetical</button>
                <button onClick={(e) => sortTodoList("Time", e)}>Sort By Time Created</button>
                <button onClick={(e) => changeTodoListName(taskTitleState, e)}>Change Todo List Name</button>
            </form>
            <ul>
                {tasksState.map(item => {
                    return (

                        <div
                            key={item.id}>
                            <div className="tasksText" style={{ color: item.isPriority ? 'gold' : 'white', textDecoration: item.completed ? "line-through" : "", }}> {item.title + " "}
                                <input type="checkbox" onChange={(e) => updateCheckedState(item.id, false)} checked={item.completed} />
                                <button onClick={() => deleteTask(item.id)}>Delete</button>
                                <button onClick={() => updateCheckedState(item.id, true)}>{item.isPriority ? 'Remove Priority' : 'Set as Priority'}</button>
                            </div>
                        </div>

                    )

                })}
            </ul>
        </div>

    )
}

export default Todo