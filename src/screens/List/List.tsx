import { Button, Table, Space, Modal } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticle } from "../../hooks";
import { PATH_APP } from "../../routes/paths";

const { Column } = Table;
const { confirm } = Modal;

const List = () => {
  const { articlesList, getArticlesList, deleteArticle } = useArticle();

  useEffect(() => {
    getArticlesList();
  }, []);

  const handleDelete = (title: string, id: string) => {
    confirm({
      title: "Delete Article",
      content: `Are you sure to delete "${title}" article?`,
      async onOk() {
        await deleteArticle(id).then();
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

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
      <Table dataSource={articlesList} rowKey='id' scroll={{ x: 700 }}>
        <Column width={150} title='Date' dataIndex='date' key='date' />

        <Column
          title='Title'
          key='title'
          render={(data) => (
            <Link to={`${PATH_APP.articles}/${data.id}`}>{data.title}</Link>
          )}
        />

        <Column
          width={150}
          title='Action'
          key='action'
          fixed='right'
          render={(data) => (
            <Space size='middle'>
              <Link to={`${PATH_APP.articles}/${data.id}/edit`}>Edit</Link>
              <Button
                type='link'
                danger
                onClick={() => handleDelete(data.title, data.id)}>
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
