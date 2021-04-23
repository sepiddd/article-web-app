import { PropsWithChildren } from "react";
import { Button, Layout as AntLayout, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks";

const { Title } = Typography;

const { Header, Content } = AntLayout;

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Title level={2} style={{ color: "white", marginBottom: 0 }}>
          {isAuthenticated
            ? `${user.firstName} ${user.lastName}`
            : "Article web application"}
        </Title>

        {isAuthenticated && (
          <Button
            type='primary'
            shape='round'
            onClick={logout}
            loading={loading}
            icon={<LogoutOutlined />}>
            Logout
          </Button>
        )}
      </Header>
      <Content
        className='site-layout'
        style={{ padding: "0 50px", marginTop: 64 }}>
        <div
          className='site-layout-background'
          style={{ padding: 24, minHeight: 380 }}>
          {children}
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;
