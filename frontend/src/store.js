import { configureStore } from "@reduxjs/toolkit"

import authReducer from '../src/slices/authSlice'
import userReducer from '../src/slices/userSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
})