import { configureStore } from '@reduxjs/toolkit';
import productApi from './productApi.slice'
import pageSwitcher from './pageSwitcher'

const store = configureStore({
    reducer: {
        productApi,
        pageSwitcher
    }
});

export default store;