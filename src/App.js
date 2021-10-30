import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // this is to generate unique keys for elements
  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }

  // this is my function that I rewrote, it's similar to the previus one
  function myGenerateKey(name){
    return `${name}_${new Date().getTime()}`;
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: myGenerateKey(name), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
