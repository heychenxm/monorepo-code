import React from 'react'
import Student from './Student'

export default function StudentList(props) {
    const list = props.stu.map((item)=>(<Student {...item} key={item.age}/>))
  return (
    <ul>
      {list}
    </ul>
  )
}
