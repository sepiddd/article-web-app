import { FC } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../hooks";
import { PATH_AUTH } from "../../routes/paths";

const AuthGuard: FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={PATH_AUTH.login} push />;
  }

  return <>{children}</>;
};

export default AuthGuard;
