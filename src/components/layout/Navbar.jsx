import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
    const homeRoute = "/";
    navigate(homeRoute);
  };

  return (
    <nav className="bg-darkBlack py-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          FlixFlex
        </Link>
        <SearchBar />

        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              exact={true}
              className={({ isActive }) =>
                isActive ? "text-accentText font-bold" : "text-lightText"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? "text-accentText font-bold" : "text-lightText"
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/series"
              className={({ isActive }) =>
                isActive ? "text-accentText font-bold" : "text-lightText"
              }
            >
              Series
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "text-accentText font-bold" : "text-lightText"
                }
              >
                Favorites
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-lightText hover:text-accentText ml-4"
              >
                <LogoutIcon />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lightText hover:text-accentText mr-4"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-accentText hover:bg-yellow-600 hover:text-white py-2 px-4 rounded-md text-lg font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
