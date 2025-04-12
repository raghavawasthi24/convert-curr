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
                // console.log("Fetching rates...");
                state.status = "loading";
            })
            .addCase(getRates.fulfilled, (state, action) => {
                // console.log("Fetched rates:", action.payload);
                state.status = "succeeded";
                state.rates = action.payload.conversion_rates;
                state.base = action.payload.base_code;

                // console.log("Updated rates:", state);
            })
            .addCase(getRates.rejected, (state, action) => {
                // console.error("Failed to fetch rates:", action.error);
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default exchangeSlice.reducer;
