import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAuthCookies = async (response) => {
  const { access_token, refresh_token, user_data, expires_in } = response;
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + expires_in * 60 * 1000);
  try {
    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("refresh_token", refresh_token);
    await AsyncStorage.setItem("user_data", JSON.stringify(user_data));
    await AsyncStorage.setItem("role", String(user_data.account_type));
  } catch (error) {
    console.error("Error setting auth cookies:", error);
  }
};

export const removeAuthCookies = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("user_data");
    await AsyncStorage.removeItem("role");
  } catch (error) {
    console.error("Error removing auth cookies:", error);
  }
};

export const getUserIdAndName = async () => {
  try {
    const userDataString = await AsyncStorage.getItem("user_data");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const { id, fullname } = userData;
      return { userId: id, fullName: fullname };
    }
  } catch (error) {
    console.error("Error getting user ID and name:", error);
  }
  return { userId: null, fullName: null };
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem("access_token");
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem("refresh_token");
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

export const getUserRole = async () => {
  try {
    const accountType = await AsyncStorage.getItem("role");
    return accountType ? parseInt(accountType, 10) : null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};
