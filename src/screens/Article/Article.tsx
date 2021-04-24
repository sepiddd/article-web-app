import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DraftEditor, Loading } from "../../components";
import { useArticle } from "../../hooks";
import { Typography, Image } from "antd";
import { PATH_APP } from "../../routes/paths";

const { Title, Text } = Typography;

const Article = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getArticle, articleItem } = useArticle();
  const params = useParams<any>();

  useEffect(() => {
    getArticle(params.id);
  }, []);

  useEffect(() => {
    if (articleItem.title) {
      setIsLoading(false);
    }
  }, [articleItem]);

  return isLoading ? (
    <Loading />
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title level={1}>{articleItem.title}</Title>
      <Text style={{ marginBottom: 20 }} type='secondary'>
        {articleItem.date}
      </Text>

      {articleItem.image && (
        <div style={{ marginBottom: 20 }}>
          <Image src={articleItem.image} width='100%' />
        </div>
      )}
      <DraftEditor text={articleItem.content} mode='read' />

      <Link
        style={{ marginTop: 20, alignSelf: "flex-end" }}
        to={PATH_APP.articles}>
        Back
      </Link>
    </div>
  );
};

export default Article;
