import React from 'react'
export default class MyClassComp extends React.Component{
    render(){
        console.log(this.props)
        if(this.props.ui){
            return (
                <div>
                    <h1>hello world</h1>
                    {this.props.ui}
                </div>
            )
        }
        return <h1>This is class component</h1>
    }
}