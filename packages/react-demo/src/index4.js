import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentList from './views/StudentList';

const stu = [
    {name: '陈小名', age: 10},
    {name: '陈1名', age: 11},
    {name: '陈2名', age: 12},
    {name: '陈3名', age: 13},
    {name: '陈4名', age: 14},
]
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
    <StudentList stu={stu}/>
    </>
)