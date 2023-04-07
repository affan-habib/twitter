import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tweet from "./Tweet";
import fetcher from "../utils/fetcher";

const Home = () => {
  const { responseData, isLoading, error } = fetcher("timeline");

  return (
    <View style={styles.container}>
      {responseData?.timeline?.map((tweet) => (
        <View style={styles.tweetContainer} key={tweet.id}>
          <Image
            source={require("../assets/twitter.png")}
            style={styles.profileImage}
          />
          <View style={styles.tweetTextContainer}>
            <Text style={styles.username}>{tweet.user.username}</Text>
            <Text style={styles.tweetContent}>{tweet.content}</Text>
            <Text style={styles.published}>{tweet.published}</Text>
          </View>
          <TouchableOpacity style={styles.heartButton}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.floatingTweetContainer}>
        <Tweet />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  placeholderImage: {
    width: 300,
    height: 200,
  },
  tweetContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  tweetTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tweetContent: {
    fontSize: 14,
    marginVertical: 5,
  },
  published: {
    fontSize: 12,
    color: "gray",
  },
  heartButton: {
    marginLeft: "auto",
  },
  floatingTweetContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,

  },
});

export default Home;
