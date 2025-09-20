// src/features/customers/store/customersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrderAt?: string;
}

interface CustomersState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    sortBy: 'name' | 'totalSpent' | 'totalOrders' | 'createdAt';
    sortOrder: 'asc' | 'desc';
  };
}

const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
  },
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    fetchCustomersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
      state.loading = false;
      state.customers = action.payload;
      state.error = null;
    },
    fetchCustomersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCustomer: (state, action: PayloadAction<Partial<Customer> & { id: string }>) => {
      const index = state.customers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...action.payload };
      }
    },
    setFilter: (state, action: PayloadAction<Partial<CustomersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  updateCustomer,
  setFilter,
  clearFilters,
} = customersSlice.actions;
