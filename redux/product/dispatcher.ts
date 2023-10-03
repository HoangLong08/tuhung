import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './type';
import ProductService from '@/services/product.service';

export const getProductByCategoryId = createAsyncThunk(
  ActionType.GET_ALL_PRODUCT_BY_CATEGORY,
  async (id: string) => {
    try {
      return await ProductService.getProductByCategoryId(id);
    } catch (error: unknown) {}
  }
);
