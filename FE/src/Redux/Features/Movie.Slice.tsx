import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieService from "../Service/MovieService";

const initialState: any = {
  isFetching: false,
  error: "",
  isError: false,
  allMovie: [],
  getMovieById:[]
};


  // Movie thunks
export const createMovie: any = createAsyncThunk(
  "create/movie",
  async ({ title, movieSlots }:{title: string, movieSlots: any[]}, thunkAPI) => {
    const response = await MovieService.MovieCreate(title, movieSlots);
    if (response) {
       
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.message);
    }
  }
);


export const allMovie: any = createAsyncThunk(
    "all/movie",
    async (_, thunkAPI) => {
      const response = await MovieService.AllMovie();
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  export const deleteMovie: any = createAsyncThunk(
    "delete/movie",
    async ({movieId}:{movieId:string}, thunkAPI) => {
      const response = await MovieService.DeleteMovie(movieId);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  export const getMovieById: any = createAsyncThunk(
    "get/movieById",
    async ({movieId}:{movieId:string}, thunkAPI) => {
      const response = await MovieService.getMovieById(movieId);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );

  export const deleteMovieSlotById: any = createAsyncThunk(
    "delete/movieSlotById",
    async ({id}:{id:string}, thunkAPI) => {
      const response = await MovieService.deleteMovieSlotById(id);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  export const updateMovieSlotById: any = createAsyncThunk(
    "update/movieSlotById",
    async ({slotArray}:{slotArray:any}, thunkAPI) => {
      const response = await MovieService.updateMovieSlotById(slotArray);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );

  export const updateMovieById: any = createAsyncThunk(
    "update/movieById",
    async ({id,title}:{id:string,title:any}, thunkAPI) => {
      const response = await MovieService.updateMovieById(id,title);
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    }
  );


  const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
      clearState: (state) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.allMovie=[]
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(createMovie.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.allMovie.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(allMovie.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(allMovie.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.allMovie=action?.payload
      })
      .addCase(allMovie.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.allMovie = state?.allMovie?.filter(
            (movie:any) => movie._id !== action?.payload?.movieId
          );
        })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
        state.getMovieById=action?.payload
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(deleteMovieSlotById.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(deleteMovieSlotById.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(deleteMovieSlotById.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = action.payload as string;
      })
    },
  });
  
  export const { clearState } = movieSlice.actions;
  
  export default movieSlice;