import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: filterType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to bye', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: true},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'book', isDone: false},
        ]
    })

    const removeTodolist = (todoId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    const removeTask = (toDoId: string, id: string) => {
        const filteredTasks = tasks[toDoId].filter(el => el.id !== id)
        setTasks({...tasks, [toDoId]: filteredTasks})
    }

    const changeTaskStatus = (toDoId: string, id: string, isDone: boolean) => {
        let task = tasks[toDoId].find(t => (t.id === id))
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const addTask = (toDoId: string, task: string) => {
        const newTask = {id: v1(), title: task, isDone: false}
        setTasks({...tasks, [toDoId]: [newTask, ...tasks[toDoId]]});
    }

    const changeFilter = (value: filterType, toDoId: string) => {
        setTodolists(todolists.map(el => (el.id === toDoId ? {...el, filter: value} : el)))
    }

    return (
        <div className="App">
            {todolists.map((tl) => {

                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
