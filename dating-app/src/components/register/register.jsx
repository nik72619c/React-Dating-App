import React from 'react';
import './register.css';
import UploadImage from '../uploadImage/uploadImage';

//made a controlled component to handle form inputs
export class Register extends React.Component{

    constructor(props){
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.getImageUrl=this.getImageUrl.bind(this);
        this.isFormFilled=true;
        this.state={
            url: ''
        };
    }
    componentDidMount(){
        this.state.url='';
    }

    getImageUrl(url){
        this.setState({
            url: url
        })
        console.log('got url', this.state.url);
    }

    goToLogin(){

        this.props.history.push('/');
    }

    registerUser(){

        // for(let key in this.state){

        //     if(!this.state[key]){
        //         alert('please fill out all the feilds correctly...');
        //         this.isFormFilled=false;
        //     }
        // }

        console.log('inside registerUser and state is',this.state);
        if(Object.keys(this.state).length === 0 && this.state.constructor === Object){
            alert('please fill all the credentials properly..');
        }
        else if(this.state.password !=this.state.confirm_password){
            alert('the passwords donot match..');
        }
        else if(Object.keys(this.state).length <=5){
            alert('please fill all the deatils..');
        }

        

            // for(let key in this.state){
            //     if(this.state[key]==""){
            //         alert(key+"not filled");
            //     }
            // }
        
    //     if(!this.state){
    //         console.log('inside if...');
    //         alert('please fill the form to register');
    //     }

    //     else{
    //         console.log('inside else...');
    //         console.log('pass',typeof this.state.password);
    //     if(!(this.state.password==this.state.confirm_password) && ( typeof this.state.password==undefined || typeof this.state.confirm_password==undefined)){

    //         alert('passwords donot match... please fill the feilds correctly...');
    //     }
    //     else{

    //     }

    // }

    //making http call directly without authenticating on frontend for now
    else{
    fetch('http://localhost:1234/api/register',{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({userObject: this.state})
            }).then(response=>response.json()).then(data=>{
                console.log('register data', data);
                if(data.status==404){
                    alert('some error occured while registering you..');
                }

                // else if(data.isExists==true){
                //     alert('this user already exists..please try with another email...');
                // }

                else{
                // this.props.history.push('/student/dashboard');
                alert('registered successfully...');
                }
            })

        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render(){
        return(
            <div className="container" id="wrap">
	  <div className="row">
        <div className="col-md-6 col-md-offset-3">
            <form className="form" >   
            <legend>Sign Up</legend>
                   
                    <div className="row">
                        <div className="col-md-12">
                            <input type="text" name="name" className="form-control input-lg" placeholder="Enter your name" onChange={this.handleInputChange} value={this.state.name} />                        
                        </div>
                    </div>

                    <input type="text" name="email" className="form-control input-lg" placeholder="Your Email" onChange={this.handleInputChange} value={this.state.email}/>
                    
                    <input type="password" name="password" className="form-control input-lg" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
                    
                    <input type="password" name="confirm_password" className="form-control input-lg" placeholder="Confirm Password" onChange={this.handleInputChange} value={this.state.confirm_password}/>
                     <label>Gender : </label>                    
                     <label className="radio-inline">
                        <input type="radio" name="gender" value="male" id="male" checked={this.state.gender=='male'} onChange={this.handleInputChange} />  Male
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="gender" value="female" id="female" onChange={this.handleInputChange} checked={this.state.gender=='female'}/> Female
                    </label>
                    <br />
              <span classNameName="help-block">By clicking Create my account, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.</span>

            </form>          
          </div>
</div>    
<UploadImage email={this.state.email} getImageUrl={this.getImageUrl}/>   

<button className="btn btn-lg btn-primary btn-block signup-btn" type="button" onClick={this.registerUser.bind(this)} disabled={this.state.url==''?true:false}>
                        Create my account</button>

                        <button className="btn btn-lg btn-primary btn-block signup-btn" type="button" onClick={this.goToLogin.bind(this)}>
                        Back to Login Page</button>
</div>

        )
    }
}