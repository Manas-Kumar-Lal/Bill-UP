import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const DB_URI = import.meta.env.VITE_DB_URI

const initialState = {

    products: [],
    error: "",
}

export const getItemList = createAsyncThunk(
'/product/getallproducts',
    async () => {
        try {
            const response = await axios.get(`${DB_URI}/product/getallproducts`)
            console.log(response.data.responseData.products)
            return response.data.responseData.products
        } catch (err) {
            throw err.response.data.error
        }
    }
);

export const uploadItemList = createAsyncThunk(
    '/product/create',
    async (itemData) => {
        console.log(itemData)
        try {
            const response = await axios.post(`${DB_URI}/product/create`, itemData)
            return response.data
        } catch (err) {
            throw err.response.data.error
        }
    }
);

const productApi = createSlice({
    name: 'productApi',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Handling getItemList
            .addCase(getItemList.pending, (state) => {
                state.error = "";
            })
            .addCase(getItemList.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getItemList.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // Handling uploadItemList
            .addCase(uploadItemList.pending, (state) => {
                state.error = "";
            })
            .addCase(uploadItemList.fulfilled, (state, action) => {
                // state.allitemlist = action.payload;
            })
            .addCase(uploadItemList.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { clearError } = productApi.actions;

export default productApi.reducer;
