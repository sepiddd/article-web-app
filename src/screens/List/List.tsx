import { Button, Table, Space } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticle, useAuth } from "../../hooks";
import { PATH_APP } from "../../routes/paths";

const { Column } = Table;

const List = () => {
  const { user } = useAuth();
  const { articlesList, getArticlesList } = useArticle();

  useEffect(() => {
    getArticlesList(user.id);
  }, []);

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
        align='center'>
        <h2>List</h2>
        <Link to={PATH_APP.add}>Add Article</Link>
      </Space>
      <Table dataSource={articlesList}>
        <Column width={150} title='Date' dataIndex='date' key='date' />

        <Column title='Title' dataIndex='title' key='title' />

        <Column
          width={150}
          title='Action'
          key='action'
          render={(data) => (
            <Space size='middle'>
              <Link to={`${PATH_APP.articles}/${data.id}/edit`}>Edit</Link>
              <Button type='link' danger>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default List;
