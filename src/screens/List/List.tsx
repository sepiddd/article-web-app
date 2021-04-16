import { useAuth } from "../../hooks";

const List = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
      <br />
      <br />
      List
    </div>
  );
};

export default List;
