import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import logger from "redux-logger";
import rootReducer from "@/store/reducers";

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configures and creates the Redux store with middleware, persistence, and logging.
 *
 * @author jstarsky
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

/**
 * Creates and exports the persistor for Redux persistence.
 *
 * @author jstarsky
 */
export const persistor = persistStore(store as EnhancedStore);
