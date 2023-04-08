import React from "react";
import AuthProvider from "./src/context/AuthContext";
import GuestStackNavigator from "./src/navigations/GuestNavigator";

const App = () => {
  return (
    <AuthProvider>
      <GuestStackNavigator />
    </AuthProvider>
  );
};

export default App;
