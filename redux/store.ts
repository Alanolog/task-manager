import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
// const store = configureStore(rootReducer, applyMiddleware(thunk));

export default store;
