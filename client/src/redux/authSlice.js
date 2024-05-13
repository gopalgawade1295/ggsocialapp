import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        mode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        friends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User not exists!");
            }
        },
        posts: (state, action) => {
            state.posts = action.payload.posts;
        },
        post: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    },
});

export const { mode, login, logout, friends, posts, post } = authSlice.actions;
export default authSlice.reducer;
