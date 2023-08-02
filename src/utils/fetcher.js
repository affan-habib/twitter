import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://missingdata.pythonanywhere.com";

const fetcher = (endpoint, method = "GET", data = null) => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(responseData, isLoading);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        const config = {
          headers: {
            "X-Jwt-Token":
              token
          },
        };
        let response;
        if (method === "GET") {
          response = await axios.get(`${API_BASE_URL}/${endpoint}`, config);
        } else {
          response = await axios.post(
            `${API_BASE_URL}/${endpoint}`,
            data,
            config
          );
        }
        setResponseData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint, method, data]);

  return { responseData, isLoading, error };
};

export default fetcher;
