import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "../../app/store";
import { isAuthenticated, logout } from "../../features/Auth/AuthSlice";
import { useState } from "react";
import DvrIcon from "@mui/icons-material/Dvr";

function Header() {
  const [query, setQuery] = useState("");

  const is_auth = useSelector(isAuthenticated);
  const linkTo = query !== "" ? `/search/${query}` : "/";
  return (
    <>
      <header className="bg-slate-900 text-white w-screen fixed right-0 top-0 z-20 flex justify-around py-4 max-sm:flex-col max-sm:gap-2">
        <ul className="flex justify-center gap-10 max-sm:text-xs max-sm:gap-1 ml-10">
          <li className="hover:text-black rounded-md h-auto grid pt-1">
            <Link className=" border-slate-950 max-sm:px-1 px-3">
              <img
                className="w-8 rounded-md relative bg-white"
                src="https://saad-store.vercel.app/public/EcomLogo.svg"
                alt="Logo"
              />
            </Link>
          </li>

          <li className="hover:bg-white hover:text-black max-sm:px-2 rounded-md py-2">
            <Link
              to={is_auth ? "/orders" : "/login"}
              className=" border-slate-950 max-sm:px-1 px-3 py-2"
              
            >
              Orders
            </Link>
          </li>

          <li className="hover:bg-white hover:text-black max-sm:px-2 rounded-md py-2">
            <Link
              to="categories"
              className=" border-slate-950 max-sm:px-1 px-3 py-2"
            >
              Categories
            </Link>
          </li>

          {/* this link tag based on the authentication of the user, if he authenticated then show logout button else show sign in */}
          {!is_auth && (
            <li className="hover:bg-white hover:text-black max-sm:px-2 rounded-md py-2">
              <Link
                className="border-slate-950  max-sm:px-1 px-3 py-2"
                to="/login"
              >
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </header>
      <div className="relative flex justify-end gap-1 mt-12">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent rounded-lg max-sm:h-7"
          name="search"
          id="search"
          placeholder="Search"
        />
        <Link to={linkTo}>
          <i className="fa-solid fa-magnifying-glass relative top-3"></i>
        </Link>
      </div>
    </>
  );
}
export default Header;
