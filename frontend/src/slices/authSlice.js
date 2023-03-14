import { createSlice, createAsyncThunk, createNextState } from '@reduxjs/toolkit'
import authService from '../services/authService'

// Pegando usuario da localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
}

// Regsiter an user and sing in // O nome segue está convenção auth = entidade que está trabalhando register = ação atual // Segundo argumento é a função // thunkAPI = Funções extras ex: parar execução e identificar um erro da api
export const register = createAsyncThunk("auth/register", async(user, thunkAPI) => {
    const data = await authService.register(user)

    // Check for errors
    if(data.errors){ // Rejeitando a requisição pois houve algo errado
        return thunkAPI.rejectWithValue(data.errors[0]) // errors = É o que tem no backend que tem varias msg
    }

    return data
})

// Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout()
})

// Sing in an user
export const login = createAsyncThunk("auth/login", async(user, thunkAPI) => {
    const data = await authService.login(user)

    // Check for errors
    if(data.errors){ // Rejeitando a requisição pois houve algo errado
        return thunkAPI.rejectWithValue(data.errors[0]) // errors = É o que tem no backend que tem varias msg
    }

    return data
})

export const authSlice = createSlice({ 
    name: "auth", // Nomear para que seja chamado na store e seja extraido valores por esse nome
    initialState,
    reducers: {
        reset: (state) => { //  reset = reseta como se recarregase etc
            state.loading = false
            state.error = false
            state.success = false
        },
    },
    extraReducers: (builder) => { // Parte das exucuções feitas na API trabalham diretamente com os estados atual de cada requisição // builder = contrutor, vai criar as ações separadamente
        // Se a requisição foi enviada mas não chegou nenhuma resposta = state.loading = true
        builder.addCase(register.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(register.fulfilled, (state, action) => { // Quando a req for um sucesso
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload 
        }).addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        }).addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = null 
        }).addCase(login.pending, (state) => {
            state.loading = true
            state.error = false
        }).addCase(login.fulfilled, (state, action) => { // Quando a req for um sucesso
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload 
        }).addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        })
        
    }
})

export const { reset }  = authSlice.actions
export default authSlice.reducer    