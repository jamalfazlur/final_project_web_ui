import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { KONEKSI } from '../support/config';
import { select_produk } from '../actions'

class ProductDetailKu extends Component {
    componentDidMount(){
        var isbn = this.props.match.params.isbn;
        //console.log(isbn)

        axios.get(`${KONEKSI}/product/getproductdetail/${isbn}`)
        .then((res) => {
            //console.log(res);
            this.props.select_produk(res.data[0])
        }).catch((err) => {
            // console.log(err)
        })
    }

    render() {
        const { isbn, judul, penulis, harga, jumlah_halaman, berat, deskripsi, gambar, penerbit } = this.props.produk;
        const sumber = `http://localhost:3000/images/book/${gambar}`;

        return(
            <div>
                <div className="row bg-light" style={{margin:"10px"}}>
                    <div className="col-md-3 offset-md-1" style={{display: "block"}}>
                        <img className="card-img-top" src={sumber} width="340px" className="ml-auto" alt={judul} style={{marginTop: "10px"}} />
                    </div>
                    <div className="col-md-4">
                        <div className="alert" style={{textAlign:"left"}}>
                            
                            <h3>{judul}</h3>
                            <h5>Rp. {harga.toLocaleString()}</h5>
                            <div class="dropdown-divider"></div>

                            <div className="row">
                                <div className="col-md-5">Judul:</div>
                                <div className="col-md-7"><p>{judul}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">No.ISBN:</div>
                                <div className="col-md-7"><p>{isbn}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Penulis:</div>
                                <div className="col-md-7"><p>{penulis}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Penerbit:</div>
                                <div className="col-md-7"><p>{penerbit}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Jumlah Halaman:</div>
                                <div className="col-md-7"><p>{jumlah_halaman}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Berat:</div>
                                <div className="col-md-7"><p>{berat} gr</p></div>
                            </div>
                            
                            <button className="btn btn-success col-md-11 disabled"><i class="fas fa-shopping-cart"></i> Beli</button>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="alert" style={{marginTop:"0.5rem"}}></div>
                    </div>
                </div>
                {/* END ROW #1 */}

                <div className="row" style={{margin: "25px"}}>
                    <div className="col-md-10 offset-md-1 card" style={{padding:0, textAlign:"left"}}>
                    
                        <h4 className="card-header">DESKRIPSI</h4>
                        
                        <div className="card-body">
                            <p>{deskripsi}</p>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { select_produk })(ProductDetailKu);