import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import BannerComp from "../banners/success";
import BaseEndUrl from "../../../config/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  // this function will pass to the component to disappear the banner
  const OnBannerClose = () => {
    setError(false);
  };

  // we will use axios here to send the http request to the server with credentails for authentication

  const HandleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await Axios.post(
        `${BaseEndUrl}accounts/login/`,
        data
      );
      console.log(response.data);

      if (response.status === 200) {
        // here we will store the data in the authSlice using dispatch

        dispatch(login(response.data));

        setEmail(""); // after user logins in reset the email,password
        setPassword("");
        navigate("/");
      } else if (response.status === 400) {
        alert("hii");
      }
    } catch (error) {
      console.log("An error occured", error);
      if (error.response.status && error.response.status === 404) {
        setError(true);
      }
    }
  };

  return (
    <>
      {error && (
        <BannerComp
          content="User with the credentails doesn't exist"
          border="border-red-500"
          textcolor="text-red-600"
          bgcolor="bg-red-100"
          onClose={OnBannerClose}
        />
      )}
      <div className=" h-screen grid bg-gradient-to-t bg-image-login opacity-1">
        <form
          onSubmit={HandleSubmitForm}
          className="flex flex-col gap-10 justify-center"
        >
          <div className="flex flex-col gap-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-96 mr-auto ml-auto bg-transparent text-white text-center outline-none pb-4 border-b max-sm:w-72 rounded-lg"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-96 mr-auto ml-auto outline-none bg-transparent text-center text-white pb-4 border-b  max-sm:w-72 rounded-lg"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-slate-800 w-32 mr-auto ml-auto px-5 py-3 rounded-2xl font-extrabold hover:bg-slate-500"
          >
            Login
          </button>
          <div className="flex flex-col w-fit ml-auto mr-auto gap-2">
            <p className="text-white font-light text-xl leading-10">
              Don't have an account ?{" "}
              <Link
                to="/register"
                className="rounded-lg text-gray-300 w-fit ml-auto mr-auto font-semibold"
              >
                Create
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
