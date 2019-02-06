import React, { Component } from 'react';
import CarouselKu from './CarouselKu';
import ProductListKu from './ProductListKu';

class HomeKu extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="list-group">
                            <a href="#" className="list-group-item">Category 1</a>
                            <a href="#" className="list-group-item">Category 2</a>
                            <a href="#" className="list-group-item">Category 3</a>
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

export default HomeKu;