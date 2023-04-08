import React, { useState } from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import { StyleSheet } from "react-native";
import SearchUser from "../components/SearchUser";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <SearchUser search={search} setSearch={setSearch} />
      {search.trim() == "" && (
        <MemoizedApiFlatList
          endpoint="users"
          dataKey="users"
          renderKeys={["username", "email", "join_date"]}
          additionalStyles={additionalStyles}
        />
      )}
    </View>
  );
};

const additionalStyles = StyleSheet.create({
  email: {
    fontSize: 13,
  },
  join_date: {
    color: "red",
  },
});

const MemoizedApiFlatList = React.memo(ApiFlatList);

export default Home;
