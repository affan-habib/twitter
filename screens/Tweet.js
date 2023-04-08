import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const Tweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleTweet = async () => {
    try {
      const response = await axios.post(
        `https://missingdata.pythonanywhere.com/tweet`,
        { content: tweetText },
        {
          headers: {
            "X-Jwt-Token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwiZXhwIjoxNjgwOTQyNDcyfQ.Qe51X7WmWP3jo_RY1x8fNM2kUoBaFSd-yhfcIw5c0p8",
          },
        }
      );
      setTweetText("");
      setShowInput(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    console.log("Tweet posted:", tweetText);
    // // Clear the tweet input and hide it
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setShowInput(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {showInput ? (
          <View style={styles.tweetInputContainer}>
            <TextInput
              style={styles.tweetInput}
              value={tweetText}
              onChangeText={setTweetText}
              placeholder="What's happening?"
              multiline={true}
            />
            <TouchableOpacity style={styles.tweetButton} onPress={handleTweet}>
              <Text style={styles.tweetButtonText}>Tweet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setShowInput(true)}
          >
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fa",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#1da1f2",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  tweetInputContainer: {
    bottom: 16,
    left: 16,
    // right: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    elevation: 8,
    width: 400,
  },
  tweetInput: {
    height: 100,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  tweetButton: {
    backgroundColor: "#1da1f2",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tweetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Tweet;
