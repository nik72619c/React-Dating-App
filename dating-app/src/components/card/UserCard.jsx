import React from 'react';
import './UserCard.css';
export default class UserCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            // <div style={{width: '400px', height: '400px'}}><img src="https://cdn.pixabay.com/photo/2014/04/14/20/11/japanese-cherry-trees-324175_1280.jpg" className="w-100 h-100" alt="something"/></div>

<div class="card mb-2" style={{width: '18rem'}}>
  <img class="card-img-top" src={this.props.user.profile_image_url ||  'https://commons.wikimedia.org/wiki/File:Default-welcomer.png'} alt="Card"/>
  <div class="card-body">
    <p class="card-text">{this.props.user.name}</p>
    <p>Gender: {this.props.user.gender}</p>
    <div className="row">
    <i className="fas fa-ban col-md-4"></i>
    <i className="fas fa-thumbs-up col-md-4"></i>
    <i className="fab fa-gratipay col-md-4"></i>
    </div>
  </div>
</div>
    )
    }
}