import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers((prevUsers) => [...prevUsers, ...response.data.data]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.avatar} source={{ uri: item.avatar }} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
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

export default UsersList;
