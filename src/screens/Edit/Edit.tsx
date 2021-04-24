import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm } from "../../components";
import { useArticle } from "../../hooks";

const Edit = () => {
  const { getArticle } = useArticle();
  const params = useParams<any>();

  useEffect(() => {
    getArticle(params.id);
  }, [getArticle, params.id]);

  return (
    <div>
      <h2>Edit article</h2>
      <ArticleForm mode='edit' />
    </div>
  );
};

export default Edit;
