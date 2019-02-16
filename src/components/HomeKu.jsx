import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CarouselKu from './CarouselKu';
import ProductListKu from './ProductListKu';
import BannerKu from './BannerKu';

class HomeKu extends Component{
    
    render(){
        const { username, status } = this.props.user;
        if( username !== "" && status === "Unverified") {
            return <Redirect to="/verify" />
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="list-group mb-5">
                            <a href="#" className="list-group-item">Category 1</a>
                            <a href="#" className="list-group-item">Category 2</a>
                            <a href="#" className="list-group-item">Category 3</a>
                        </div>
                        <div className="card mt-3">
                            {/* <BannerKu /> */}
                        </div>
                        
                    </div>
                
                    <div className="col-lg-9">
                        <div className="my-4"><CarouselKu /></div>
                        <ProductListKu />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.auth
    };
}

export default connect(mapStateToProps)(HomeKu);