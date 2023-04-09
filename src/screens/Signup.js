import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Loader from "../components/Loader";
import authStyles from "../styles/authStyles";

const SignupSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signup = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = authStyles;
  const handleSignup = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://missingdata.pythonanywhere.com/signup",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      setErrorMessage("There was an error signing up. Please try again.");
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
          <Text style={styles.title}>Create your account</Text>
          {errorMessage !== "" && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={(values) => handleSignup(values)}
            validationSchema={SignupSchema}
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
                      touched.username && errors.username
                        ? styles.inputError
                        : null,
                    ]}
                    placeholder="username"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {touched.username && errors.username ? (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  ) : null}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.email && errors.email ? styles.inputError : null,
                    ]}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
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
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupButtonText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Signup;
