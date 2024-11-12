import React, { Component } from 'react'

export default class LifeCycle extends Component {
  constructor(props){
    console.log('%c 🍚 constructor: ', 'font-size:12px;background-color: #3F7CFF;color:#fff;');
    super(props)
    this.state = {
      number: props.count
    }
    
  }

  addState=()=>{
    console.log('%c 🍕 addState: ', 'font-size:12px;background-color: #42b983;color:#fff;', this.state.number);
    this.setState({
      number: this.state.number+=1
    })
  }

  render() {
    console.log('%c 🍆 render: ', 'font-size:12px;background-color: #42b983;color:#fff;');
    return (
      <div>
        <h1>this is props:{this.props.count}</h1>
        <h1>this is state:{this.state.number}</h1>
        <button onClick={this.addState}>number++</button>
      </div>
    )
  }
}
