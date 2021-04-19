import { Button } from "antd";
import { useHistory } from "react-router";
import { PATH_APP } from "../../routes/paths";

const List = () => {
  const history = useHistory();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
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
      </div>
    </div>
  );
};

export default List;
