/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../model/ICart";
import requests from "../../api/request";

interface CartState{
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: 'idle',
}

export const addItemToCart = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
    "cart/addItemToCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await requests.Cart.addItem(productId, quantity);
        }
        catch (error) {
                console.log(error);
        }
    }
);
export const deleteItemfromCart = createAsyncThunk<Cart, { productId: number, quantity?: number, key?: string }>(
    "cart/deleteItemfromCart",
    async ({ productId, quantity = 1 }) => {
        try {
            return await requests.Cart.deleteItem(productId, quantity);
        }
        catch (error) {
                console.log(error);
        }
    }
);

export const getCart = createAsyncThunk<Cart>(
    "cart/getCart",
    async (_, thunkAPI) => {
        try {
            return await requests.Cart.get();
        }
        catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const cartSlice = createSlice({ 
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addItemToCart.rejected, (state) => { 
            state.status = 'idle';
        });
        builder.addCase(deleteItemfromCart.pending, (state, action) => { 
            state.status = 'pendingDeleteItem'+ action.meta.arg.productId + action.meta.arg.key;
        });
        builder.addCase(deleteItemfromCart.fulfilled, (state, action) => { 
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addCase(deleteItemfromCart.rejected, (state) => { 
            state.status = 'idle';
        });



         builder.addCase(getCart.fulfilled, (state, action) => { 
            state.cart = action.payload;
            
        });
        builder.addCase(getCart.rejected, (_, action) => { 
            console.log(action.payload);
        });
    }
})

export const { setCart, clearCart } = cartSlice.actions;