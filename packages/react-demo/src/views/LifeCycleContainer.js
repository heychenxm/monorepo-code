import React, { Component } from 'react'
import LifeCycle from './LifeCycle'

export default class LifeCycleContainer extends Component {
  render() {
    return (
        <div>
            <LifeCycle count={this.props.count}/>
        </div>
    )
  }
}


