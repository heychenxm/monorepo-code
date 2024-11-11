import React, { Component } from 'react'

export default class LifeCycle extends Component {
  state = {
    number: 0
  }
  render() {
    return (
      <div>
        <h1>this is props:{this.props.count}</h1>
        <h1>this is state:{this.state.number}</h1>
      </div>
    )
  }
}
