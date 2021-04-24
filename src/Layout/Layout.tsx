import { PropsWithChildren } from "react";
import { Button, Layout as AntLayout, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks";

const { Title } = Typography;

const { Header, Content } = AntLayout;

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  return (
    <AntLayout
      style={{ minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
      <Header className='header'>
        <Title level={2} style={{ color: "white", marginBottom: 0 }}>
          {isAuthenticated
            ? `${user.firstName} ${user.lastName}`
            : "Article web application"}
        </Title>

        {isAuthenticated && (
          <Button
            className='header__logout-btn'
            type='primary'
            shape='round'
            onClick={logout}
            loading={loading}
            icon={<LogoutOutlined />}>
            Logout
          </Button>
        )}
      </Header>
      <Content className='site-layout' style={{ padding: "0 15px" }}>
        <div
          className='site-layout-background'
          style={{
            padding: "24px 0",
            minHeight: 380,
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
          {children}
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;
