import React,{useState,useEffect} from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import TodoView from './Components/TodoListView';

function App() {
  //create todo variables using useState
  const [todoList,setTodoList] = useState([{}])
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')

  //read all todos using useEffect method which allow us to accept http requests
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo/')
    .then(res => {
      setTodoList(res.data)
    })
  });

  //Now add task if button is clicked
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo/',{'title':title,'description':desc})
    .then(res => console.log(res))
  }

  return (
      <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"400px","backgroundColor":"white","marginTop":"15px"}}>

        <h1 className = "card text-white bg-primary mb-1" styleName="maxWidth:20rem;">Task Manager</h1>

        <h6 className = "card text-white bg-primary mb-3"> FastAPI - React - MongoDB</h6>

        <div className="card-body">
          <h5 className="card text-white bg-dark mb-3">Add your task</h5>
          <span className="card-text">
            <input className="mb-2 form-control titleIn" onChange={event => setTitle(event.target.value)} placeholder='Title' />
            <input className="mb-2 form-control desIn" onChange = {event => setDesc(event.target.value)} placeholder='Description' />
            <button className="btn btn-outline-primary mx-2 mb-2" style={{'borderRadius':'50px',"font-weight":"bold"}} onClick={addTodoHandler}> Add Task</button>
          </span>

          <h5 className="card text-white bg-dark mb-3">Your tasks</h5>
          <div>
            {/* Todo items - External Components */}
            <TodoView todoList={todoList} />
          </div>
          <h6 className = "card text-dark bg-warning py-1 mb-0"> Copyright 2021, All rights reserved &copy;</h6>
        </div>

    </div>
  );
}

export default App;
