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
  fetchAllTodos = ()=>{
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }
  postNewTodo = (task) =>{
    axios.post(URL,{name: task})
      .then(res => this.fetchAllTodos())
      .catch(err =>{
        this.setState({...this.state, error: err.response.data.message})
      })


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
         return <p key={task.id}>{task.name}</p>
        })
      }
      <Form addItem={this.postNewTodo}/>
      </>
    )
  }
}
