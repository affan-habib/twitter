import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import authStyles from "../styles/authStyles";
import { setAuthCookies } from "../helpers/AuthUtils";

const LoginSchema = yup.object().shape({
  phone_number: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
});

const Login = ({ navigation }) => {
  const styles = authStyles;
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://18.142.158.4:5001/api/v1/core/user/login",
        {
          phone_number: values.phone_number,
          password: values.password,
        }
      );
      console.log(response.data.data)
      login(response.data.data); 
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid phone number or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Image
            style={styles.logo}
            source={require("../assets/twitter.png")}
          />
          <Text style={styles.title}>Log in to your account</Text>
          {errorMessage !== "" && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}
          <Formik
            initialValues={{
              phone_number: "01111111111",
              password: "12345",
            }}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={LoginSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.phone_number && errors.phone_number
                        ? styles.inputError
                        : null,
                    ]}
                    placeholder="Phone number"
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    keyboardType="phone-pad"
                  />
                  {touched.phone_number && errors.phone_number ? (
                    <Text style={styles.errorText}>{errors.phone_number}</Text>
                  ) : null}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.password && errors.password
                        ? styles.inputError
                        : null,
                    ]}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupButtonText}>
              Don't have an account?{" "}
              <Text style={styles.signupButton}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Login;
