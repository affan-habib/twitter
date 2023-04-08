import axios from "axios";
import { FontAwesome } from "expo-vector-icons";
import React, { useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const FollowUser = ({ id }) => {
  const [clicked, setClicked] = useState(true);
  const handlePress = async () => {
    const endpoint = clicked ? "follow" : "unfollow";
    try {
      const response = await axios.post(
        `https://missingdata.pythonanywhere.com/${endpoint}`,
        { user_id: id },
        {
          headers: {
            "X-Jwt-Token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwiZXhwIjoxNjgwOTQyNDcyfQ.Qe51X7WmWP3jo_RY1x8fNM2kUoBaFSd-yhfcIw5c0p8",
          },
        }
      );
      console.log(response.data);
      setClicked(!clicked);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={clicked ? styles.followButton : styles.unFollowButton}
    >
      <Text style={styles.followButtonText}>
        {clicked ? "Follow" : "Unfollow"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  followButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  unFollowButton: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 5,
  },
});

export default FollowUser;
