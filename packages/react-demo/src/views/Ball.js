import React, { Component } from 'react'
import './Ball.css'

export default class Ball extends Component { 
  constructor(props){
    super(props)
    // xSpeed, ySpeed, top, left
    this.state = {
      xSpeed: props.xSpeed,
      ySpeed: props.ySpeed,
      top: props.top || 0,
      left: props.left | 0,
    }
    const duration = 16;
    setInterval(()=>{
      let xDis = this.state.xSpeed * duration / 1000
      let yDis = this.state.ySpeed * duration / 1000
      let newLeft = this.state.left + xDis
      let newTop = this.state.top + yDis
      if(newLeft <= 0){
        newLeft = 0
        this.setState({
          xSpeed: -this.state.xSpeed
        })
      }else if(newLeft >= document.documentElement.clientWidth-200){
        newLeft = document.documentElement.clientWidth-200
        this.setState({
          xSpeed: -this.state.xSpeed
        })
      }
      if(newTop <= 0){
        newTop = 0
        this.setState({
          ySpeed: -this.state.ySpeed
        })
      }else if(newTop >= document.documentElement.clientHeight-200){
        newTop = document.documentElement.clientHeight-200
        this.setState({
          ySpeed: -this.state.ySpeed
        })
      }
      this.setState({
        top: newTop,
        left: newLeft
      })
    }, duration)
  }
  render() {
    return (
      <div className='ball' style={{
        background: this.props.bg || '#f40',
        top: this.state.top,
        left: this.state.left
      }}>
      </div>
    )
  }
}
