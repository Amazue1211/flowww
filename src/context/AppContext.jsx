import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Global axios interceptors to toggle loading state
    const reqId = axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    });

    const resId = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(reqId);
      axios.interceptors.response.eject(resId);
    };
  }, []);
  const getUserData = async () => {
    try {
      // include credentials so cookie-based auth works
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    loading,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
