import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { login } from "../redux/slices/auth";

function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector<RootState, RootState["auth"]>((state) => state.auth);

  return {
    ...auth,
    login: (email: string, password: string) => {
      dispatch(login(email, password));
    },
  };
}

export default useAuth;
