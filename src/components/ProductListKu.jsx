import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { KONEKSI } from '../support/config';
import ProductItemKu from './ProductItemKu.jsx';

class ProductListKu extends Component {
    state = { listProduk : [], activePage: 1, itemPerPage: 2  };

    componentDidMount() {
        axios.get(`${KONEKSI}/product/getproduct`)
            .then((res) => {
                this.setState({listProduk: res.data});
            }).catch((err) => {
                console.log(err);
            })
    }
    
    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
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
            <div>
                <div className="row">
                    {this.renderListProduct()}
                </div>
                
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemPerPage}
                        totalItemsCount={this.state.listProduk.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>

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