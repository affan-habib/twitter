import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";

const MyTweets = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="/my-tweets"
        dataKey="my_tweets"
        renderKeys={["user.username", "content", "published"]}
      />
    </View>
  );
};

export default MyTweets;
