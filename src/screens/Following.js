import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import { StyleSheet } from "react-native";

const Following = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="following"
        dataKey="followings"
        renderKeys={["username", "join_date"]}
        additionalStyles={additionalStyles}
      />
    </View>
  );
};
const additionalStyles = StyleSheet.create({


});
export default Following;
