import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';
import moment from 'moment';
import { KONEKSI } from '../../support/config';

class VerifyOrderAdmin extends Component {
    state = { modal: false, listToVerify: [], imgModal: "" }

    componentWillMount() {
        this.getListOrder();
    }

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    
    renderModal = (item) => {
        this.setState({imgModal: item.image})
        this.toggle()
    }

    getListOrder = () => {
        //const { username } = this.props.user;
        axios.post(`${KONEKSI}/transaction/ordertoverify`
        ).then((res) => {
            this.setState({ listToVerify: res.data, selectedRow: 0 });
            console.log(this.state.listToVerify)
        }).catch((err) => {
            console.log(err);
        })
    }
    onBtnVerified = (item) => {
        if(window.confirm('Are you sure to approve this transaction?')){
            axios.post(`${KONEKSI}/transaction/approvepayment`, {
                id_transaksi: item.id_transaksi
            }).then((res) => {
                console.log(res.data)
                alert(`ID Trx: ${item.id_transaksi} \nRp.${item.total_bayar} \nHas been Approved!`)
                this.getListOrder()
            }).catch((err) => {
                console.log(err);
            })
        }        
    }

    renderListJSX = () => {
        //var srcgambar = `${KONEKSI}/images/book`; 
        var listJSX = this.state.listToVerify.map(item => {
            return (
                <tr key={item.id_transaksi} className="text-wrap" style={{fontSize:'12px'}}>                        
                    <td className="align-middle">{item.id_transaksi}</td>
                    <td className="align-middle">{item.username}</td>
                    <td className="align-middle text-danger">Rp. {item.total_bayar.toLocaleString()}</td>
                    <td className="align-middle">{moment(item.waktu_transaksi).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className="align-middle">{moment(item.waktu_konfirmasi).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td>{<img src={KONEKSI+item.image} width="60px" alt={item.judul} onClick={() => this.renderModal(item)} /> }</td>
                    <td className="align-middle">
                        <button type="button" className="btn btn-success" onClick={() => this.onBtnVerified(item)}   ><i class="fas fa-check"></i></button>{' '}
                        <button type="button" className="btn btn-danger" onClick={() => this.onBtnDeleteClick(item)} ><i className="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            )            
        })

        return listJSX;
    }

    render() {
        const { username, role } = this.props.user;

        if(username !== "" && role === "Admin" ){
            return(
                <div className="container-fluid">
                    <div className="row">
                        <SidebarAdmin />

                        <div className="col-md-10 bg-light pl-3 pt-3">
                            <div className="alert alert-warning media col-12">
                                <img className="img img-fluid" src="http://localhost:3000/images/flat/003-check.png" width="90px" alt="admin order to verify"/>
                                <div className="col-md-10 media-body">
                                    <h4>Verifikasi Pembayaran</h4>
                                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, cupiditate minima similique quaerat nulla iusto dolorem quam asperiores ratione ex tempore in nemo harum consequatur fuga necessitatibus voluptatem sint dolor. </p>
                                </div>
                            </div>


                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Trx</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Total Bayar</th>
                                        <th scope="col">Waktu Transaksi</th>
                                        <th scope="col">Waktu Konfirmasi</th>
                                        <th scope="col">Bukti</th>
                                        <th colSpan="2">Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListJSX()}
                                </tbody>
                            </table>


                             
                            <div>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Bukti Pembayaran</ModalHeader>
                                <ModalBody className="text-center">
                                    <img className="img img-fluid img-responsive" src={KONEKSI+this.state.imgModal} height="350px" alt="admin order to verify"/>
                                </ModalBody>
                                <ModalFooter>
                                    <p className="text-danger">Mohon teliti sebelum approve pembayaran</p>
                                    <Button color="success" onClick={this.toggle}>Keluar</Button>
                                </ModalFooter>
                                </Modal>
                            </div> 
                            

                            
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.auth
    };
}

export default connect(mapStateToProps)(VerifyOrderAdmin);