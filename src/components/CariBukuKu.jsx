import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { KONEKSI } from '../support/config';
import ProductItemKu from './ProductItemKu';

class CariBukuKu extends Component {
    state = {listProduk: []}

    componentDidMount() {
        // var params = queryString.parse(this.props.location.search)
        // console.log(params.keywords)
        this.getListBuku();
    }

    getListBuku = () => {
        var params = queryString.parse(this.props.location.search);

        axios.post(`${KONEKSI}/product/searchproduct`, 
            { keyword: params.keywords }
        ).then((res) => {
            this.setState({listProduk: res.data});         
        }).catch((err) => {
            console.log(err);
        })
    }

    renderListProduct = () => {
        var listJSX = this.state.listProduk.map(item => {
            if(this.props.produk.isbn !== 0){
                return <Redirect to={`/productdetail/${this.props.produk.isbn}`} />
            }
            return <ProductItemKu produk={item} />
        })
        return listJSX;
    }

    

    render() {
        return(
            <div className="container">
                <div className="alert alert-warning">
                    <h5>Kami menemukan sesuatu untuk anda:</h5>
                </div>
                
                <div className="row">
                        {this.renderListProduct()}                    
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        produk: state.selectedProduk
    };
}

export default connect(mapStateToProps)(CariBukuKu);