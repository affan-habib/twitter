import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import Loader from "../components/Loader";

const PAGE_SIZE = 10;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://missingdata.pythonanywhere.com/users?page=${page}&size=${PAGE_SIZE}`,
        {
          headers: {
            "X-Jwt-Token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwiZXhwIjoxNjgwODk1MjIxfQ.4bpS0IfzxPOXg66wSjwEpf5UqeDGnQ3uR1wPtwKiPhc",
          },
        }
      );
      const data = response.data;
      setIsLoading(false);
      if (data.users.length === 0) {
        setIsLastPage(true);
        return;
      }
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    if (!isLastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.avatar} source={require("../assets/twitter.png")} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const renderFooter = () => {
    if (isLoading) {
      return <Text>Loading</Text>;
    } else if (error) {
      return console.log(error);
    } else {
      return null;
    }
  };

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
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    elevation: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666666",
  },
  followButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Users;
