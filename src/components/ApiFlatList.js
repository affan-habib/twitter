import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image } from "react-native";
import axios from "axios";
import Loader from "./Loader";
import ReactOnPost from "./ReactOnPost";
import FollowUser from "./FollowUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import globalStyles from "../styles/globalStyles";
import FadeIn from "./FadeIn";

const PAGE_SIZE = 10;

const ApiFlatList = ({
  endpoint,
  dataKey,
  renderKeys,
  additionalStyles = {},
}) => {
  const styles = { ...globalStyles, ...additionalStyles };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://missingdata.pythonanywhere.com/${endpoint}?page=${page}&size=${PAGE_SIZE}`,
        {
          headers: {
            "X-Jwt-Token": token,
          },
        }
      );
      const responseData = response.data[dataKey];
      // console.log(responseData);
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
    <View style={styles.container}>
      <Image source={require("../assets/twitter.png")} style={styles.avatar} />
      <View style={styles.card}>
        <FadeIn>
          {renderKeys.map((key) => {
            // Access nested object using dot notation
            let value = key.includes(".")
              ? item[key.split(".")[0]][key.split(".")[1]]
              : item[key];

            // Format join_date key
            if (key === "join_date") {
              const formattedValue = moment(value).format("DD MMM YY");
              value = `Member since ${formattedValue}`;
            }
            if (key === "posted" || key === "published") {
              const formattedValue = moment(value).format("DD MMM YY hh:mma");
              value = `Updated at ${formattedValue}`;
            }
            return (
              <Text
                style={key === "user.username" ? styles.username : styles[key]}
                key={key}
              >
                {value}
              </Text>
            );
          })}
        </FadeIn>
      </View>
      {endpoint === "timeline" && <ReactOnPost />}
      {endpoint === "users" && <FollowUser id={item.id} />}
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
    <View>
      {!!data.length && !isLoading && (
        <Text style={styles.dataLength}>{data.length} Results found</Text>
      )}
      {data.length === 0 && !isLoading && (
        <Text style={styles.noData}>No Results found</Text>
      )}
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

export default ApiFlatList;
