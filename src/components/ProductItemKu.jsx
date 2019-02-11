import React, { Component } from 'react';
import { connect } from 'react-redux'
import { select_produk } from '../actions'

class ProductItemKu extends Component {
    
    onItemClick = () => {
        this.props.select_produk(this.props.produk);
    }

    render(){
        const {judul, harga, penulis, gambar} = this.props.produk;
        var sumber = `./images/book/${gambar}`;

        return (
            <div className="col-lg-4 col-md-6 mb-4" onClick={this.onItemClick}>
                <div className="card h-100">
                    <a style={{textDecoration:"none"}}>
                        <div style={{height:"215px"}}>
                            <img className="card-img-top" src={sumber} width="140px" className="ml-auto" alt={judul} style={{marginTop: "10px"}} />
                        </div>
                        
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
    }
}

export default connect(null, { select_produk })(ProductItemKu);
