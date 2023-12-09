import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_USER_PROFILE } from "../../api/user/query";
import UpdateUser from "../../api/user/user";
import Spinner from "../banners/spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, logout } from "../../features/Auth/AuthSlice";


const UserProfile = () => {
  const [user, setUser] = useState("");
  const [modify, setModify] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [alt_mobile, setAlt_mobile] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  const HandleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (data) {
      setUser(data.getUserProfile);
      const {
        Name,
        email,
        country,
        state,
        city,
        mobile,
        gender,
        alternativeMobile,
      } = data.getUserProfile;
      setName(Name);
      setEmail(email);
      setMobile(mobile);
      setGender(gender);
      setAlt_mobile(alternativeMobile);
    }
    if (error) {
      console.log("an error occured", error);
    }
  }, [loading, data, error]);

  const HandleUserUpdate = async () => {
    setUploading(true);
    const response = await UpdateUser(
      user.id,
      name,
      gender,
      mobile,
      email,
      alt_mobile
    );
    if (response === 200) {
      setModify(false);
    }
    setUploading(false);
  };

  return (
    <div className="bg-gray-100 mt-20">
      {uploading || (loading && <Spinner />)}
      <div className="w-full text-white bg-main-color">
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="p-4 flex flex-row items-center justify-between">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline text-black"
            >
              {modify ? (
                <span className="text-red-500 font-extrabold">Edit </span>
              ) : (
                ""
              )}
              My profile
            </a>
            <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  x-show="!open"
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
                <path
                  x-show="open"
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Name</div>
                    {modify ? (
                      <input
                        type="text"
                        className="rounded-lg"
                        placeholder="Please Provide Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <div className="px-4 py-2">{name}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2">
                    {/* <div className="px-4 py-2">Female</div> */}
                    <div className="px-4 py-2 font-semibold">Gender</div>

                    {!modify && gender === "M" && (
                      <div className="px-4 py-2">Male</div>
                    )}
                    {user.gender === "F" && (
                      <div className="px-4 py-2">Female</div>
                    )}
                    {user.gender === "O" && (
                      <div className="px-4 py-2">Other</div>
                    )}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    {modify ? (
                      <input
                        type="tel"
                        className="rounded-lg"
                        name=""
                        id=""
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    ) : (
                      <div className="px-4 py-2">+91 {mobile}</div>
                    )}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Alternative Contact.
                    </div>
                    {modify ? (
                      <input
                        type="tel"
                        className="rounded-lg"
                        name=""
                        id=""
                        value={alt_mobile}
                        onChange={(e) => setAlt_mobile(e.target.value)}
                      />
                    ) : (
                      <div className="px-4 py-2">+91 {alt_mobile}</div>
                    )}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      {user.country}, {user.state},{user.city}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      {user.country}, {user.state},{user.city}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <span
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {modify ? (
                <button
                  onClick={HandleUserUpdate}
                  className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setModify(true)}
                  className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={HandleLogout}
                className="bg-green-200 py-1 px-5 font-bold rounded-lg hover:bg-green-600 hover:text-white"
              >
                Logout
              </button>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 shadow-sm rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
