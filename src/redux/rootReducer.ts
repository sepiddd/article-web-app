import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth";
import articleReducer from "./slices/article";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
});

export { rootPersistConfig, rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
