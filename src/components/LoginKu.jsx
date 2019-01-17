import React, { Component } from 'react';

class LoginKu extends Component {
    render(){
        return(
            <div className="container myBody ">
                <div className="row justify-content-sm-center margin-left-2">
                    
                    <form className="border" style={{padding:"20px", borderRadius:"5%", marginTop:"32px"}}>
                        <fieldset>
                            <legend>Welcome!</legend>
                            <hr />
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-sm-9 offset-sm-3">
                                    <button type="submit" className="btn btn-primary"><i className="fas fa-sign-in-alt" /> Login</button>
                                    <button type="submit" className="btn btn-danger offset-sm-1"><i className="fas fa-sign-in-alt" /> Register</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
        );
    }
}

export default LoginKu;