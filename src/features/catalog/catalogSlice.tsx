/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/request";
import { IProduct } from "../../model/IProduct";
// import { RootState } from "@reduxjs/toolkit/query";
// Update the path below to the correct location of your store file that exports RootState
import { RootState } from "../../store/store";


export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () => {
        return await requests.Catalog.list();
        
    }
)

export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",
    async (productId) => {
        return await requests.Catalog.details(productId);
        
    }
)

const productAdapter = createEntityAdapter<IProduct>();

const initialState = productAdapter.getInitialState({
    status: "idle",
    isLoaded: false,
});

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "pendingFetchProducts";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                productAdapter.setAll(state, action.payload);
                state.isLoaded = true;
                state.status = "idle";
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = "idle";
             
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = "pendingFetchProductById";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                //upsertOne yoksa ekle varsa güncelle
               productAdapter.upsertOne(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchProductById.rejected, (state) => {
                state.status = "idle";
              
            });
    },
})

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectTotal: selectTotalProducts,
    // getSelectors: (state: RootState) => state.catalog
} =   productAdapter.getSelectors((state: RootState) => state.catalog);