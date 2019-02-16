import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class VerifyWaitingKu extends Component {
    render() {
        if(this.props.user.username !== ""){
            return (
                <div className="alert alert-info" style={{margin: "25px"}}>
                    <img src="./images/flat/040-computer.png" width="80px"/>
                    <h3>Attention!</h3>
                    <p>Please Check Your Email to Verify This Account</p>
                    <p>If you don't receive, don't panic. Click button Below</p>
                    <input type="button" value="Resend Email" className="btn btn-success"/>
                </div>
            );
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.auth
    };
}

export default connect(mapStateToProps)(VerifyWaitingKu);
