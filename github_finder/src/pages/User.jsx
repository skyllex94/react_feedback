import { useEffect } from "react";
import { useContext } from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router-dom";

function User() {
  const { user, getUser } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.login);
    // getUserRepos(params.login)
  }, []);

  return <div>{user.login}</div>;
}

export default User;
