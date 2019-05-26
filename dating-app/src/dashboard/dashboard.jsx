import React from 'react';

export default class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:1234/api/getUsers',{
                method:'GET',
                headers: {'Content-Type':'application/json'},
            }).then(response=>response.json()).then(data=>{
                this.setState({
                    users: data.content
                })
            });
    }
    render(){
        return (
            <div>
                welcome to the dashboard !
            </div>
        )
    }
}