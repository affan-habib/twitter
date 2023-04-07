import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="followers"
        dataKey="followers"
        renderKeys={["id"]}
      />
    </View>
  );
};

export default Home;
