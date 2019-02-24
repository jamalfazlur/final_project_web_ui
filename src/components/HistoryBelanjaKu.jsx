import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { KONEKSI } from '../support/config';

class HistoryBelanjaKu extends Component {
    state = { listHistory: [], detailTransaksi: [] }
    
    componentDidMount() {
        this.getTransaksi();
    }

    getTransaksi = () => {
        const { username } = this.props.user;
        axios.post(`${KONEKSI}/transaction/gethistorytrx`, 
            { username } 
        ).then((res) => {
            this.setState({ listHistory: res.data });
            console.log(this.state.listHistory)
        }).catch((err) => {
            console.log(err);
        })
    }

    getTransaksiDetail = (id) => {
        console.log(id);
        axios.post(`${KONEKSI}/transaction/gethistorydetail`,
        {id_transaksi: id}
        ).then((res) => {
            this.setState({ detailTransaksi: res.data });
            console.log(this.state.detailTransaksi)
        }).catch((err) => {
            console.log(err);
        })
    }

    renderListJSX = () => {
        var listJSX = this.state.listHistory.map(item => {
            return (
                <tr onClick={() => this.getTransaksiDetail(item.id_transaksi)}>
                    <td>{item.id_transaksi}</td>
                    <td>{moment(item.waktu).format('DD/MMM/YYYY HH:mm:ss')}</td>
                    <td className="text-danger">Rp. {item.total_bayar.toLocaleString()}</td>
                </tr>
            );
        });
        return listJSX;
    }

    renderDetailJSX = () => {
        if(this.state.detailTransaksi.length !== 0){
            var listJSX = this.state.detailTransaksi.map(item => {
                return (
                    <tr style={{fontSize:"12px"}}>
                        <td><img src={KONEKSI+item.gambar} width="40px" /></td>
                        <td>{item.isbn}</td>
                        <td>{item.judul}</td>
                        <td>Rp. {item.harga.toLocaleString()}</td>
                        <td>{item.jumlah_beli}</td>
                        <td>Rp. {item.total_harga.toLocaleString()}</td>
                    </tr>
                )
            })
            return listJSX;
        }
        return <tr><p className="text-danger">*Pilih Salah Satu Transaksi</p></tr>
    }

    render() {
        if(this.props.user.username === "") {
            return <Redirect to="/" />
        } 
        return (
            <div className="row">
                <div className="col-md-4 alert border-right">
                    <div className="alert alert-warning">
                        <img className="img" width="80px" src="http://localhost:3000/images/flat/006-shopping.png" />
                        <h4>History Belanjaku</h4>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID Trx</th>
                                <th>Waktu</th>
                                <th>Bayar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListJSX()}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-8 pt-3">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Cover</th>
                                <th>ISBN</th>
                                <th>Judul Buku</th>
                                <th>Harga</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDetailJSX()}
                        </tbody>
                    </table>
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

export default connect(mapStateToProps)(HistoryBelanjaKu);