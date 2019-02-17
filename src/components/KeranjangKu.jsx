import React,  { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { KONEKSI } from '../support/config';

class KeranjangKu extends Component {
    
    state = { listProduk: [], selectedRow : 0 }
    componentDidMount(){
        this.getListCart()
    };

    ringkasanBelanja = () => {
       
        var totalBerat = 0;
        var totalBayar = 0;

        for(let i = 0; i < this.state.listProduk.length; i++){
            totalBerat += this.state.listProduk[i].total_berat;
            totalBayar += this.state.listProduk[i].total_harga;
        }
        return (
            <div>
                <table className="table table-hover text-left">
                    <tr >
                        <td>Total Item </td>
                        <td>{this.state.listProduk.length}</td>
                    </tr>
                    <tr>
                        <td>Total Berat</td>
                        <td>{totalBerat} gr</td>
                    </tr>
                    <tr>
                        <td>Total Bayar</td>
                        <td className="text-danger">Rp. {totalBayar.toLocaleString()}</td>
                    </tr>
                </table>
                <button className="btn btn-success col-lg-12">Checkout</button>
            </div>
        );
    }

    getListCart = () => {
        const { username } = this.props.user;
        axios.post(`${KONEKSI}/transaction/getlistcart`, 
            { username } 
        ).then((res) => {
            this.setState({ listProduk: res.data, selectedRow: 0 });
            console.log(this.state.listProduk)
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnSaveClick = (item) => {
        var new_jumlah_beli = parseInt(this.refs.jumlahEdit.value);
        var new_total_berat = parseInt(item.berat * new_jumlah_beli);
        var new_total_harga = parseInt(item.harga * new_jumlah_beli);

        //alert(`new qty: ${new_jumlah_beli}, new berat: ${new_total_berat}, new totharga: ${new_total_harga}`)
        axios.post(`${KONEKSI}/transaction/editlistcart`, {
            username: this.props.user.username,
            isbn: item.isbn,
            jumlah_beli : new_jumlah_beli, 
            total_berat : new_total_berat, 
            total_harga: new_total_harga 
        }).then((res) => {
            this.getListCart();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnDeleteClick = (item) => {
        
        if(window.confirm('Kamu Yakin?')){

            axios.post(`${KONEKSI}/transaction/deleteitemcart`, {
                username: this.props.user.username,
                isbn: item.isbn
            }).then((res) => {
                this.getListCart();
            }).catch((err) => {
                console.log(err)
            })

        }
    }

    renderListJSX = () => {
        var srcgambar = `http://localhost:3000/images/book/`;
        var listJSX = this.state.listProduk.map(item => {
            if(item.isbn !== this.state.selectedRow){
                return (
                    <tr className="text-wrap" style={{fontSize:'12px'}}>                        
                        <td>{<img src={srcgambar+item.gambar} width="60px" alt={item.judul} /> }</td>
                        <td className="align-middle">{item.judul}</td>
                        <td className="align-middle text-danger">Rp. {item.harga.toLocaleString()}</td>
                        <td className="align-middle">{item.berat} gr</td>
                        <td className="align-middle">{item.jumlah_beli}</td>
                        <td className="align-middle"> Rp. {item.total_harga.toLocaleString()}</td>
                        <td className="align-middle"><button type="button" className="btn btn-warning" onClick={() => this.setState({selectedRow: item.isbn})}   ><i class="fas fa-edit"></i></button></td>
                        <td className="align-middle"><button type="button" className="btn btn-danger" onClick={() => this.onBtnDeleteClick(item)} ><i class="fas fa-trash-alt"></i></button></td>
                    </tr>
                )
            }
            return (
                <tr className="text-wrap"  style={{fontSize:'12px'}}>                    
                    <td>{<img src={srcgambar+item.gambar} width="60px" alt={item.judul} /> }</td>
                    <td className="align-middle">{item.judul}</td>
                    <td className="align-middle text-danger">Rp. {item.harga.toLocaleString()}</td>
                    <td className="align-middle">{item.berat} gr</td>
                    <td className="align-middle"><input className="form-control col-lg-6 offset-lg-3" type="number" defaultValue={item.jumlah_beli} ref="jumlahEdit"/></td>
                    <td className="align-middle"> Rp. {item.total_harga.toLocaleString()}</td>
                    <td className="align-middle"><button type="button" className="btn btn-primary" onClick={() => this.onBtnSaveClick(item)} ><i class="far fa-save"></i></button></td>
                    <td className="align-middle"><button type="button" className="btn btn-default" onClick={() => this.setState({selectedRow: 0})} ><i class="fas fa-undo-alt"></i></button></td>
                </tr>
            )
        })

        return listJSX;
    }

    render() {
        if(this.props.user.username === "") {
            return <Redirect to="/" />
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="card mt-2 shadow col-lg-8 pl-0 pr-0">
                        <div className="card-header">
                            <h4>Keranjang Belanjamu</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Gambar</th>
                                        <th scope="col">Judul</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Berat</th>
                                        <th scope="col">Jumlah</th>
                                        <th scope="col">Total Harga</th>
                                        <th colSpan="2">Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListJSX()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card mt-2 shadow">
                            <div className="card-header">
                                <p>Ringkasan Belanja</p>
                            </div>
                            <div className="card-body">
                                {this.ringkasanBelanja()}
                            </div>
                        </div>
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

export default connect(mapStateToProps)(KeranjangKu);