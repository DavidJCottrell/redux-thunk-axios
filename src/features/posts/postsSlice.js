import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";

const initialState = { loading: "idle", error: "", posts: [] };

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (_, thunkAPI) => {
		try {
			const response = await api.get("/posts");
			return await response.data.slice(0, 3);
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// If the call is pending
		builder.addCase(fetchPosts.pending, (state) => {
			state.posts = [];
			state.loading = "loading";
		});
		// If the call is successful
		builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
			state.posts = payload;
			state.loading = "loaded";
		});
		// If the call fails
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.loading = "error";
			state.error = action.error.message;
		});
	},
});

export const selectPosts = createSelector(
	(state) => ({
		posts: state.posts,
		loading: state.loading,
	}),
	(state) => state
);

export default postsSlice;
