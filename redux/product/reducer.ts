import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductByCategoryId } from './dispatcher';
import { CategoryProduct, ProductState } from './type';
const initialState: ProductState = {
  products: {
    id: '',
    createdAt: '',
    deletedAt: '',
    description: '',
    products: [],
    title: '',
    updatedAt: '',
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProductByCategoryId.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload as CategoryProduct;
      }
    );
  },
});

const productReducer = productSlice.reducer;
export { productReducer };
