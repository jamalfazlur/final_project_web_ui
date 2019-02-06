import React, { Component } from 'react';
import axios from 'axios';
import { KONEKSI } from '../support/config';

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
            const {judul, harga, penulis} = item;
            return(
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100">
                        <a href="#" style={{textDecoration:"none"}}>
                            <img className="card-img-top" src="./images/flat/001-browser.png" width="140px" className="ml-auto" alt="" />
                            <div className="card-body" style={{minHeight: "130px", maxHeight:"150px",overflow:"hidden"}}>
                                
                                <h6 className="card-title"><a href="#" style={{textDecoration:"none"}}>{judul}</a></h6>
                                <p>{penulis}</p>                            
                            </div>
                            <div className="card-footer">
                                <p className="card-text">Rp. {harga.toLocaleString()}</p>
                                <small className="text-muted">★ ★ ★ ★ ☆</small>
                            </div>
                        </a>
                        
                        
                    </div>
                </div>  
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

export default ProductListKu;