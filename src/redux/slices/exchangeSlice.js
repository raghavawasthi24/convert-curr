import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExchangeRates } from "../../utils/api";

export const getRates = createAsyncThunk("exchange/getRates", async () => {
    return await fetchExchangeRates();
});

const exchangeSlice = createSlice({
    name: "exchange",
    initialState: {
        rates: {},
        base: "USD",
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getRates.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.rates = action.payload.rates;
                state.base = action.payload.base;
            })
            .addCase(getRates.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default exchangeSlice.reducer;
