import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { MaterialCommunityIcons } from "expo-vector-icons";
import Loader from "../components/Loader";

const PAGE_SIZE = 5;

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://missingdata.pythonanywhere.com/timeline?page=${page}&size=${PAGE_SIZE}`,
        {
          headers: {
            "X-Jwt-Token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwiZXhwIjoxNjgwODk1MjIxfQ.4bpS0IfzxPOXg66wSjwEpf5UqeDGnQ3uR1wPtwKiPhc",
          },
        }
      );
      const data = response.data;
      setIsLoading(false);
      if (data.timeline.length === 0) {
        setIsLastPage(true);
        return;
      }
      setTweets((prevUsers) => [...prevUsers, ...data.timeline]);
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
        <Text style={styles.content}>{item.user.username}</Text>
        <Text style={styles.username}>{item.content}</Text>
        <Text style={styles.content}>
          {moment(item.published).format("dd mm yy")}
        </Text>
      </View>
      <TouchableOpacity style={styles.heartButton}>
        <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return console.log(error);
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
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
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    color: "#666666",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
