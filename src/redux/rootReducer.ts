import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth";
import articleReducer from "./slices/article";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const appReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/reset") {
    state = undefined;
  }

  return appReducer(state, action);
};

export { rootPersistConfig, rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
