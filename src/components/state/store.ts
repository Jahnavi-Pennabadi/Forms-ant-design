
import {configureStore} from '@reduxjs/toolkit'
import formSlice from './formslice'

let store = configureStore({
    reducer : {
        formlist : formSlice
    }
})

export default store