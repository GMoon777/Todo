import { useState } from 'react'

const Todo = () => {

    // states
    const [tasks, setTasks] = useState([])
    const [userTextInputValue, setUserTextInputValue] = useState("")
    const [todoListName, setTodoListName] = useState("My Todo List")
    const [todoListNameHolder, setTodoListNameHolder] = useState("")
    const [isFiltered, setIsFiltered] = useState(false)
    const [preFilteredList, setPreFilteredList] = useState([])
    const [showTaskListItems, setShowTaskListItems] = useState(false)

    const setTaskListLengthText = function () {
        let list = []
        if (!isFiltered) {
            list = tasks
        }
        else {
            list = preFilteredList
        }
        if (showTaskListItems) {
            if (list.length === 1) {
                return(`(${list.length} Item)`)
            }
            else if (list.length === 0) {
                return(``)
            }
            else {
                return(`(${list.length} Items)`)
            }
        }
        else {
            return(``)
        }
    }

    const sortTodoList = function (type, e) {
        e.preventDefault(e);
        let filteredList = tasks
        if (type === "ABC") {
            filteredList.sort(((a, b) => a.title.localeCompare(b.title)))
            setTasks([...filteredList])
        }
        else if (type === "Time") {
            filteredList.sort(((a, b) => a.createdAt > b.createdAt))
            setTasks([...filteredList])
        }
    }

    const filterTodoList = function (title, e) {
        e.preventDefault(e);
        if (userTextInputValue !== "") {
            if (todoListName === "Please enter a name for your item") {
                setShowTaskListItems(false)
                setTodoListName(todoListNameHolder)
            }
        }
        let filteredList = []
        tasks.map(item => {

            if (isFiltered === false) {
                if (userTextInputValue !== "") {
                    if (item.title === title) {
                        setPreFilteredList([...tasks])
                        filteredList.push(item)
                        setTasks([...filteredList])
                        setIsFiltered(true)
                    }
                }
            }
            else {
                setIsFiltered(false)
                setTasks([...preFilteredList])
                setUserTextInputValue("")
            }
            return true
        }
        )

    }

    const changeTodoListName = function (name, e) {
        e.preventDefault(e);
        if (userTextInputValue !== "") {
            setTodoListName(name)
            setUserTextInputValue("")
        }
    }

    const addTask = function (e) {
        e.preventDefault(e);
        if (isFiltered !== true) {
            if (userTextInputValue !== "") {
                setTasks(currentState => {
                    let newTask = {
                        title: userTextInputValue,
                        completed: false,
                        createdAt: Date.now(),
                        completedAt: null,
                        isPriority: false,
                        id: Math.round((Math.floor(Math.random() * 10000000000) + 1) / 1) * 1
                    }
                    return [...currentState, newTask]
                })
                setUserTextInputValue("")
                setShowTaskListItems(true)
                if (todoListName === "Please enter a name for your item") {
                    setTodoListName(todoListNameHolder)
                }
            }
            else {
                if (todoListName !== "Please enter a name for your item") {
                    setTodoListNameHolder(todoListName)
                    setTodoListName("Please enter a name for your item")
                    setShowTaskListItems(false)
                }
            }
        }
    }
    const deleteTask = function (id) {
        let list = []
        if (isFiltered === false) {
            list = tasks
        }
        else {
            list = preFilteredList
        }

        list.map(item => {
            if (item.id === id) {
                let check = list.indexOf(item)
                let taskHolder = list
                taskHolder.splice(check, 1,)
                setTasks([...taskHolder])
                setShowTaskListItems(true)
                if (todoListName === "Please enter a name for your item") {
                    setTodoListName(todoListNameHolder)
                }
            }
            return true
        })
        if (isFiltered === true) {
            setIsFiltered(false)
            setUserTextInputValue("")
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
            list = tasks
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
                    setTasks([...taskHolder])
                    if (isFiltered === true) {
                        setIsFiltered(false)
                        setUserTextInputValue("")
                    }
                }
                else {
                    if (item.completed !== true) {
                        let updatedTask = { ...item, isPriority: !item.isPriority };
                        let check = list.indexOf(item)
                        let taskHolder = list
                        taskHolder.splice(check, 1, updatedTask)
                        setTasks([...taskHolder])
                        if (isFiltered === true) {
                            setIsFiltered(false)
                            setUserTextInputValue("")
                        }
                    }
                }
            }
            return true
        }
        )

    }

    return (
        <div className="app">
            <h1>{todoListName} {setTaskListLengthText()}</h1>

            <form>
                <input placeholder="name..." value={userTextInputValue} onChange={(e) => setUserTextInputValue(e.target.value)}>
                </input>
                <button onClick={(e) => addTask(e)}>Add Task</button>
                <button onClick={(e) => filterTodoList(userTextInputValue, e)}>{isFiltered ? 'Show All' : 'Filter By Name'}</button>
                <button onClick={(e) => sortTodoList("ABC", e)}>Sort By Alphabetical</button>
                <button onClick={(e) => sortTodoList("Time", e)}>Sort By Time Created</button>
                <button onClick={(e) => changeTodoListName(userTextInputValue, e)}>Change Todo List Name</button>
            </form>
            <ul>
                {tasks.map(item => {
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