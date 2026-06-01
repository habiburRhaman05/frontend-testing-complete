import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchProducts = createAsyncThunk(
  'search/fetch',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const filtered = response.data.filter((p: any) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      return filtered;
    } catch (err: any) {
      return rejectWithValue('Failed to fetch products from server');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: { items: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;