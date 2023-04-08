import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="timeline"
        dataKey="timeline"
        renderKeys={["user.username", "content"]}
      />
    </View>
  );
};

export default Home;
