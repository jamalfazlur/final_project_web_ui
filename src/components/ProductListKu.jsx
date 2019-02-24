import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
//import Pagination from 'react-js-pagination';
import { KONEKSI } from '../support/config';
import ProductItemKu from './ProductItemKu.jsx';

class ProductListKu extends Component {
    state = { listProduk : [], activePage: 1, tampilPerPage: 8, totalItem: 0, totalPage: 0, startIndex: 0, finishIndex: 0, listPage: []   };

    componentDidMount() {
        axios.get(`${KONEKSI}/product/getproduct`
        ).then((res) => {
            this.setState({listProduk: res.data});
            this.setState({totalItem: this.state.listProduk.length});
            //console.log(this.state.totalItem);
            this.setState({totalPage: Math.ceil(this.state.totalItem / this.state.tampilPerPage)})
            //console.log(this.state.totalPage);            
        }).catch((err) => {
            console.log(err);
        })
    }

    renderPagination = () => {
        //this.setState({listPage: []})
        for (let i = 0; i < this.state.totalPage; i++) {
                //listPageNumb += <li className="page-item"><a className="page-link" href="#">{i+1}</a></li>
                this.state.listPage[i] = i+1;
        }
        console.log(this.state.listPage);
        var listPageJSX = this.state.listPage.map((item) => {
            return <li className="page-item" onClick={() => this.setState({activePage: item})}><a className="page-link" href="#">{item}</a></li>
        }) 
        //console.log(listPageNumb)
        return listPageJSX;
    }

    renderListProduct = () => {
        var { activePage, tampilPerPage } = this.state
        var listJSX = this.state.listProduk.slice( (activePage-1)*tampilPerPage, (activePage*tampilPerPage)).map((item) => {           
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
                
                <div className="row justify-content-md-center">
                    {/* pagination */}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li class="page-item">
                                <a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                            </li>
                            {this.renderPagination()}
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                            </li>
                        </ul>
                    </nav>
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