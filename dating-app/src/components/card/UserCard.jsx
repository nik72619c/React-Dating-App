import React from 'react';
import './UserCard.css';
export default class UserCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            // <div style={{width: '400px', height: '400px'}}><img src="https://cdn.pixabay.com/photo/2014/04/14/20/11/japanese-cherry-trees-324175_1280.jpg" className="w-100 h-100" alt="something"/></div>

<div class="card" style={{width: '18rem'}}>
  <img class="card-img-top" src={this.props.src} alt="Card"/>
  <div class="card-body">
    <p class="card-text">Nikhil Sharma</p>
    <p>Gender: Male</p>
  </div>
</div>
    )
    }
}