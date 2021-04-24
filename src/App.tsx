import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  RouteProps,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { persistor, store } from "./redux/store";
import { Fragment, lazy, Suspense } from "react";
import { AuthGuard, Loading } from "./components";
import { PATH_APP, PATH_AUTH } from "./routes/paths";
import Layout from "./Layout";
import { PersistGate } from "redux-persist/integration/react";

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
        path: PATH_AUTH.login,
        component: lazy(() => import("./screens/Login")),
      },
      {
        exact: true,
        path: PATH_AUTH.register,
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
        path: PATH_APP.add,
        component: lazy(() => import("./screens/Add")),
      },
      {
        exact: true,
        path: PATH_APP.show,
        component: lazy(() => import("./screens/Article")),
      },
      {
        exact: true,
        path: PATH_APP.articles,
        component: lazy(() => import("./screens/List")),
      },
      {
        path: PATH_APP.edit,
        component: lazy(() => import("./screens/Edit")),
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
        <Redirect exact from='/' to={PATH_APP.articles} />
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
      <PersistGate loading={null} persistor={persistor}>
        <Router>{renderRoutes(routes)}</Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
