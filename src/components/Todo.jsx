import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {

    // states
    const [tasks, setTasks] = useState([])
    const [userTextInputValue, setUserTextInputValue] = useState("")
    const [todoListName, setTodoListName] = useState("My Todo List")
    const [todoListNameHolder, setTodoListNameHolder] = useState("")
    const [isFiltered, setIsFiltered] = useState(false)
    const [showTaskListItems, setShowTaskListItems] = useState(false)
    const [sortBy, setSortBy] = useState("Time")


    const setTaskListLengthText = function () {
        if (showTaskListItems) {
            // has to be specifically 1 so that the correct grammar is used.
            if (tasks.length === 1) {
                return (`(${tasks.length} Item)`)
            }
            else if (!tasks.length) {
                return (``)
            }
            else {
                return (`(${tasks.length} Items)`)
            }
        }
        else {
            return (``)
        }
    }

    const changeTodoListName = function (name, e) {
        e.preventDefault(e);
        if (userTextInputValue.length) {
            setTodoListName(name)
            setUserTextInputValue("")
        }
    }

    const addTask = function (e) {
        e.preventDefault(e);
        if (!isFiltered) {
            if (userTextInputValue.length) {
                setTasks(currentState => {
                    let newTask = {
                        title: userTextInputValue,
                        completed: false,
                        createdAt: Date.now(),
                        completedAt: null,
                        isPriority: false,
                        id: uuidv4()
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
        tasks.map(item => {
            if (item.id === id) {
                let check = tasks.indexOf(item)
                tasks.splice(check, 1)
                setTasks(currentState => {
                    return [...currentState]
                })
                setShowTaskListItems(true)
                if (todoListName === "Please enter a name for your item") {
                    setTodoListName(todoListNameHolder)
                }
            }
            return true
        })
        if (isFiltered) {
            setUserTextInputValue("")
        }
    }

    const updateCheckedState = function (id, priorityCall) {
        tasks.map(item => {
            if (item.id === id) {
                if (!priorityCall) {
                    let updatedTask = {}
                    if (item.completedAt === null) {
                        if (!item.isPriority) {
                            updatedTask = { ...item, completedAt: Date.now(), completed: !item.completed };
                        }
                        else {
                            updatedTask = { ...item, completedAt: Date.now(), completed: !item.completed, isPriority: !item.isPriority };
                        }
                    }
                    else if (item.completedAt !== null) {
                        updatedTask = { ...item, completedAt: null, completed: !item.completed };
                    }
                    let check = tasks.indexOf(item)
                    tasks.splice(check, 1)
                    setTasks(currentState => {
                        return [...currentState, updatedTask]
                    })
                }
                else {
                    if (!item.completed) {
                        let updatedTask = { ...item, isPriority: !item.isPriority };
                        let check = tasks.indexOf(item)
                        tasks.splice(check, 1)
                        setTasks(currentState => {
                            return [...currentState, updatedTask]
                        })
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
                {!isFiltered ? <button onClick={(e) => addTask(e)}>Add Task</button> : null}

                <button onClick={(e) => e.preventDefault(e) || setIsFiltered(!isFiltered)}>{isFiltered ? 'Show All' : 'Filter By Name'}</button>
                <button onClick={(e) => e.preventDefault(e) || setSortBy("ABC")}>Sort By Alphabetical</button>
                <button onClick={(e) => e.preventDefault(e) || setSortBy("Time")}>Sort By Time Created</button>
                <button onClick={(e) => changeTodoListName(userTextInputValue, e)}>Change Todo List Name</button>
            </form>
            <ul>
                {tasks
                    .sort((((a, b) => sortBy === "ABC" ? a.title.localeCompare(b.title) : a.createdAt > b.createdAt)))
                    .filter((item) => {
                        if (isFiltered) {
                            if (userTextInputValue.length) {
                                if (item.title === userTextInputValue) {
                                    if (todoListName === "Please enter the name of the task to filter") {
                                        setTodoListName(todoListNameHolder)
                                        setShowTaskListItems(true)
                                    }
                                    return true;
                                }

                            }
                            else {
                                if (todoListName !== "Please enter the name of the task to filter") {
                                    setTodoListNameHolder(todoListName)
                                    setTodoListName("Please enter the name of the task to filter")
                                    setShowTaskListItems(false)
                                }
                            }
                        }
                        else {
                            if (todoListName === "Please enter the name of the task to filter") {
                                setTodoListName(todoListNameHolder)
                                setShowTaskListItems(true)
                            }
                            return true
                        }
                        return false
                    })
                    .map(item => {
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

export default TodoList