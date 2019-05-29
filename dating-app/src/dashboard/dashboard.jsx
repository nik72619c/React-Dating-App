import React from 'react';
import UserCard from '../components/card/UserCard';
import openSocket from 'socket.io-client';
import Axios from 'axios';

export default class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
        }
        this.loggedUser={};
        this.socket={};
    }

    componentDidMount(){
        this.loggedUser=this.props.location.state[0];
        this.socket=openSocket('http://localhost:1234');
        this.socket.on('connection',()=>{
            console.log('socket id', this.socket.id);
            localStorage.setItem('socket', this.socket);
            this.socket.emit('login',{
                socketid: this.socket.id,
                email: this.loggedUser.email
        });
            
        });

        this.socket.on('sendLike',(data)=>{
            console.log('sendLike event called  on frontend..', data);
            alert('you have been liked by user');
        });


    Axios('http://localhost:1234/api/getUsers',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            withCredentials: true
            }).then(data=>{
                console.log('data', data.data);
                if(data.status==403){
                    console.log('unauth user, redirecting..');
                    this.props.history.push('/');
                    localStorage.clear();
                }
                    else{
                        this.setState({
                            users: data.data.content
                        });
                        console.log('users', this.state.users);
      
                    }
            });
    }
    render(){
        return (
            <div>
               {
                   this.state.users.length!=0?(this.state.users.map((user,index)=>{
                       return <UserCard  key={index} user={user} socket={this.socket} email={this.loggedUser.email}/>
                   })): <div>loading content....</div>
               }
            </div>
        )
    }
}