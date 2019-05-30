import React from 'react';
export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.logout= this.logout.bind(this);
    }

    logout(){
        localStorage.clear();
        this.props.history.push('/');
    }
    render(){
        return(
            <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Dashboard</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i class="fa fa-home"></i>
              Home
              <span class="sr-only">(current)</span>
              </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-envelope-o">
                <span class="badge badge-danger">11</span>
              </i>
              Link
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-envelope-o">
                <span class="badge badge-primary">11</span>
              </i>
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-bell">
                <span class="badge badge-info">11</span>
              </i>
              Test
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fa fa-globe">
                <span class="badge badge-success">11</span>
              </i>
              Test
            </a>
          </li>
        </ul>
    
          <input class="form-control mr-sm-2 w-25" type="text" placeholder="search" aria-label="search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.logout}>LOGOUT</button>
    
      </div>
    </nav>
    
        )
    }
}

