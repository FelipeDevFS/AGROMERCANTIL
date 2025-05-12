import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('products/');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await api.post('products/', product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await api.delete(`products/${id}/`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Erro ao buscar produtos';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
