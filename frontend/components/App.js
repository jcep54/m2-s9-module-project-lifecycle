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
  render() {
    return (
      <>
      <div id='errors'>Error: {this.state.error || 'none'}</div>
      All My Todos:
      {
        this.state.todos.map(task => {
         return <p onClick={this.toggleCompleted(task.id)} key={task.id}>{task.name} {task.completed? ' ✅':''}</p>
        })
      }
      <Form addItem={this.postNewTodo}/>
      
      </>
    )
  }
}
