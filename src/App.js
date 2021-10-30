import React, {useState, useRef} from "react";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

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
  return (
    <>
      <TodoList todos={todos}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
