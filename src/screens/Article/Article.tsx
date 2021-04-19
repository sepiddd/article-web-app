import qs from "query-string";
import { useLocation } from "react-router-dom";
import { ArticleForm } from "../../components";
import { IArticleMode } from "../../types";

const Article = () => {
  const location = useLocation();
  const { mode } = qs.parse(location.search);

  return (
    <div>
      <h2>{mode} article</h2>
      <ArticleForm mode={mode as IArticleMode} />
    </div>
  );
};

export default Article;
