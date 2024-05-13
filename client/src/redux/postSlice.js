import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
};

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
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

export const { posts, post } = postSlice.actions;
export default postSlice.reducer;
