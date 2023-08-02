import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "expo-vector-icons";

const Tweet = () => {
  const [tweet, setTweet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `https://missingdata.pythonanywhere.com/tweet`,
        { content: tweet },
        {
          headers: {
            "X-Jwt-Token": token,
          },
        }
      );
      setTweet("");
      setModalVisible(false);
      console.log(response.data);
      Alert.alert("Tweet posted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="edit-2" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Post a Tweet</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            value={tweet}
            onChangeText={setTweet}
            maxLength={160}
            placeholder="What's happening?"
            multiline={true}
          />

          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#00D42A",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 80,
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: "#00D42A",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Tweet;
