import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  addArticle,
  deleteArticle,
  getArticleById,
  getArticlesList,
  resetItem,
  updateArticle,
} from "../redux/slices/article";
import { IArticle } from "../types";

function useArticle() {
  const dispatch = useDispatch();
  const article = useSelector<RootState, RootState["article"]>(
    (state) => state.article
  );

  useEffect(() => {
    return () => {
      dispatch(resetItem());
    };
  }, []);

  return {
    ...article,
    addArticle: async (data: IArticle) => {
      dispatch(await addArticle(data));
    },
    getArticlesList: async () => {
      dispatch(await getArticlesList());
    },
    getArticle: async (id: any) => {
      dispatch(await getArticleById(id));
    },
    updateArticle: async (item: IArticle) => {
      dispatch(await updateArticle(item));
    },
    deleteArticle: async (id: string) => {
      dispatch(await deleteArticle(id));
    },
  };
}

export default useArticle;
