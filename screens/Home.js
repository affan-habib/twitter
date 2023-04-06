import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const placeholderImage = require("../assets/twitter.png");

function renderItem({ item }) {
  const { content, user, published } = item;
  const timestamp = new Date(published).toLocaleString();

  return (
    <View style={styles.post}>
      <Image source={placeholderImage} style={styles.avatar} />
      <View style={styles.postContent}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.postText}>{content}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
}

export default function Home() {
  const token =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwiZXhwIjoxNjgwNzYzMTA0fQ.iqG7x_naQZBVPNVijREVetU2ztcPa1hG0MXxB-_Z9WM";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://missingdata.pythonanywhere.com/timeline", {
        headers: {
          "X-Jwt-Token": token,
        },
        params: {
          page,
        },
      })
      .then((response) => {
        const newData = response.data.timeline;
        console.log(newData); // Make sure data is correct

        // Update the data and the total count
        setData((prevData) => [...prevData, ...newData]);
        setTotalCount(response.data.count);
      })
      .catch((error) => {
        console.log(error); // Handle error
      });
  }, [page]);

  const handleEndReached = () => {
    if (data.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  post: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
  },
  postText: {
    marginTop: 5,
    marginBottom: 10,
  },
  timestamp: {
    color: "gray",
    fontSize: 12,
  },
});
