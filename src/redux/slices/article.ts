import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { DB_CONNECTION } from "../../constants/db";
import { IArticle } from "../../types";
import { ArticleAccess } from "../../utils/ArticleAccess";
import { store } from "../store";

const initialState: {
  articlesList: Array<IArticle>;
  loading: boolean;
  articleItem: IArticle;
} = {
  articlesList: [],
  loading: false,
  articleItem: {
    id: "",
    title: "",
    content: null,
    date: "",
    image: "",
    userId: "",
  },
};

// const { user } = store.getState();

const articleAccess = new ArticleAccess(DB_CONNECTION, "articles");

const getArticlesList = createAsyncThunk("articles/getList", async () => {
  const stores: any = store.getState();
  const response = await articleAccess.getUserArticles(
    stores.auth.user.id as string
  );
  return response;
});

const getArticleById = createAsyncThunk(
  "articles/getArticleById",
  async (id: any) => {
    const response = await articleAccess.get(+id);
    return response;
  }
);

const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (item: IArticle) => {
    const response = await articleAccess.update(item);
    return response;
  }
);

const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id: string) => {
    const response = await articleAccess.remove(id);
    getArticlesList();
    return response;
  }
);

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
    getItem(state, action) {
      state.articleItem = action.payload;
      state.loading = false;
    },
    resetItem(state) {
      state.articleItem = initialState.articleItem;
    },
  },
  extraReducers: {
    [getArticlesList.fulfilled as any]: (state, action) => {
      state.articlesList = action.payload;
    },
    [getArticleById.fulfilled as any]: (state, action) => {
      state.articleItem = action.payload;
    },
    [updateArticle.fulfilled as any]: (state, action) => {
      state.articleItem = action.payload;
    },
    [deleteArticle.fulfilled as any]: (state, action) => {
      // state.articlesList = action.payload;
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

const persistConfig = {
  key: "articles",
  storage,
  keyPrefix: "redux-",
  whitelist: ["articlesList", "articleItem"],
};

const { reset, resetItem } = slice.actions;

export {
  reset as resetArticles,
  resetItem,
  getArticleById,
  deleteArticle,
  addArticle,
  getArticlesList,
  updateArticle,
};
export default persistReducer(persistConfig, slice.reducer);
