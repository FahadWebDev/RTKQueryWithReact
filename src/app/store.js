import { configureStore } from "@reduxjs/toolkit";
import { rtkQSlice } from "./rtkQApi/rtkQApiSlice";

const store = configureStore({
  reducer: {
    [rtkQSlice.reducerPath]: rtkQSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQSlice.middleware),
});

export default store;
