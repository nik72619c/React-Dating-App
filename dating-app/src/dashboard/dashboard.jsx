import React from 'react';
import UserCard from '../components/card/UserCard';
import openSocket from 'socket.io-client';
import Axios from 'axios';
import Modal from 'react-awesome-modal';
import './dashboard.css';
import Navbar from '../components/navbar/navbar';

export default class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
            visible : false,
            message: '',
            url: '',
            loggedUser:{},
            blocked: []
        }
        this.loggedUser={blocked: []};
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
        this.setState({
            loggedUser: this.loggedUser
        })
        console.log('loggedUser', this.loggedUser);
        this.socket=openSocket('http://localhost:1234');
        console.log('socket id test', this.socket.id);
        this.socket.on('connection',()=>{
            console.log('socket id', this.socket.id);
            localStorage.setItem('socket', this.socket);
            this.socket.emit('login',{
                socketid: this.socket.id,
                email: this.state.loggedUser.email
        });
            
        });

        this.socket.on('sendLike',(data)=>{
            console.log('sendLike event called  on frontend..', data);
            
            this.setState({
                message: data.message,
                url: ''
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

        this.socket.on('sendBlock',(data)=>{
            console.log('sendBlock event called  on frontend..', data);
            this.loggedUser.blocked.push(data.blockedEmail);
            this.setState({
                message: data.message,
                loggedUser: this.loggedUser
            });

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
                        this.loggedUser=data.data.content.filter(user=>this.state.loggedUser.email===user.email)[0];
                        console.log('updated loggedUser details', this.loggedUser);
                        this.setState({
                            loggedUser: this.loggedUser
                        });

                        data.data.content=data.data.content.filter(userObject=>userObject.email!=this.loggedUser.email);
                        console.log('modified data.data.content', data.data.content);
                        data.data.content.forEach(user=>{
                                    
                        });
                        console.log('bloked array', this.state.blocked);
                        this.setState({
                            users: data.data.content,
                            blocked: this.state.blocked
                        });
                        console.log('users', this.state.users);
      
                    }
            });
    }
    render(){
        return (
            <div>
                <Navbar {...this.props}/>
               {
                   this.state.users.length!=0?(this.state.users.map((user,index)=>{
                       return <UserCard  key={index} user={user} socket={this.socket} email={this.loggedUser.email} loggedUser={this.state.loggedUser} src={this.state.loggedUser.blocked.indexOf(user.email)>=0?'https://cdn0.iconfinder.com/data/icons/users-2/512/e27-512.png' : user.profile_image_url}/>
                   })): <div>loading content....</div>
               }
                <section className="mx-auto my-auto" >
                <Modal visible={this.state.visible} width="800" height="auto" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 className="text-white">{this.state.message}</h1>
                       {this.state.url!==''?<img src={this.state.url}  style={{width: '20%',height: '20%',borderRadius: '50%'
                        }} className="image mx-auto" alt=""/>: <span></span>}
                       <br/><br/>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
            </div>
        )
    }
}