import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/users/register`,
        {
          username,
          password,
        }
      );

      Cookies.set("token", response.data.token);
      setIsLoggedIn(true);

      setError(null);
      setIsLoading(false);

      const homeRoute = "/";
      navigate(homeRoute);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-40 bg-darkBlack">
      <div className="bg-lightBlack p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Register
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 w-96">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 text-white w-96">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border rounded px-3 py-2 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1 text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border rounded px-3 py-2 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="w-full flex justify-center">
              <CircularProgress color="warning" />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-accentText hover:bg-yellow-600 mt-4 text-white font-bold py-2 px-4 rounded w-full"
              disabled={isLoading}
            >
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
