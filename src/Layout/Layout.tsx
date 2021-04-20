import { Layout as AntLayout } from "antd";
import { PropsWithChildren } from "react";
import { useAuth } from "../hooks";

const { Header, Content } = AntLayout;

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const { user } = useAuth();
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{ position: "fixed", zIndex: 1, width: "100%", color: "white" }}>
        {!!user
          ? `${user.firstName} ${user.lastName}`
          : "Article web application"}
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
