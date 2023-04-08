import { FontAwesome } from "expo-vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const ReactOnPost = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <TouchableOpacity onPress={() => setClicked(!clicked)}>
      <FontAwesome
        name={clicked ? "heart" : "heart-o"}
        size={24}
        color={clicked ? "#007bff" : "gray"}
        style={{ marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};

export default ReactOnPost;
