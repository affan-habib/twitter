import React from "react";
import { StyleSheet, View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import Tweet from "./Tweet";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="timeline"
        dataKey="timeline"
        renderKeys={["user.username", "content", "posted"]}
        additionalStyles={additionalStyles}
      />
      <Tweet />
    </View>
  );
};
const additionalStyles = StyleSheet.create({
  content: {
    fontSize: 14,
  },
  posted: {
    fontSize: 12,
    color: "green",
  },
});

export default Home;
