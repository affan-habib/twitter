import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Following from "./Following";
import { ScrollView } from "react-native";
import Followers from "./Followers";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("following");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "following" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("following")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "following" && styles.activeTabText,
            ]}
          >
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "followers" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("followers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "followers" && styles.activeTabText,
            ]}
          >
            Followers
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "followers" && (
        <View style={{ flex: 1 }}>
          <Followers />
        </View>
      )}
      {activeTab === "following" && (
        <View style={{ flex: 1 }}>
          <Following />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  activeTabButton: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#1DA1F2",
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  activeTabText: {
    color: "#1DA1F2",
  },
  tabContent: {
    width: 400,
    height: 10000,
  },
});

export default Profile;
