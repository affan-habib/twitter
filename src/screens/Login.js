import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import authStyles from "../styles/authStyles";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
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
        "https://missingdata.pythonanywhere.com/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log(response.data);
      login(response.data.token);
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password. Please try again.");
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
              email: "affan.eatl@gmail.com",
              password: "12345678",
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
                      touched.email && errors.email ? styles.inputError : null,
                    ]}
                    placeholder="Email or username"
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
