import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_produk } from '../actions';
import { KONEKSI } from '../support/config';

class ProductItemKu extends Component {
    
    onItemClick = () => {
        this.props.select_produk(this.props.produk);
    }

    render(){
        const {judul, harga, penulis, gambar} = this.props.produk;
        var sumber = `${KONEKSI}/${gambar}`;

        return (
            <div className="col-lg-3 col-md-4 mb-4" onClick={this.onItemClick}>
                <div className="card h-80">
                    <a style={{textDecoration:"none"}}>
                        
                        <div className="card-body" style={{height:"150px", overflow:"hidden"}}>
                            <img className="img-fluid" src={sumber} width="80px" className="ml-auto" alt={judul} />                    
                        </div>
                        <div className="card-footer" style={{height:"130px", overflow:"hidden"}}>
                            <div className="text-wrap" style={{height:"40px", overflow:"hidden"}}>
                                <p className="card-title text-uppercase font-weight-bold" style={{fontSize:12}}>{judul}</p>
                            </div>                            
                            <p className="font-weight-lighter" style={{fontSize:12, margin:0}}>{penulis}</p> 
                            <p className="font-weight-lighter text-success" style={{fontSize:12, color:'#9e9e9e', margin:0}}>Rp. {harga.toLocaleString()}</p>
                            <small className="text-muted" style={{fontSize:12, margin:0}}>★ ★ ★ ★ ☆</small>
                        </div>
                    </a>
                    
                    
                </div>
            </div>
        );
    }
}

export default connect(null, { select_produk })(ProductItemKu);
