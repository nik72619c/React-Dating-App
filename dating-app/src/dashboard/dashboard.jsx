import React from 'react';
import UserCard from '../components/card/UserCard';
import openSocket from 'socket.io-client';
import Axios from 'axios';
import Modal from 'react-awesome-modal';

export default class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
            visible : false,
            message: '',
            url: ''
        }
        this.loggedUser={};
        this.socket={};
    }


    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
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
            
            this.setState({
                message: data.message
            });
            this.openModal();
        });

        this.socket.on('sendSuperlike',(data)=>{
            console.log('sendSuperlike event called  on frontend..', data);
            this.setState({
                message: data.message,
                url: data.url
            });
            this.openModal();
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
                if(data.data.status==403){
                    console.log('unauth user, redirecting..');
                    this.props.history.push('/');
                    localStorage.clear();
                }
                    else{
                        data.data.content=data.data.content.filter(userObject=>userObject.email!=this.loggedUser.email);
                        console.log('modified data.data.content', data.data.content);
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
                <section className="mx-auto my-auto">
                    <div className="container mx-auto my-auto pl-4">
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="700" height="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 className="text-white">{this.state.message}</h1>
                       {this.state.url!==''?<img src={this.state.url} style={{width: '50%',height: '50%',borderRadius: '50%'}} className="mx-auto" alt=""/>: <span></span>}
                       <br/><br/>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
                </div>
            </section>
            </div>
        )
    }
}