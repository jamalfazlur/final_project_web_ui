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

    getListCart = () => {
        const { username } = this.props.user;
        axios.post(`${KONEKSI}/transaction/getlistcart`, 
            { username } 
        ).then((res) => {
            this.setState({ listProduk: res.data, selectedRow: 0 })
            console.log(username)
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    renderListJSX = () => {
        var srcgambar = `http://localhost:3000/images/book/`;
        var listJSX = this.state.listProduk.map(item => {
            if(item.isbn !== this.state.selectedRow){
                return (
                    <tr className="text-wrap" style={{fontSize:'12px'}}>                        
                        <td>{<img src={srcgambar+item.gambar} width="60px" alt={item.judul} /> }</td>
                        <td className="align-middle">{item.judul}</td>
                        <td className="align-middle">Rp. {item.harga.toLocaleString()}</td>
                        <td className="align-middle">{item.berat} gr</td>
                        <td className="align-middle">{item.jumlah_beli}</td>
                        <td className="align-middle"> Rp. {item.total_harga.toLocaleString()}</td>
                        <td className="align-middle"><button type="button" className="btn btn-warning" onClick={() => this.setState({selectedRow: item.isbn})}   ><i class="fas fa-edit"></i></button></td>
                        <td className="align-middle"><button type="button" className="btn btn-danger" onClick={() => this.onBtnDeleteClick(item.id)} ><i class="fas fa-trash-alt"></i></button></td>
                    </tr>
                )
            }
            return (
                <tr className="text-wrap"  style={{fontSize:'12px'}}>                    
                    <td>{<img src={srcgambar+item.gambar} width="60px" alt={item.judul} /> }</td>
                    <td className="align-middle">{item.judul}</td>
                    <td className="align-middle">Rp. {item.harga.toLocaleString()}</td>
                    <td className="align-middle">{item.berat} gr</td>
                    <td className="align-middle"><input className="form-control" type="number" defaultValue={item.jumlah_beli} ref="jumlahEdit"/></td>
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
            <div className="container">
                <div className="row">
                    <div className="card mt-2 shadow col-lg-8 pl-0 pr-0">
                        <div className="card-header">
                            <h4>Keranjang Belanjamu</h4>
                        </div>
                        <div className="card-body">
                            <table class="table table-hover">
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