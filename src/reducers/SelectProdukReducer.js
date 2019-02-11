import {
    SELECT_PRODUK
} from '../actions/types';

// const INITIAL_STATE = '';
const INITIAL_STATE = {isbn: 0, judul: '', harga: 0, gambar: '', deskripsi: '', penulis: '', penerbit: ''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case SELECT_PRODUK :
            return action.payload;

        default :
            return state;
    }
}