import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { User } from "../../types";
import { DataAccess } from "../../utils/DataAccess";
import { notification } from "antd";

const userAccess = new DataAccess<User>("store", "users", "email");

const initialState: {
  isAuthenticated: boolean;
  loading: boolean;
} = {
  isAuthenticated: false,
  loading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
    setSession(state) {
      state.isAuthenticated = true;
    },
  },
});

export function login(email: string, password: string) {
  return (dispatch: Dispatch<any>) => {
    try {
      dispatch(slice.actions.showLoading());
      userAccess.get(email).then((res) => {
        if (!!res) {
          if (res.password === password) {
            dispatch(slice.actions.hideLoading());
            dispatch(slice.actions.setSession());
            notification["success"]({
              message: "You're logged in successfully.",
            });
            return res;
          } else {
            notification["error"]({
              message: "Your password is wrong",
            });
            dispatch(slice.actions.hideLoading());
            return null;
          }
        } else {
          dispatch(slice.actions.hideLoading());
          notification["error"]({
            message: "user dose not exist",
          });
          return null;
        }
      });
    } catch (e) {
      dispatch(slice.actions.hideLoading());
      return null;
    }
  };
}

export function register(data: User) {
  return (dispatch: Dispatch<any>) => {
    dispatch(slice.actions.showLoading());
    try {
      userAccess.get(data.email).then((res) => {
        if (!!res) {
          notification["error"]({
            message: "user exist",
          });
          dispatch(slice.actions.hideLoading());
          return false;
        } else {
          const result: any = userAccess.add(data);
          dispatch(slice.actions.setSession());
          dispatch(slice.actions.hideLoading());
          notification["success"]({
            message: "You're Profile create successfully.",
          });
          return result;
        }
      });
    } catch (e) {
      dispatch(slice.actions.hideLoading());
      return null;
    }
  };
}

const persistConfig = {
  key: "auth",
  storage,
  keyPrefix: "redux-",
  whitelist: ["isAuthenticated", "profile"],
};

const { reset, setSession } = slice.actions;

export { reset as resetAuth, setSession };
export default persistReducer(persistConfig, slice.reducer);
