import { Empty, Button, Space } from "antd";
import { useHistory } from "react-router-dom";
import { PATH_APP } from "../../routes/paths";

const NotFound = () => {
  const history = useHistory();
  return (
    <Space
      style={{ height: "100vh", width: "100vw", justifyContent: "center" }}
      align='center'>
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{
          height: 60,
        }}
        description={<span>Page NotFound</span>}>
        <Button onClick={(e) => history.push(PATH_APP.articles)} type='primary'>
          Go To Home
        </Button>
      </Empty>
    </Space>
  );
};

export default NotFound;
