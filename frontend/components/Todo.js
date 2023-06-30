import React from 'react'

export default class Todo extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <p onClick={this.props.toggleCompleted(this.props.task.id)} >{this.props.task.name} {this.props.task.completed? ' ✅':''}</p>
    )
  }
}
