import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  apiFetchAllDiscounts,
  apiUpdateDiscountById,
  apiDeleteDiscountById,
  apiFetchDiscountById,
  apiFetchSearchedDiscounts,
  apiPostDiscount,
} from '../utils/apiCalls';

import {
  APICustomResponse,
  Discount,
  DiscountState,
} from '../utils/types';


import { isError } from '../utils/helpers';

const initialState: DiscountState = {
  discount: null,
  discounts: [] as Discount[],
  loading: false,
  fetchDiscountStatus: "",
  addDiscountStatus: "",
  updateDiscountStatus: "",
  deleteDiscountStatus: ""

};

// Fetch all discounts
export const fetchAllDiscounts = createAsyncThunk(
  "discounts/fetchAllDiscounts",
  async (_, thunkAPI) => {
    try {
      const res = await apiFetchAllDiscounts();
      if (res.status === "fail") throw new Error(res.message);
      return res;
    } catch (error: unknown) {
      const message = isError(
        error,
        "Fetching all discounts failed. See message below for more info."
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch discount by id
export const fetchDiscountById = createAsyncThunk(
  "discounts/fetchDiscountById",
  async (discountId: string, thunkAPI) => {
    try {
      const res = await apiFetchDiscountById(discountId);
      if (res.status === "fail") throw new Error(res.message);
      return res;
    } catch (error: unknown) {
      const message = isError(
        error,
        "Fetching movie by id failed. See message below for more info."
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Fetch searched discount by name
export const fetchSearchedDiscounts = createAsyncThunk(
  "discounts/fetchSearchedDiscounts",
  async (name: string, thunkAPI) => {
    try {
      const res = await apiFetchSearchedDiscounts(name);
      if (res.status === "fail") throw new Error(res.message);
      return res;
    } catch (error: unknown) {
      const message = isError(
        error,
        "Fetching discounts by name failed. See message below for more info."
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Add Discount
export const addDiscount = createAsyncThunk(
  "discounts/addDiscount",
  async (data: Discount, thunkAPI) => {
    const discountData: Discount = {
      discountName: data.discountName,
      discountCode: data.discountCode,
      discountValue: data.discountValue,
      expiryDate: data.expiryDate,
    };
    try {

      const res: APICustomResponse<{}> = await apiPostDiscount(discountData);
      if (res.status === "fail") throw new Error(res.message);
      return res;
    } catch (error: unknown) {
      const message = isError(
        error,
        "Adding Discount failed. See message below for more info."
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Discountby Id
export const updateDiscountById = createAsyncThunk(
  "discounts/updateDiscountById",
  async (data: Discount, thunkAPI) => {
    const discountData: Discount = {
      id: data.id,
      discountName: data.discountName,
      discountCode: data.discountCode,
      discountValue: data.discountValue,
      expiryDate: data.expiryDate,
    };
    try {
      const res: APICustomResponse<{}> = await apiUpdateDiscountById(discountData);
      if (res.status === "fail") throw new Error(res.message);
      return res;
    } catch (error: unknown) {
      const message = isError(
        error,
        "Updating Discount failed. See message below for more info."
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDiscountById = createAsyncThunk(
  "discounts/deleteDiscountById",
  async (id: string, thunkAPI) => {
    try {
      const res: APICustomResponse<{}> = await apiDeleteDiscountById(id);
      if (res.status === "fail") throw new Error(res.message);
      return res;
    } catch (error: unknown) {
      const message = isError(
        error,
        "Deleting Discountfailed. See message below for more info."
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DiscountState>) => {
    builder.
      addCase(fetchAllDiscounts.pending, (state: DiscountState) => {
        state.loading = true;
        state.discounts = {} as Discount[];
      })
      .addCase(fetchAllDiscounts.fulfilled, (state: DiscountState, action: PayloadAction<APICustomResponse<{}>>) => {
        state.loading = false;
        state.discounts = action.payload.data as Discount[];
      })
      .addCase(fetchAllDiscounts.rejected, (state: DiscountState) => {
        state.loading = false;
        state.discounts = {} as Discount[];
      });
  }
});

export default discountSlice.reducer;

