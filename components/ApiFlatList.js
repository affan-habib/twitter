import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import Loader from "./Loader";

const PAGE_SIZE = 10;

const ApiFlatList = ({ endpoint, dataKey, renderKeys, additionalStyles }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://missingdata.pythonanywhere.com/${endpoint}?page=${page}&size=${PAGE_SIZE}`,
        {
          headers: {
            "X-Jwt-Token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzIiwiZXhwIjoxNjgwODk5MDkyfQ.jGgwpzRe7kcMsOFsvANW_DM1a5FCqIcRTAcCktjRxcc",
          },
        }
      );
      const responseData = response.data[dataKey];
      console.log(responseData);
      setIsLoading(false);
      if (responseData.length === 0) {
        setIsLastPage(true);
        return;
      }
      setData((prevData) => [...prevData, ...responseData]);
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
      {renderKeys.map((key) => {
        // Access nested object using dot notation
        const value = key.includes(".")
          ? item[key.split(".")[0]][key.split(".")[1]]
          : item[key];

        return <Text key={key}>{value}</Text>;
      })}
    </View>
  );

  const renderFooter = () => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return (
        <View style={styles.footer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
  card: {
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ApiFlatList;
