import React from 'react';
import UserCard from '../components/card/UserCard';
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
                });
                console.log('users', this.state.users);
            });
    }
    render(){
        return (
            <div>
               {
                   this.state.users.map(user=>{
                       return <UserCard user={user}/>
                   })
               }
            </div>
        )
    }
}