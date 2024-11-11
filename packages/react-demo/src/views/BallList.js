import React, { Component } from 'react'
import Ball from './Ball'
import { getRandom } from '../util/util'

// const ballObj = {
//   xSpeed: 200,
//   ySpeed: 200,
//   top: 100,
//   left: 100,
//   bg: 'skyblue'
// }
export default class BallList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
    const timer = setInterval(()=>{
      const ballInfos = {
        xSpeed: getRandom(100, 500),
        ySpeed: getRandom(100, 500),
        top: getRandom(50, document.documentElement.clientHeight-200),
        left: getRandom(50, document.documentElement.clientWidth-200),
        bg: `rgb(${getRandom(1, 255)},${getRandom(1, 255)},${getRandom(1, 255)})`
      }  
      this.setState({
        list: [...this.state.list, ballInfos]
      })
      if(this.state.list.length > 10){
        clearInterval(timer)
      }
    }, 500)
  }
  render() {
    const ballItems = this.state.list.map((item, index)=>(<Ball key={index} {...item}/>))
    return (
      <div>
        {ballItems}
      </div>
    )
  }
}
