import { combineReducers, configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import task from "./task/reducer";
import actions from "./actions";
import getters from "./getters";

// Importando o armazenamento correto com `import` para evitar o erro do `require`
import storage from "redux-persist/lib/storage";

export const modules = { getters, actions };

const reducer = combineReducers({
  task,
});

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storageImpl =
  typeof window === "undefined" ? createNoopStorage() : storage;

const persistConfig = getPersistConfig({
  key: "root",
  storage: storageImpl,
  blacklist: [],
  rootReducer: reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);
declare global {
  type RootState = ReturnType<typeof store.getState>;
}

const Store = ({ children }: { children: React.JSX.Element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Store;
