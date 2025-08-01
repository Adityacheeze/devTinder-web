import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          🧑‍💻devTinder
        </a>
      </div>
      <div className="flex gap-2 items-center">
        {user && <p>Welcome {user?.firstName}</p>}
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoURL} />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-300  rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/connections"}>Connections</Link>
            </li>
            <li>
              <Link to={"/requests"}>Requests</Link>
            </li>
            <li>
              <Link to={"/delete"}>Delete Account</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
