import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "./slices/exchangeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    exchange: exchangeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
