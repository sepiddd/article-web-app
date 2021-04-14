import { Layout as AntLayout } from "antd";
import { PropsWithChildren } from "react";

const { Header, Content } = AntLayout;

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <AntLayout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        This is header
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
