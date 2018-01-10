import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Navigation/Logo';

class Header extends Component{
  renderContent(){
    switch(this.props.auth){
      case null:
        return ;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>;
      default:
      //it is an array
        return [
          /*<li key="1"><Payment/></li>,
          <li key="3">
            Credits:{this.props.auth.credits}
          </li>,*/
          <li key="2"><a href="/api/logout">Log out</a></li>
        ];
    }
  }
  //Link can check if the user login or not
  render(){
    return(
      <div>
        <nav style={{backgroundColor:'#000000'}}>
          <div className="nav-wrapper">
              
            <Link 
              to={this.props.auth ? '/surveys':'/'}
              className="left brand-logo"
            >
              <Logo/>
            </Link>
            
              <ul className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
      </div>
    );
  }
}

//{} is an object
function mapStateToProps({auth}){
  return {auth}
}
export default connect(mapStateToProps)(Header);