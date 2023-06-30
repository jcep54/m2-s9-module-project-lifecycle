import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
    <div>
      
    {this.props.todos.reduce( (acc, task) => {
      if(this.props.displayCompleted || !task.completed){
       return acc.concat(<Todo task={task} key={task.id} toggleCompleted={this.props.toggleCompleted}  />)
      }
      return acc
     }, [])}
     </div>
    )
  }
}
