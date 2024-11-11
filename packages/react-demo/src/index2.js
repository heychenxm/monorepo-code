import React from 'react';
import ReactDOM from 'react-dom/client';
import src1 from './assets/1.jpg'
import src2 from './assets/2.jpg'
import src3 from './assets/3.jpg'
import './index.css'

let index =  0;
const src = [src1, src2, src3]
const root = ReactDOM.createRoot(document.getElementById('root'))
const rootContainer = document.getElementById('root')

function render() {
    const image = (<img src={src[index]} alt="" className='imgItem'/>)
    root.render(image)
}
let timer = null
function start() {
    stop()
    timer = setInterval(()=>{
        index = (index+1)%3;
        console.log(index)
        render()
    },2000)
}

function stop(){
    clearInterval(timer)
}

render()
start()

rootContainer.onmouseenter = ()=>{
    console.log("enter")
    stop()
}

rootContainer.onmouseleave = () => {
    console.log('leave')
    start()
}

