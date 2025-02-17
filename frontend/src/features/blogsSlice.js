import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../api";
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const allBlogs = await axios.get(`${API}/v1/blogs/all`);
  return allBlogs.data;
});

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    allBlogs: [],
    loading: false,
    latestBlogs: [],
    error: null,
  },
  reducers: {
    searchBlogs: (state, action) => {
      const searchText = action.payload;
      const filteredBlogs = [...state.allBlogs].filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchText.toLowerCase())
      );
      state.allBlogs = filteredBlogs;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload;
        state.loading = false;
        // copy allBlogs and get latest 3, first sort then slice
        const latestBlogs = [...state.allBlogs]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
          // update latestBlogs once the action is fulfilled
        state.latestBlogs = latestBlogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
