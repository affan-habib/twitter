import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { userData } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello {userData.fullname}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    fontSize: 14,
  }
});

export default Home;
