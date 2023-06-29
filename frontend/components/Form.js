import React from 'react'

export default class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      input: ''
    }
  }

  inputHandler = e =>{
    e.preventDefault()
    const {value} = e.target;
    this.setState({input: value})
  }

  addItemHandler = e =>{
    e.preventDefault();
    this.props.addItem(this.state.input)
    this.setState({input:''})
  }

  render() {
    return (
      <>  
      <form onSubmit={this.addItemHandler}>
        <label>
          Enter new task
          <input type='text' name='task' value={this.state.input} onChange={this.inputHandler}/>
          </label>
        <button>Add</button>
      </form>
      </>
    )
  }
}
