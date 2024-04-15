import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../Service/AuthService";

const initialState: any = {
  isFetching: false,
  error: "",
  isError: false,
};

  // Signup thunks
  export const signup: any = createAsyncThunk(
    "auth/signup",
    async (data: { email: string; password: string }, thunkAPI) => {
      const response = await AuthService.signup(data.email, data.password);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  // Login thunks
export const login: any = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    const response = await AuthService.login(data.email, data.password);
    if (response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.message);
    }
  }
);


export const logout: any = createAsyncThunk("logout", async (_, thunkAPI) => {
  const data = await AuthService.logout();

  if (data) return data;
  else return thunkAPI.rejectWithValue("Error on getting all users");
});



  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      clearState: (state) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
     
    },
  });
  
  export const { clearState } = userSlice.actions;
  
  export default userSlice;