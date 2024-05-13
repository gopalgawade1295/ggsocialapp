import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        users: (state, action) => {
            state.users = action.payload.users;
        }
    },
});

export const { users } = usersSlice.actions;
export default usersSlice.reducer;
