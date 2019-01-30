import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import { keepLogin, cookieChecked, onUserLogin } from './actions'
import './App.css';
import HeaderKu from './components/HeaderKu';
import HomeKu from './components/HomeKu';
import LoginKu from './components/LoginKu';

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
      const username = cookies.get('myPengguna');
      const password = cookies.get('myKey');
      console.log(username,password);
      if(username !== undefined){
          //this.props.keepLogin({username, password});
          this.props.onUserLogin({username, password});
      } else {
        this.props.cookieChecked();
      }
  }
  render() {
    if(this.props.cookie){ 
      return (
        <div className="App">
          <HeaderKu />
          <div className="container myBody border bg-light" style={{borderRadius: "5px"}}>
            <Route exact path="/" component={HomeKu} />
            <Route path="/login" component={LoginKu} />
          </div>

        </div>
      );
    }
    return (  
      <div className="App">
        <HeaderKu />
        <div className="row" style={{borderRadius: "5px"}}>
          <div className="ml-auto mr-auto loader"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie,
          password: state.auth.password }
}
export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked, onUserLogin})(App));
