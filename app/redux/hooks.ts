import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
// eslint-disable-next-line import/no-unused-modules
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
