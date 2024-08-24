import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tab: sessionStorage.getItem('activePageTab') ?? 'home',
}

export const pageSwitcher = createSlice({
    name: 'pageSwitcher',
    initialState,
    reducers: {

        // student links
        switchToHome: (state) => {
            state.tab = 'home'
            sessionStorage.setItem('activePageTab', 'home')
        },
        switchToItemList: (state) => {
            state.tab = 'itemlist'
            sessionStorage.setItem('activePageTab', 'itemlist')
        },
        switchToCreateBill: (state) => {
            state.tab = 'createbill'
            sessionStorage.setItem('activePageTab', 'createbill')
        },
        switchToHistory: (state) => {
            state.tab = 'history'
            sessionStorage.setItem('activePageTab', 'history')
        }
    },
})

export const {
    switchToHome,
    switchToItemList,
    switchToCreateBill,
    switchToHistory

} = pageSwitcher.actions

export default pageSwitcher.reducer