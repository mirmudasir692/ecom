import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isAuthenticated, user } from "../../features/Auth/AuthSlice";
import DvrIcon from "@mui/icons-material/Dvr";

function SideBar() {
  const isAuth = useSelector(isAuthenticated);
  
  // get the user from the auth slice
  const current_user = useSelector(user);
  const [sidebarvisible, setSidebarvisible] = useState(false); // for toggling the sidebar visibility

  return (
    <div>
      {!sidebarvisible && (
        <button
          onClick={() => setSidebarvisible(true)}
          className=" z-20 px-5 text-2xl fixed top-3 left-0 text-white"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}

      <aside
        className={`flex h-screen w-64 flex-col overflow-y-auto border-r bg-slate-900 px-5 py-8 fixed left-0 } z-20 max-sm:top-0 top-0`}
        style={{ display: sidebarvisible ? "block" : "none" }}
      >
        {/* 
            if here user can set display of sidebar to none
            */}

        <button
          className="text-white relative left-28 bottom-8 text-2xl"
          onClick={() => setSidebarvisible(false)}
        >
          {" "}
          <span>
            <i class="fa-solid fa-xmark"></i>
          </span>
        </button>
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <Link
                to={isAuth ? "/cart_list" : "/login"}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                onClick={()=>setSidebarvisible(false)}
                href="#"
              >
                <span>
                  <i class="fa-solid fa-cart-plus"></i>
                </span>
                <span className="mx-2 text-sm font-medium">My Cart</span>
              </Link>
              <Link
                to={isAuth ? "/wishlist" : "/login"}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={()=>setSidebarvisible(false)}
              >
                <span className="text-lg">
                  <i className="fa-regular fa-heart"></i>
                </span>
                <span className="mx-2 text-sm font-medium">Wish List</span>
              </Link>
            </div>
            <div className="space-y-3 ">
              <Link
                to={isAuth ? "/customer_service" : "/login"}
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={()=>setSidebarvisible(false)}

              >
                <span className="text-md">
                <i className="fa-solid fa-headphones"></i>
                </span>
                <span className="mx-2 text-sm font-medium">Customer Support</span>
              </Link>
            {isAuth &&   <Link
                to="/profile"
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={()=>setSidebarvisible(false)}
              >
               <span><i className="fa-solid fa-user"></i></span>
                <span className="mx-2 text-sm font-medium">My Profile</span>
              </Link>}
            </div>
            <div className="space-y-3 ">
              {isAuth ? (
                current_user && current_user.is_partner ? (
                  <Link
                    to="/partner/shop/"
                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                    onClick={()=>setSidebarvisible(false)}
                    >
                    <span>
                      <i class="fa-solid fa-shop"></i>
                    </span>
                    <span className="mx-2 text-sm font-medium">Your Shop</span>

                  </Link>
                ) : (
                  <Link
                    to="partner/partner_intro"
                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                    onClick={()=>setSidebarvisible(false)}
                    >
                    <span>
                      <i class="fa-regular fa-handshake"></i>
                    </span>
                    <span className="mx-2 text-sm font-medium">
                      Start Selling
                    </span>
                  </Link>
                )
              ) : null}

             
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
export default SideBar;
