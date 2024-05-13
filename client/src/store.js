import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './redux/authSlice';
import UsersReducer from './redux/usersSlice';
import FriendsReducer from './redux/friendsSlice';
import PostReducer from './redux/postSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        users: UsersReducer,
        friends: FriendsReducer,
        post: PostReducer
    }
})

export default store;
