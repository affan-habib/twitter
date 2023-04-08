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
        renderKeys={["user.username", "content"]}
        additionalStyles={additionalStyles}
      />
      {/* <Tweet /> */}
    </View>
  );
};
const additionalStyles = StyleSheet.create({
  content: {
    fontSize: 13,
  },
});

export default Home;
