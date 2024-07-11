import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        clearUserEmail: (state) => {
            state.email = "";
        },
    },
});

export const { setUserEmail, clearUserEmail } = userSlice.actions;
export default userSlice.reducer;
