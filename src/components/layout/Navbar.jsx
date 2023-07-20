import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
    const homeRoute = "/";
    navigate(homeRoute);
  };

  return (
    <nav className="bg-darkBlack py-4 fixed top-0 left-0 w-full z-10 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          FlixFlex
        </Link>
        <SearchBar />

        {/* Mobile Menu */}
        <div className="md:hidden">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            <MenuIcon />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-0 w-full bg-darkBlack">
              <ul className="flex flex-col items-center space-y-4">
                <li>
                  <NavLink
                    to="/"
                    exact={true}
                    className={({ isActive }) =>
                      isActive ? "text-accentText font-bold" : "text-lightText"
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Series
                  </NavLink>
                </li>
                <li>
                  {isLoggedIn ? (
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) =>
                        isActive
                          ? "text-accentText font-bold"
                          : "text-lightText"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Favorites
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/login"
                      className="text-lightText hover:text-accentText"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log In
                    </NavLink>
                  )}
                </li>
                {!isLoggedIn && (
                  <li>
                    <NavLink
                      to="/register"
                      className="text-accentText hover:bg-yellow-600 hover:text-white py-2 px-4 rounded-md text-lg font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-lightText hover:text-accentText"
                    >
                      <LogoutIcon />
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
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
          <li>
            {isLoggedIn ? (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "text-accentText font-bold" : "text-lightText"
                }
              >
                Favorites
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="text-lightText hover:text-accentText"
              >
                Log In
              </NavLink>
            )}
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/register"
                className="text-accentText hover:bg-yellow-600 hover:text-white py-2 px-4 rounded-md text-lg font-semibold"
              >
                Register
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="text-lightText hover:text-accentText"
              >
                <LogoutIcon />
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
