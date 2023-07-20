import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  const [userFavorites, setUserFavorites] = useState({
    favoriteMoviesIds: [],
    favoriteSeriesIds: [],
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = Cookies.get("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_AUTH_API_BASE_URL}/users/favorites`,
          {},
          { headers }
        );

        setUserFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (isLoggedIn) {
      fetchFavorites();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userFavorites }}>
      {children}
    </AuthContext.Provider>
  );
}
