import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
//import Dashboard from './DashBoard';
//import SurveyNew from './SurveyNew';
import Landing from './Pizza/Landing';
import Dashboard from './Survey/Dashboard';
import SurveyNew from './Survey/SurveyNew';
//const SurveyNew =()=><h2>SurveyNew</h2>

class App extends Component{
  //only one child can be in BrowserRouter
  //always visiable component

  //to see if the user login or not
  componentDidMount(){
    this.props.fetchUser();
  }
  render(){
    return (
      <div className="container">
        <BrowserRouter>
        <div>
          <Header/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/surveys" component={Dashboard}/>
          <Route path="/surveys/new" component={SurveyNew}/>
        </div>
        </BrowserRouter>
      </div>
    );
  };
}

export default connect(null,actions)(App);