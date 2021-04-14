import { Layout } from "antd";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store";

import "./App.scss";
import "antd/dist/antd.css";

const queryClient = new QueryClient();
const { Header, Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            This is header
          </Header>
          <Content
            className='site-layout'
            style={{ padding: "0 50px", marginTop: 64 }}>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 380 }}>
              Content
            </div>
          </Content>
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
