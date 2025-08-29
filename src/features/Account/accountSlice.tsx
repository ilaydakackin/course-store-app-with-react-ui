/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import request from "../../api/request";
import { router } from "../../router/Routes";
import requests from "../../api/request";
import { Cart } from "../../model/ICart";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};
export const loginUser = createAsyncThunk<User, FieldValues>(
  "account/login",
  async (data, { rejectWithValue }) => {
    try {
        const user = await request.Account.login(data);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
 });


export const getUser = createAsyncThunk<User>(
    "account/getUser",
    async (_, thunkAPI) => {
       thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!))); 
        try {
            const user = await requests.Account.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }
        catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data);
        }
    },
    {
      //Token yoksa gereksiz şekilde istek atmasın
      //localStorage'dan user'ı alıp gönderiyoruz
      condition: () => {
        if(!localStorage.getItem("user")) return false;
      }
    }
)

 export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers:{
      logout : (state) => {
        state.user = null;
        localStorage.removeItem("user");
        router.navigate("/catalog");
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      builder.addCase(getUser.rejected, (state) => {
        state.user = null;
        localStorage.removeItem("user");
        router.navigate("/login");
      })
    },
  });

  export const { logout, setUser } = accountSlice.actions;
 