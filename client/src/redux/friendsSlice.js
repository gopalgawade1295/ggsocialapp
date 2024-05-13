import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friends: [],
};

export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        friends: (state, action) => {
            state.friends = action.payload.friends;
        }
    },
});

export const { friends } = friendsSlice.actions;
export default friendsSlice.reducer;
