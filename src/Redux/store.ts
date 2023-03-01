import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux/es/exports";
import arrayReducer from "./arraySlice";

const store = configureStore({
  reducer: {
    main: arrayReducer
  }
});

type TState = ReturnType<typeof store.getState>;
type TDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
export const useAppDispatch: () => TDispatch = useDispatch;
export default store