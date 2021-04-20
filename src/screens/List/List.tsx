import { Button, Table, Space } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useArticle, useAuth } from "../../hooks";
import { PATH_APP } from "../../routes/paths";

const { Column } = Table;

const List = () => {
  const history = useHistory();
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
        <Button
          onClick={() =>
            history.push({
              pathname: PATH_APP.addArticle,
              search: "?mode=create",
            })
          }
          type='primary'>
          Add Article
        </Button>
      </Space>
      <Table dataSource={articlesList}>
        <Column width={150} title='Date' dataIndex='date' key='date' />

        <Column title='Title' dataIndex='title' key='title' />

        <Column
          width={150}
          title='Action'
          key='action'
          render={() => (
            <Space size='middle'>
              <a>Edit</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default List;
