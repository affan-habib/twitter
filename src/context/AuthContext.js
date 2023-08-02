// AuthContext.js

import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated when the app starts/restarts
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");

      if (accessToken) {
        const storedRole = await AsyncStorage.getItem("role");
        const storedUserData = await AsyncStorage.getItem("user_data");

        setIsAuthenticated(true);
        setRole(storedRole);
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error checking authentication state:", error);
    }
  };

  const login = async (response) => {
    const { access_token, refresh_token, user_data, expires_in } = response;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expires_in * 60 * 1000);
    try {
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      await AsyncStorage.setItem("user_data", JSON.stringify(user_data));
      await AsyncStorage.setItem("role", String(user_data.account_type));

      setIsAuthenticated(true);
      setRole(String(user_data.account_type));
      setUserData(user_data);
    } catch (error) {
      console.error("Error setting auth cookies:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      await AsyncStorage.removeItem("user_data");
      await AsyncStorage.removeItem("role");

      setIsAuthenticated(false);
      setRole(null);
      setUserData(null);
    } catch (error) {
      console.error("Error removing auth cookies:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
