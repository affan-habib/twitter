import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DATA = [
  {
    id: "1",
    username: "JohnDoe",
    handle: "@johndoe",
    tweetText: "Just had the best pizza in town! 🍕 #yum #pizza #foodie",
    image: require("../assets/twitter.png"),
    likes: 23,
    retweets: 10,
  },
  {
    id: "2",
    username: "JaneDoe",
    handle: "@janedoe",
    tweetText: "Excited to start my new job at Google! 🚀 #newjob #excited",
    image: require("../assets/twitter.png"),
    likes: 32,
    retweets: 15,
  },
];

export default function HomePage({navigation}) {
  const [tweets, setTweets] = useState(DATA);
  const [modalVisible, setModalVisible] = useState(false);

  const logout = async () => {
    try {
      // Remove the jwtToken from AsyncStorage
      await AsyncStorage.removeItem("jwtToken");
      // Navigate to the login screen
      navigation.navigate("TwitterLoginScreen");
    } catch (e) {
      console.log("Error logging out:", e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.tweetImage} source={item.image} />
      </TouchableOpacity>
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.tweetUsername}>{item.username}</Text>
          <Text style={styles.tweetHandle}>{item.handle}</Text>
        </View>
        <Text style={styles.tweetText}>{item.tweetText}</Text>
        <View style={styles.tweetStats}>
          <Text style={styles.tweetStat}>{item.likes} Likes</Text>
          <Text style={styles.tweetStat}>{item.retweets} Retweets</Text>
        </View>
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tweetContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  tweetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  tweetUsername: {
    fontWeight: "bold",
    marginRight: 5,
  },
  tweetHandle: {
    color: "grey",
  },
  tweetText: {
    marginVertical: 5,
  },
  tweetStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tweetStat: {
    color: "grey",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logoutButton: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});
