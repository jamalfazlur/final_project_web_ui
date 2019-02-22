import React, { Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomInput } from 'reactstrap';
import SidebarAdmin from './SidebarAdmin';
import { KONEKSI } from '../../support/config';

class InputProductAdmin extends Component {
    state = {AddBookImage: 'Unggah Gambar Buku'}
    
    onBtnAddClick = () => {
        if(document.getElementById("AddBookImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                isbn: this.refs.addIsbn.value,
                judul: this.refs.addJudul.value,
                harga: this.refs.addHarga.value,
                berat: this.refs.addBerat.value,
                jumlah_halaman: this.refs.addJumlahHalaman.value,
                deskripsi: this.refs.addDeskripsi.value,
                penulis: this.refs.addPenulis.value,
                penerbit: this.refs.addPenerbit.value
            }

            console.log(data)

            if(document.getElementById('AddBookImage')){
                formData.append('gambar', document.getElementById('AddBookImage').files[0])
            }
            formData.append('data', JSON.stringify(data))
            console.log(data)
            axios.post(`${KONEKSI}/product/addproduct`, formData, headers)
            .then((res) => {
                
                alert("Buku & Gambar Berhasil Diunggah!")
                console.log(res.data);
                //this.setState({ brandList: res.data })
                //this.setState({message:"Bukti Pembayaran Berhasil Diunggah"})
                //this.getListPayment();
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
    }

    render(){
        const { username, role } = this.props.user;

        if(username !== "" && role === "Admin" ){
            return (
                <div className="container-fluid">
                    <div className="row">
                        <SidebarAdmin />

                        <div className="col-md-10 bg-light pl-3 pt-3">
                                <div className="alert alert-warning media col-12">
                                    <img className="img img-fluid" src="http://localhost:3000/images/flat/046-accounting-1.png" width="90px" />
                                    <div className="col-md-10 media-body">
                                        <h4>Input Product</h4>
                                        <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, cupiditate minima similique quaerat nulla iusto dolorem quam asperiores ratione ex tempore in nemo harum consequatur fuga necessitatibus voluptatem sint dolor. </p>
                                    </div>
                                </div>

                                <div className="row justify-content-sm-left mt-3 ml-1 text-left" >                            
                                    <div className="col-md-6">                                        
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">No. ISBN</label>
                                            <div className="col-sm-9">
                                                <input type="text" ref="addIsbn" className="form-control" id="inputIsbn" placeholder="ISBN" required autoFocus/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Judul</label>
                                            <div className="col-sm-9">
                                                <input type="text" ref="addJudul" className="form-control" id="inputJudul" placeholder="Judul Buku" required />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Harga</label>
                                            <div className="col-sm-9">
                                                <input type="number" ref="addHarga" className="form-control" id="inputHarga" placeholder="Rp. " required />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Berat</label>
                                            <div className="col-sm-9">
                                                <input type="number" ref="addBerat" className="form-control" id="inputBerat" placeholder="Weight (gram)" required />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Jumlah Halaman</label>
                                            <div className="col-sm-9">
                                                <input type="number" ref="addJumlahHalaman" className="form-control" id="inputJumlahHalaman" placeholder="Jumlah Halaman" required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Deskripsi</label>
                                            <div className="col-sm-9">
                                                <textarea ref="addDeskripsi" className="form-control" id="inputDeskripsi" placeholder="Deskripsi Buku" rows="3" required />
                                            </div>
                                        </div>
                                    </div> {/* End Column Left */}
                                    
                                    <div className="col-md-6">
                                        
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Cover Buku</label>
                                            <div className="col-sm-9">
                                                <CustomInput type="file" className="form-control" id="AddBookImage" name="AddBookImage" label={this.state.AddBookImage} onChange={this.onAddFileImageChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Penulis</label>
                                            <div className="col-sm-9">
                                                <input type="text" ref="addPenulis" className="form-control" id="inputPenulis" placeholder="Nama Penulis" required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Penerbit</label>
                                            <div className="col-sm-9">
                                                <input type="text" ref="addPenerbit" className="form-control" id="inputPenerbit" placeholder="Nama Penerbit" required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-9 offset-sm-3">
                                                <button type="button" class="btn btn-success col-12" onClick={this.onBtnAddClick} ><i class="fas fa-file-upload"></i> Input Buku</button>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>                            
                        </div>
                    </div>
                    
                </div>
            );
        }
        return(
            <Redirect to="/" />
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.auth
    };
}

export default connect(mapStateToProps)(InputProductAdmin);