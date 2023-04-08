import { FontAwesome } from "expo-vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const ReactOnPost = ({ id }) => {
  const [clicked, setClicked] = useState(true);
  return (
    <TouchableOpacity onPress={() => setClicked(!clicked)}>
      <FontAwesome
        name="heart-o"
        size={24}
        color="black"
        style={[{ color: clicked ? "red" : "gray", marginLeft : 10 }]}
      />
    </TouchableOpacity>
  );
};

export default ReactOnPost;
