import React, { Component } from 'react';

class BannerKu extends Component {
    render() {
        return (
            <div className="alert" style={{marginTop:"0.5rem"}} style={{fontSize:"12px"}}>
                <p className="font-weight-bold text-uppercase">Kenapa Pilih Kami ?</p>
                <div className="row" >
                    <div className="col-md-4 col-sm-6">
                        <img className="img" width="70px" src="http://localhost:3000/images/flat/010-delivery.png" alt="kenapa pilih kami" />
                    </div>
                    <div className="col-md-8 col-sm-6" >
                        <p className="font-weight-bold text-danger my-0">Koleksi Terlengkap</p>
                        <p className="font-weight-light">Nikmati koleksi buku terlengkap ditambah discount spesial.</p>
                    </div>
                    <div className="col-md-4">
                        <img className="img" width="70px" src="http://localhost:3000/images/flat/013-present.png" alt="koleksi lengkap" />
                    </div>
                    <div className="col-md-8" >
                        <p className="font-weight-bold text-danger my-0">Pengiriman Cepat</p>
                        <p className="font-weight-light">Pesanan anda langsung diproses setelah pembayaran lunas.</p>
                    </div>
                    <div className="col-md-4">
                        <img className="img" width="70px" src="http://localhost:3000/images/flat/028-badges.png" alt="fast shipping" />
                    </div>
                    <div className="col-md-8" >
                        <p className="font-weight-bold text-danger my-0">Berkualitas & Terpercaya</p>
                        <p className="font-weight-light">Semua barang terjamin kualitasnya dan terpercaya.</p>
                    </div>
                    <div className="col-md-4">
                        <img className="img" width="70px" src="http://localhost:3000/images/flat/009-money.png" alt="quality and trusted" />
                    </div>
                    <div className="col-md-8" >
                        <p className="font-weight-bold text-danger my-0">Harga Terendah</p>
                        <p className="font-weight-light">Kami selalu memberikan harga terbaik, penawaran khusus seperti edisi tanda-tangan dan promo lainnya.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default BannerKu;