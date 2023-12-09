import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "../../app/store";
import { isAuthenticated, logout } from "../../features/Auth/AuthSlice";
import { useState } from "react";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const is_auth = useSelector(isAuthenticated);
  return (
    <>
      <header className="bg-slate-900 text-white w-screen fixed right-0 top-0 z-20 flex justify-evenly py-4">
        <ul className="flex justify-center gap-10 max-sm:text-xs max-sm:gap-1 ml-10">
          <li className="hover:bg-white hover:text-black rounded-md">
            <Link className="hover:border-b-[2px] border-slate-950 max-sm:px-1 px-3 py-2">
              Home
            </Link>
          </li>
          <li className="hover:bg-white hover:text-black max-sm:px-2 rounded-md">
            <Link
              to="/customer_service"
              className="hover:border-b-[2px] border-slate-950 max-sm:px-1 px-3 py-2"
            >
              Customer service
            </Link>
          </li>
          <li className="hover:bg-white hover:text-black max-sm:px-2 rounded-md">
            <Link
              to="categories"
              className="hover:border-b-[2px] border-slate-950 max-sm:px-1 px-3 py-2"
            >
              Categories
            </Link>
          </li>

          {/* this link tag based on the authentication of the user, if he authenticated then show logout button else show sign in */}
          {!is_auth ? (
            <li className="hover:bg-white hover:text-black  max-sm:px-2 rounded-md">
              <Link
                className="hover:border-b-[2px] border-slate-950  max-sm:px-1 px-3 py-2"
                to="/login"
              >
                Sign in
              </Link>
            </li>
          ) : (
            <button onClick={HandleLogout}>Logout</button>
          )}
        </ul>
      </header>
    </>
  );
}
export default Header;
