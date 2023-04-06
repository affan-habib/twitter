import React from "react";
import AuthProvider from "./context/AuthContext";
import GuestStackNavigator from "./navigations/GuestNavigator";

const App = () => {
  return (
    <AuthProvider>
      <GuestStackNavigator />
    </AuthProvider>
  );
};

export default App;
