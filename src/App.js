import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { keepLogin, cookieChecked, onUserLogin, loadOfCart } from './actions'
import './App.css';
import HeaderKu from './components/HeaderKu';
import HomeKu from './components/HomeKu';
import LoginKu from './components/LoginKu';
import RegisterKu from './components/RegisterKu';
import VerifiyWaitingKu from './components/VerifyWaitingKu';
import VerifiedKu from './components/VerifiedKu';
import ProductDetailKu from './components/ProductDetailKu';
import KeranjangKu from './components/KeranjangKu';
import { KONEKSI } from './support/config';

const cookies = new Cookies();

class App extends Component {
  //state = { listProduk: [] }
  
  componentDidMount() {
      const username = cookies.get('myPengguna');
      console.log(username);
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
          
          <div className="container-fluid myBody border bg-light" >
          {/* style={{borderRadius: "5px"}} */}
            <Route exact path="/" component={HomeKu} />
            <Route path="/login" component={LoginKu} />
            <Route path="/register" component={RegisterKu} />
            <Route path="/verify" component={VerifiyWaitingKu} />
            <Route path="/verified" component={VerifiedKu} />
            <Route path="/productdetail/:isbn" component={ProductDetailKu} />
            <Route path="/cart" component={KeranjangKu} />
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
  return {  cookie: state.auth.cookie,
            user: state.auth,
            cart: state.loadOfCart }
}
export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked, onUserLogin, loadOfCart})(App));
