import { configureStore } from "@reduxjs/toolkit";

import reposReducers from "@/redux/features/repositories/reposSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      repos: reposReducers,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
