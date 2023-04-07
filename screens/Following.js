import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import fetcher from "../utils/fetcher";
import Loader from "../components/Loader";
import moment from "moment/moment";

const Following = () => {
  const { responseData, isLoading, error } = fetcher(
    `following?page=${1}&size=${10}`
  );

  const [search, setSearch] = useState("");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.avatar} source={require("../assets/twitter.png")} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.active}>
          Active Status : {item.active ? "Active" : "Inactive"}
        </Text>
        <Text style={styles.join_date}>
          Member Since : {moment(item.join_date).format("DD MMM YYYY")}
        </Text>
      </View>
    </View>
  );

  const filteredUsers = responseData?.followings?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {!!responseData?.followings ? (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search users"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
          />
        </View>
      ) : (
        <View style={styles.nofollower}>
          <Text style={styles.nofollowerText}>No Followings found</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
    color: "#666",
  },
  join_date: {
    fontSize: 14,
    color: "#007bff",
  },
  active: {
    fontSize: 14,
    color: "green",
  },
  loader: {
    marginTop: 50,
  },
  nofollower: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
  nofollowerText: {
    fontSize: 16,
  },
});

export default Following;
