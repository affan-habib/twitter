import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import FollowUser from "./FollowUser";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchUser = ({ token, search, setSearch }) => {
  //   const [search, setSearch] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("token");
      setLoading(true);
      const response = await axios.post(
        "https://missingdata.pythonanywhere.com/search",
        { token: search },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Jwt-Token": jwtToken,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setUsers(data.search_results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      const delay = 500;
      const id = setTimeout(() => searchUsers(), delay);
      setTimerId(id);
    }
    return () => clearTimeout(timerId);
  }, [search]);

  const renderItem = ({ item }) => (
    <View style={styles.flatlist}>
      <Image source={require("../assets/twitter.png")} style={styles.avatar} />
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.email} style={styles.join_date}>
            Member Since {moment(item.join_date).format("dd mm yy")}
          </Text>
        </View>
      </View>
      <FollowUser />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            if (timerId) {
              clearTimeout(timerId);
            }
          }}
        />
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#007bff" />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    elevation: 1,
    // marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  flatlist: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  join_date: {
    color: "red",
  },
});
export default SearchUser;
