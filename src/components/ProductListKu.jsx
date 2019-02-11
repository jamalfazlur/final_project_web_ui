import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { KONEKSI } from '../support/config';
import ProductItemKu from './ProductItemKu.jsx';

class ProductListKu extends Component {
    state = { listProduk : [] };

    componentDidMount() {
        axios.get(`${KONEKSI}/product/getproduct`)
            .then((res) => {
                this.setState({listProduk: res.data});
            }).catch((err) => {
                console.log(err);
            })
    }

    renderListProduct = () => {
        var listJSX = this.state.listProduk.map((item) => {           
            if(this.props.produk.isbn !== 0){
                return <Redirect to={`/productdetail/${this.props.produk.isbn}`} />
            }
            return(
                 <ProductItemKu produk={item}/> 
            );
        })
        return listJSX;
    }
    render() {
        return(
            <div className="row">
                {this.renderListProduct()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        produk: state.selectedProduk
    };
}

export default connect(mapStateToProps)(ProductListKu);