import React from 'react';
import ReactDOM from 'react-dom/client';
import LifeCycleContainer from './views/LifeCycleContainer';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>
        <LifeCycleContainer count={10}/>
    </>
)