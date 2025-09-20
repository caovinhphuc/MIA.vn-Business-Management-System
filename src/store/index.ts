// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../components/features/auth/store/authSlice";
import { customersSlice } from "../components/features/customers/store/customersSlice";
import { ordersSlice } from "../components/features/orders/store/ordersSlice";
import { productsSlice } from "../components/features/products/store/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
    customers: customersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
