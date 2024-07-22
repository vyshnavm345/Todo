import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user';
import taskReducer from './features/tasks'

export const store = configureStore({
    reducer: {
        user:userReducer,
        task:taskReducer,

    },
    // devTools: process.env.NODE_ENV !== "production",
});