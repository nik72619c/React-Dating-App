import React from 'react';
import './UserCard.css';
export default class UserCard extends React.Component{
    constructor(props){
        super(props);
        this.likeUser=this.likeUser.bind(this);
        this.superlikeUser=this.superlikeUser.bind(this);
        this.blockUser=this.blockUser.bind(this);
    }

    likeUser(){
    // console.log('socket recceived via props', this.props.socket.id);
    console.log('inside likeUser function..');
    this.props.socket.emit('like', {
      targetEmail: this.props.user.email,
      email: this.props.email
    })
    console.log('likeUser done');
    }
    blockUser(){
      //make axios request to block user with socket.io
      console.log('inside blockUser function..');
      this.props.socket.emit('block', {
        targetEmail: this.props.user.email,
        email: this.props.email
      })
      console.log('blockUser done');
      
    }
    superlikeUser(){
      //make axios request to superlike user with socket.io
      // console.log('socket recceived via props', this.props.socket.id);
    console.log('inside superlikeUser function..');
    this.props.socket.emit('superlike', {
      targetEmail: this.props.user.email,
      email: this.props.email
    })
    console.log('superlikeUser done');
    }
    //'https://commons.wikimedia.org/wiki/File:Default-welcomer.png'
    render(){
        return (
<div className="card mb-2" style={{width: '20rem'}}>
  <img className="card-img-top" src={this.props.src} alt="Card"/>
  <div className="card-body">
    <p className="card-text">{this.props.user.name}</p>
    <p>Gender: {this.props.user.gender}</p>
    <p>Email: {this.props.user.email}</p>
    <div className="row">
    <i className="fas fa-ban col-md-4" onClick={this.blockUser}></i>
    <i className="fas fa-thumbs-up col-md-4" onClick={this.likeUser}></i>
    <i className="fab fa-gratipay col-md-4" onClick={this.superlikeUser}></i>
    </div>
  </div>
</div>
    )
    }
}