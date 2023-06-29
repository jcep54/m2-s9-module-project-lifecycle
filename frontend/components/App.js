import React from 'react'
import Form from './Form'
import axios from 'axios';
const URL = 'http://localhost:9000/api/todos'



export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleted: true,
    }
  }
  setAxiosError = err => {this.setState({...this.state, error: err.response.data.message})
}
  fetchAllTodos = ()=>{
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosError)
  }
  postNewTodo = (task) =>{
    axios.post(URL,{name: task})
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      })
      .catch(
        this.setAxiosError
      )
    }

    toggleCompleted = id => () =>{
      axios.patch(`${URL}/${id}`)
      .then(res => {
        console.log(res.data.data)
        this.setState({
          ...this.state, todos: this.state.todos.map(task => {
          if (task.id !== id)
            return task
          return res.data.data
        })})
      })
      .catch(this.setAxiosError)

    }
  
  componentDidMount() {
    this.fetchAllTodos()
  }
  toggleDisplayComleted = e =>{
    e.preventDefault();
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }

  clearHandler = e =>{
    e.preventDefault();
   const openTasks = this.state.todos.filter(task =>{
      return !task.completed
    })
    this.setState({...this.state, todos: openTasks})
  }
  render() {
    return (
      <>
      <div id='errors'>Error: {this.state.error || 'none'}</div>
      All My Todos:
      {
        this.state.todos.reduce( (acc, task) => {
         if(this.state.displayCompleted || !task.completed){
          return acc.concat(<p onClick={this.toggleCompleted(task.id)} key={task.id}>{task.name} {task.completed? ' ✅':''}</p>)
         }
         return acc
        }, [])
      }
      {/* return <p onClick={this.toggleCompleted(task.id)} key={task.id}>{task.name} {task.completed? ' ✅':''}</p> */}
      <Form addItem={this.postNewTodo}/>
      <button onClick={this.toggleDisplayComleted}>{this.state.displayCompleted? 'Hide': 'Show'} Clompeted</button>
      </>
    )
  }
}
