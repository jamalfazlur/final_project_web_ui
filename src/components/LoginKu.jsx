import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Alert } from 'reactstrap';
import { onUserLogin } from '../actions';

const cookies = new Cookies();

class LoginKu extends Component {
    
    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('myPengguna', newProps.username, {path: '/'})
        }
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        
        this.props.onUserLogin({username, password});
        console.log(username, password);
    }

    renderError = () => {
        if(this.props.error.length > 0){
            return <Alert color="danger">{this.props.error}</Alert>
        }
    }

    renderButton = () => {
        if(this.props.loading){
            return <center><div className="loader"></div></center>
        }
        return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
    }

    render(){
        if(this.props.username === ""){ 
            return(
            <div className="container myBody ">
                <div className="row justify-content-sm-center ml-auto mr-auto">
                    
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                        <fieldset>
                            <legend>Welcome!</legend>
                            <hr />
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail3" placeholder="Username" required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword3" placeholder="Password" required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12">
                                    {this.renderButton()}
                                </div>
                                    
                            </div>
                            {this.renderError()}
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
            );
        }
        return <Redirect to="/" />
    }
}
const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        error: state.auth.error, 
        loading: state.auth.loading 
    };
}

export default connect(mapStateToProps, {onUserLogin})(LoginKu);