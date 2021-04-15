import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { login, register } from "../redux/slices/auth";
import { User } from "../types";

function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector<RootState, RootState["auth"]>((state) => state.auth);

  return {
    ...auth,
    login: (email: string, password: string) => {
      dispatch(login(email, password));
    },
    register: (data: User) => {
      dispatch(register(data));
    },
  };
}

export default useAuth;
