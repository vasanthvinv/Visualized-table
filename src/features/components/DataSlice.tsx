import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

interface DataItem {
  id: number;
  [key: string]: string | boolean | number;
}

interface DataState {
  data: DataItem[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(
    "https://66cc14004290b1c4f19bd1fc.mockapi.io/mockapi"
  );
  return response.json();
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      state.data = _.filter(
        state.data,
        (item, index) => index !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<DataItem[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch data";
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;

export const { removeItem } = dataSlice.actions;

export const selectData = (state: { data: DataState }) => state.data.data;
export const selectLoading = (state: { data: DataState }) => state.data.loading;
export const selectError = (state: { data: DataState }) => state.data.error;
