import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  addArticle,
  getArticleById,
  getArticlesList,
} from "../redux/slices/article";
import { IArticle } from "../types";

function useArticle() {
  const dispatch = useDispatch();
  const article = useSelector<RootState, RootState["article"]>(
    (state) => state.article
  );

  useEffect(() => {
    return () => {
      dispatch({
        type: "articles/getArticleById/fulfilled",
        payload: undefined,
      });
    };
  }, []);

  return {
    ...article,
    addArticle: async (data: IArticle) => {
      dispatch(await addArticle(data));
    },
    getArticlesList: async (uid: string) => {
      dispatch(await getArticlesList(uid));
    },
    getArticle: async (id: any) => {
      dispatch(await getArticleById(id));
    },
  };
}

export default useArticle;
