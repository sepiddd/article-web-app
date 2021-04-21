import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { DB_CONNECTION } from "../../constants/db";
import { IArticle } from "../../types";
import { ArticleAccess } from "../../utils/ArticleAccess";

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

const articleAccess = new ArticleAccess(DB_CONNECTION, "articles");

const getArticlesList = createAsyncThunk(
  "articles/getList",
  async (id: string) => {
    const response = await articleAccess.getUserArticles(id);
    return response;
  }
);

const getArticleById = createAsyncThunk(
  "articles/getArticleById",
  async (id: any) => {
    const response = await articleAccess.get(+id);
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
  },
  extraReducers: {
    [getArticlesList.fulfilled as any]: (state, action) => {
      state.articlesList = action.payload;
    },
    [getArticleById.fulfilled as any]: (state, action) => {
      state.articleItem = action.payload;
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

// const getArticle = async (id: any) => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const data = await articleAccess.get(id);
//       dispatch(slice.actions.getItem(data));
//       return data;
//     } catch {
//       dispatch(slice.actions.hideLoading());
//       return null;
//     }
//   };
//   // return async (dispatch: Dispatch<any>) => {
//   //   try {
//   //     dispatch(slice.actions.showLoading());
//   //     articleAccess.get(id).then((res) => {
//   //       dispatch(slice.actions.getItem(res));
//   //     });
//   //   } catch (e) {
//   //     dispatch(slice.actions.hideLoading());
//   //     return null;
//   //   }
//   // };
// };

function deleteArticle() {}

const persistConfig = {
  key: "articles",
  storage,
  keyPrefix: "redux-",
  whitelist: ["articlesList", "articleItem"],
};

const { reset } = slice.actions;

export {
  reset as resetArticles,
  getArticleById,
  deleteArticle,
  addArticle,
  getArticlesList,
};
export default persistReducer(persistConfig, slice.reducer);
