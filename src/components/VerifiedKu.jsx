import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { onUserVerified } from '../actions';
import { KONEKSI } from '../support/config';

class VerifiedKu extends Component {
    state = { verified: false, loading: true }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var username = params.username;
        var password = params.password;

        axios.post(`${KONEKSI}/auth/verified`, {
            username,
            password
        }).then((res) => {
            this.props.onUserVerified(res.data);
            console.log(res.data);
            this.setState({loading: false, verified: true})
        }).catch((err) => {
            console.log(err)
        })
    }

    renderContent = () =>{
        if(this.state.verified && !this.state.loading){
            return(
                <div className="">
                    <img src="./images/flat/006-shopping.png" width="80px"/>
                    <h2>Congrats</h2> 
                    <p className="btn btn-success">You're Verified!</p>
                </div>
            )
        } else if(!this.state.verified && !this.loading) {
            return(
                <div className="">
                    <h2>Sorry, It Sucks</h2>
                    <center><div className="loader"></div></center> 
                    <p>Try to reload this page</p>
                </div>
            );
        } return (
            <div className="alert alert-warning">
                <h2>Please Wait . .</h2>
            </div>
        );
    }

    render() {
        return(
            <div className="alert alert-info" style={{margin: "25px"}}>
                {this.renderContent()}
            </div>
        );
    }
}

export default connect(null, {onUserVerified})(VerifiedKu);