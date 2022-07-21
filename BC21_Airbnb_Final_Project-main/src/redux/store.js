import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import danhGiaSlice from "./danhGiaSlice";
import phongSlice from "./phongSlice";
import viTriSlice from "./viTriSlice";

export const store = configureStore({
    reducer: {
        viTriSlice: viTriSlice,
        phongSlice: phongSlice,
        danhGiaSlice: danhGiaSlice,
        authSlice,
    },
});
