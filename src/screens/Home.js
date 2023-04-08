import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import Tweet from "./Tweet";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="timeline"
        dataKey="timeline"
        renderKeys={["user.username", "content"]}
      />
      {/* <Tweet /> */}
    </View>
  );
};

export default Home;
