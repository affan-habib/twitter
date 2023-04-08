import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import Tweet from "./Tweet";

const MyTweets = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="/my-tweets"
        dataKey="my_tweets"
        renderKeys={["user.username", "content"]}
      />
      <Tweet />
    </View>
  );
};

export default MyTweets;
