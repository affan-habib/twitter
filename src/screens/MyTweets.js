import React from "react";
import { StyleSheet, View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";

const MyTweets = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="/my-tweets"
        dataKey="my_tweets"
        renderKeys={["user.username", "content", "published"]}
        additionalStyles={additionalStyles}
      />
    </View>
  );
};

const additionalStyles = StyleSheet.create({
  published: {
    fontSize: 12,
    color: "green",
  },
});

export default MyTweets;
