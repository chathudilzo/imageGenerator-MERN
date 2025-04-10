import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../providers/UserProvider";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const LoginRegisterPopup = ({ setShowPopup }) => {
  const { setUser } = useUser();
  const { setToken } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(serverUrl);
    const endpoint = isLogin
      ? `${serverUrl}/api/auth/login`
      : `${serverUrl}/api/auth/register`;

    try {
      const res = await axios.post(endpoint, formData);

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      setUser(user);
      setToken(token);
      setShowPopup(false);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed top-20 left-0 w-full flex items-center justify-center bg-black/50 z-50 p-6">
      <div className="bg-[#1a1c24] rounded-2xl shadow-2xl p-8 w-full max-w-md text-white border border-[#2a2c36]">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-widest text-gradient">
          {isLogin ? "Login" : "Register"}
        </h2>
        <div className="flex justify-center gap-4 mb-6 bg-[#10111A] p-2 w-fit mx-auto rounded-full shadow-inner">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-gradient-to-r from-teal-500 to bg-emerald-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              className="w-full p-3 border rounded-lg bg-[#0f1015] border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            ></input>
          )}
          <input
            className="w-full p-3 border rounded-lg bg-[#0f1015] border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          ></input>
          <input
            className="w-full p-3 border rounded-lg bg-[#0f1015] border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          ></input>

          <button
            type="submit"
            className=" w-full py-3 mt-2 rounded-lg text-white font-bold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition duration-300 "
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center ">
          <button
            className="text-gray-500 hover:text-white text-sm underline transition"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
