import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";
import { axiosCall } from "../../utils";

type returnError = {
    message: string;
};

export interface ProductState {
    data: { list: IProduct[]; count: number };
    details: IProduct;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductState = {
    data: { list: [], count: 0 },
    details: {
        id: "",
        name: "",
        amount: 0,
        subCategory: [],
        subSubCategory: [],
        images: [],
        details: "",
        variations: [],
        date_created: ""
    },
    status: "loading",
    error: null,
};

export const createProduct = createAsyncThunk<
    IProduct,
    {
        name: string;
        amount: number;
        subCategory?: string[];
        subSubCategory?: string[];
        images?: string[];
        details: string;
        variations?: string[];
        date_created: string;
    },
    { rejectValue: returnError }
>("products/create", async (payload, thunkAPI) => {
    const response = await axiosCall("/products", "POST", payload);
    if (!response.status) {
        return thunkAPI.rejectWithValue({
            message: response.message,
        });
    }
    return response.data as IProduct;
});

export const editProduct = createAsyncThunk<
    IProduct,
    {
        id: string;
        name: string;
        amount: number;
        subCategory?: string[];
        subSubCategory?: string[];
        images?: string[];
        details: string;
        variations?: string[];
    },
    { rejectValue: returnError }
>("product/edit", async (payload, thunkAPI) => {
    const data = { ...payload, actors: undefined };
    const response = await axiosCall(`/products/${payload.id}`, "PATCH", data);
    if (!response.status) {
        return thunkAPI.rejectWithValue({
            message: response.message,
        });
    }
    return payload as IProduct;
});

export const deleteProduct = createAsyncThunk<
    { id: string },
    string,
    { rejectValue: returnError }
>("product/delete", async (payload, thunkAPI) => {
    const response = await axiosCall(`/products/${payload}`, "DELETE");
    if (!response.status) {
        return thunkAPI.rejectWithValue({
            message: response.message,
        });
    }
    return { id: payload };
});

/* It will get all products */
export const getProducts = createAsyncThunk<
    { products: IProduct[]; count: number },
    undefined | { skip: number; limit: number },
    { rejectValue: returnError }
>("products/fetch", async (state, thunkAPI) => {
    let filter = "";
    if (state) filter = `filter[skip]=${state.skip}&filter[limit]=${state.limit}`;
    const response = await axiosCall(`/products?${filter}`, "GET");
    if (!response.status) {
        return thunkAPI.rejectWithValue({
            message: response.message,
        });
    }
    return response.data;
});

export const getProductDetails = createAsyncThunk<
    IProduct,
    string,
    { rejectValue: returnError }
>("product/details", async (id: string, thunkAPI) => {
    const response = await axiosCall(`/products/${id}`, "GET");
    if (!response.status) {
        return thunkAPI.rejectWithValue({
            message: response.message,
        });
    }

    return response.data as IProduct;
});

export const productSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(createProduct.fulfilled, (state) => {
            state.data.count += 1;
            state.status = "idle";
        });

        builder.addCase(createProduct.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message;
            state.status = "failed";
        });

        builder.addCase(editProduct.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(editProduct.fulfilled, (state, { payload }) => {
            state.data.list = state.data.list.map((products) =>
                products.id === payload.id ? { ...products, ...payload } : products
            );

            state.status = "idle";
        });

        builder.addCase(editProduct.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message;
            state.status = "failed";
        });

        builder.addCase(deleteProduct.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.data.list = state.data.list.filter(
                ({ id }) => id !== payload.id
            );
            state.data.count -= 1;
            state.status = "idle";
        });

        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message;
            state.status = "failed";
        });

        builder.addCase(getProducts.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.data.list = payload.products;
            state.data.count = payload.count;
            state.status = "idle";
        });

        builder.addCase(getProducts.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message;
            state.status = "failed";
        });

        builder.addCase(getProductDetails.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
            state.details = payload;
            state.status = "idle";
        });

        builder.addCase(getProductDetails.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message;
            state.status = "failed";
        });
    },
});
export default productSlice.reducer;
