import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { notification } from "antd";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { DB_CONNECTION } from "../../constants/db";
import { IArticle } from "../../types";
import { ArticleAccess } from "../../utils/ArticleAccess";
import { DataAccess } from "../../utils/DataAccess";

const initialState: {
  articlesList: Array<IArticle>;
  loading: boolean;
} = {
  articlesList: [],
  loading: false,
};

const articleAccess = new ArticleAccess(DB_CONNECTION, "articles");

const getArticlesList = async (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const data = await articleAccess.getUserArticles(id);
      dispatch(slice.actions.getList(data));
      return data;
    } catch {
      notification["error"]({
        message: "An error occured",
      });
    }
  };
};
const slice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
    reset() {
      return initialState;
    },
    getList(state, action) {
      state.articlesList = action.payload;
      state.loading = false;
    },
  },
});

const addArticle = async (data: IArticle) => {
  return (dispatch: Dispatch<any>) => {
    try {
      dispatch(slice.actions.showLoading());
      articleAccess.add(data).then((res) => {
        return res;
      });
    } catch (e) {
      dispatch(slice.actions.hideLoading());
      return null;
    }
  };
};

function editArticle() {}

function deleteArticle() {}

const persistConfig = {
  key: "articles",
  storage,
  keyPrefix: "redux-",
  whitelist: ["articlesList"],
};

const { reset } = slice.actions;

export {
  reset as resetArticles,
  editArticle,
  deleteArticle,
  addArticle,
  getArticlesList,
};
export default persistReducer(persistConfig, slice.reducer);
