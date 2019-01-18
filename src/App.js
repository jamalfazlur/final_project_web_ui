import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import { keepLogin, cookieChecked } from './actions'
import './App.css';
import HeaderKu from './components/HeaderKu';
import HomeKu from './components/HomeKu';
import LoginKu from './components/LoginKu';

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
      const username = cookies.get('myPengguna');
      if(username !== undefined){
          this.props.keepLogin(username);
      } else {
        this.props.cookieChecked();
      }
  }
  render() {
    if(this.props.cookie){ 
      return (
        <div className="App">
          <HeaderKu />
          <div className="container myBody border" style={{borderRadius: "5px"}}>
            <Route exact path="/" component={HomeKu} />
            <Route path="/login" component={LoginKu} />
          </div>

        </div>
      );
    }
    return (  <div className="my-auto">
                <div className="loader"></div>
              </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie }
}
export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked})(App));
