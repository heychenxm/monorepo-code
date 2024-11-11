import React from 'react';
import ReactDOM from 'react-dom/client';
import MyFuncComp from './MyFuncComp';
import MyClassComp from './MyClassComp';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
    {MyFuncComp()}
    <MyFuncComp />
    <MyClassComp number={1} ui={<i>这是传入的UI</i>}/>
    </>
)