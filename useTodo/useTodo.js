import { useEffect, useReducer } from "react"
import { todoReducer } from "../todoReducer"

export const useTodo = () => {
    const initialState = [
        //     {
        //     id: new Date().getTime(),
        //     description: 'Recolectar la gema del alma',
        //     done: false
        // },
        // {
        //     id: new Date().getTime()*3,
        //     description: 'Recolectar la gema de la mente',
        //     done: false
        // }
    ]
        const init = () =>{
            return JSON.parse(localStorage.getItem('todos')) || [];
        }
    
        const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init)
    
        useEffect(() => {
          localStorage.setItem('todos', JSON.stringify(todos) )
        }, [todos])
        
    
        const handleNewTodo = (todo) => {
            const action = {
                type: '[TODO] Add Todo',
                payload: todo
            }
    
            dispatchTodo( action )
        }
    
        const handleDeleteTodo = (id) => {
            dispatchTodo({
                type: '[TODO] Remove Todo',
                payload: id
            })
        }
    
        const handleToggleTodo = (id) => {
            dispatchTodo({
                type: '[TODO] Toggle Todo',
                payload: id
            })
        }
    return{
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=>!todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}