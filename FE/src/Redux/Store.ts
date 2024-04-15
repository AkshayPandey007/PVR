import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./Features/Movie.Slice";


// Configure Store Here
const Store = configureStore({
  reducer: {
    movie: movieSlice.reducer
  },
  devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
