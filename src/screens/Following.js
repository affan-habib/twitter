import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="following"
        dataKey="followings"
        renderKeys={["id", "username", "join_date"]}
      />
    </View>
  );
};

export default Home;
