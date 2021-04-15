import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  RouteProps,
  Switch,
  Route,
} from "react-router-dom";

import "./App.scss";
import "antd/dist/antd.css";
import { store } from "./redux/store";
import { Fragment, lazy, Suspense } from "react";
import { AuthGuard, Loading } from "./components";
import { PATH_APP, PATH_AUTH } from "./routes/paths";
import Layout from "./Layout";

const queryClient = new QueryClient();

const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./screens/Login")),
  },
  // Auth Routes
  {
    path: PATH_AUTH.root,
    layout: Layout,
    routes: [
      {
        exact: true,
        path: "/auth/login",
        component: lazy(() => import("./screens/Login")),
      },
      {
        exact: true,
        path: "/auth/register",
        component: lazy(() => import("./screens/Register")),
      },
    ],
  },
  // App Routes
  {
    path: PATH_APP.root,
    layout: Layout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: PATH_APP.list,
        component: lazy(() => import("./screens/List")),
      },
    ],
  },
];

function RouteProgress(props: RouteProps) {
  return <Route {...props} />;
}

function renderRoutes(routes: Array<any> = []) {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;

          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props: RouteProps) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>{renderRoutes(routes)}</Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
