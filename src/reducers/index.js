// reducer
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectProdukReducer from './SelectProdukReducer';
import SelectHistoryReducer from './SelectHistoryReducer';
import CartReducer from './CartReducer';

export default combineReducers({ 
    // namaDiReducers : () => 'Jamal Fazlur',
    // username: AuthReducer
    auth: AuthReducer,
    selectedProduk: SelectProdukReducer,
    selectedHistory: SelectHistoryReducer,
    loadOfCart: CartReducer
});