import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { User } from "../../types";
import { DataAccess } from "../../utils/DataAccess";
import { notification } from "antd";
import { DB_CONNECTION } from "../../constants/db";
import { UserAccess } from "../../utils/UserAccess";

const userAccess = new UserAccess(DB_CONNECTION, "users");

const initialState: {
  isAuthenticated: boolean;
  loading: boolean;
  user: User;
} = {
  isAuthenticated: false,
  loading: false,
  user: { lastName: "", firstName: "", email: "", password: "", id: "" },
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
    setSession(state, action) {
      state.isAuthenticated = true;
      state.user = { ...action.payload, password: "" };
    },
  },
});

export function login(email: string, password: string) {
  return (dispatch: Dispatch<any>) => {
    try {
      dispatch(slice.actions.showLoading());
      userAccess.getByEmail(email).then((res) => {
        if (!!res) {
          if (res.password === password) {
            dispatch(slice.actions.hideLoading());
            dispatch(slice.actions.setSession(res));

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
      userAccess.getByEmail(data.email).then((res) => {
        if (!!res) {
          notification["error"]({
            message: "user exist",
          });
          dispatch(slice.actions.hideLoading());
          return false;
        } else {
          userAccess.add(data).then((res) => {
            dispatch(slice.actions.setSession({ ...data, id: res }));
            dispatch(slice.actions.hideLoading());
            notification["success"]({
              message: "You're Profile create successfully.",
            });

            return res;
          });
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
  whitelist: ["isAuthenticated", "user"],
};

const { reset, setSession } = slice.actions;

export { reset as resetAuth, setSession };
export default persistReducer(persistConfig, slice.reducer);
