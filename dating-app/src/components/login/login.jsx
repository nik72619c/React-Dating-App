import React from 'react';
import './login.css';

export class Login extends React.Component{

    loginUser(){

        console.log('loginUser function called...');
        var userObject={
            email: this.refs.email.value,
            password: this.refs.password.value
        }

        console.log('userObject', userObject);
        if(userObject.email && userObject.password){
            fetch('http://localhost:1234/api/login',{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({userObject})
            }).then(response=>response.json()).then(data=>{
                console.log('data obtained is', data);
                if(data.status===404){

                    alert('invalid login credentials...');
                }

               else if(data.content){
              
                localStorage.setItem('token', data.token);
                this.props.history.push({
                    pathname: '/dashboard',
                    state: data.content
                });
                alert('logged in successfully...');
               }
              
            });
        }

        else{
            alert('please fill the required credentails...');
        }
    }

    registerUser(){
        console.log('registerUser Function called...');
        this.props.history.push('/register');
    }

    render(){
        return (

            <div id="LoginForm">
            <div className="container">
<h1 className="form-heading">The Online Dating App</h1>
<div className="login-form">
<div className="main-div">
    <div className="panel">
   <h2>Welcome to the Login Page !</h2>
   <p>Please enter your username and password</p>
   </div>
    <form id="Login">

        <div className="form-group">


            <input type="email" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>

        </div>

        <div className="form-group">

            <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password"/>

        </div>
        
        <button type="button" className="btn btn-primary" onClick={this.loginUser.bind(this)}>Login</button>
       


    </form>
    <p>New User? <button className="btn btn-success"onClick={this.registerUser.bind(this)}>register</button></p>
    </div>

</div></div>
</div>

        )
    }
}