import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CarouselKu from './CarouselKu';
import ProductListKu from './ProductListKu';
//import { KONEKSI } from '../support/config';

class HomeKu extends Component{
    state = {search: ""}
    searchSomething = () => {
        var keywords = this.refs.searchBook.value;
        console.log(keywords);
        this.setState({search: keywords})
    }

    renderOnKeyPress = (event) => {
        if (event.key === 'Enter'){
            // alert('Enter has been pressed')
            this.searchSomething()
        }
    }

    render(){
        const { username, status } = this.props.user;
        if( username !== "" && status === "Unverified") {
            return <Redirect to="/verify" />
        }
        if (this.state.search !== "") {
            //var keywords = this.refs.searchBook.value;
            return <Redirect to={`/searchbook?keywords=${this.state.search}`} />
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control" onKeyPress={this.renderOnKeyPress} placeholder="Masukkan kata kunci ... " aria-label="Masukkan keyword judul, No.ISBN, atau Penulis" aria-describedby="button-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" id="button-addon2" onClick={() => this.searchSomething()}><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                        <div className="card p-2">
                            
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">No. ISBN</div>
                                <input className="form-control form-control-sm mb-2" placeholder="penerbit buku"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Judul</div>
                                <input className="form-control form-control-sm mb-2" placeholder="judul buku"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Penulis</div>
                                <input className="form-control form-control-sm mb-2" placeholder="penulis buku"></input> 

                                <button className="btn btn-info"><i class="fas fa-filter"></i> Filter</button>                               
                            </form>

                        </div>
                        
                    </div>
                
                    <div className="col-lg-9">
                        <div className="my-4">
                            <CarouselKu />
                        </div>
                        <ProductListKu />
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

export default connect(mapStateToProps)(HomeKu);