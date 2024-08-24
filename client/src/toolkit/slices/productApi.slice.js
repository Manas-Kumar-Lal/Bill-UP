import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const DB_URI = import.meta.env.VITE_DB_URI

const initialState = {

    allitemlist: [],

    error: "",
}

export const getItemList = createAsyncThunk(

    async () => {
        try {
            const response = await axios.get(``)
            return response.data
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
            const response = await axios.post(`${DB_URI}//product/create`, itemData)
            return response.data
        } catch (err) {
            throw err.response.data.error
        }
    }
);

const ProductApi = createSlice({
    name: 'productapi',
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
                state.allitemlist = action.payload;
            })
            .addCase(getItemList.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // Handling uploadItemList
            .addCase(uploadItemList.pending, (state) => {
                state.error = "";
            })
            .addCase(uploadItemList.fulfilled, (state, action) => {
                state.allitemlist = action.payload;
            })
            .addCase(uploadItemList.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { clearError } = ProductApi.actions;

export default ProductApi.reducer;
