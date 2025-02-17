import { configureStore } from "@reduxjs/toolkit";
import blogsSlice from "./blogsSlice";

const store = configureStore({
    reducer: {
        blogs: blogsSlice,
    },
});

export default store;