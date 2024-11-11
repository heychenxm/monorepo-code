import React, { Component } from 'react'

export default class Comp extends Component {
    state = {
        count: 0
    }
    add = () => {
        this.setState({
            count: this.state.count+1
        })
        console.log(this.state.count)
    }

    multipleAdd = () => {
        this.setState((prev)=>{
            console.log("prev--->", prev)
            return {count: prev.count + 1}
        })
        this.setState((prev)=>{
            return {count: prev.count + 1}
        })
        this.setState((prev)=>{
            return {count: prev.count + 1}
        },() => {
            console.log(this.state.count)
        })
    }
  render() {
    console.log("render", this.state.count)
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.add}>+</button>
        <button onClick={this.multipleAdd}>++</button>
      </div>
    )
  }
}
