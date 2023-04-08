import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

const SearchUser = ({ search, setSearch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  searchContainer: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  followButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 50,
  },
});

export default SearchUser;
