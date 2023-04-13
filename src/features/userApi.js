import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        logged: false
    },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
            state.logged = true
        },
        deleteCredentials: (state, action) => {
            state.user = null
            state.logged = false
        }
    }
})

export const { setCredentials, deleteCredentials } = userSlice.actions
export const adminValue = (state)=>state.auth.user
export default userSlice.reducer