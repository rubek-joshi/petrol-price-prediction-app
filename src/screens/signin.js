import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  Image,
  ToastAndroid
} from "react-native";
import { CheckBox } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { TextField } from "react-native-material-textfield";
import AnimateLoadingButton from "react-native-animate-loading-button";
import axios from "axios";
import { ServerIp } from "../config/server";
import { saveToken, saveUser } from "../actions";
import { connect } from "react-redux";

class SignIn extends Component {
  constructor(props) {
    super(props);
    axios.defaults.baseURL = ServerIp;
    this.state = {
      email: "",
      password: "",
      stayLoggedIn: true
    };
    this._onPressHandler = this._onPressHandler.bind(this);
  }
  _onPressHandler() {
    Keyboard.dismiss();
    this.loadingButton.showLoading(true);
    axios
      .post("/api/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        if (this.state.stayLoggedIn) {
          this.props.saveToken(response.data.token);
        }
        this.props.saveUser(response.data.user_id, response.data.full_name);
        ToastAndroid.show("Login successful", ToastAndroid.SHORT);
        this.props.navigation.navigate("App");
      })
      .catch(error => {
        console.log(error);
        this.loadingButton.showLoading(false);
        ToastAndroid.show("Login failed", ToastAndroid.LONG);
      });
  }
  render() {
    return (
      <LinearGradient
        colors={["#44A59B", "#15DBA5"]}
        style={styles.mainContainer}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={{ height: 200, width: 200 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <TextField
              textColor={"#FFF"}
              baseColor={"#FFF"}
              tintColor={"#FFF"}
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email: email })}
              autoCapitalize="none"
              returnKeyType={"next"}
              onSubmitEditing={() => this.passwordTextInput.focus()}
              blurOnSubmit={false}
            />

            <TextField
              textColor={"#FFF"}
              baseColor={"#FFF"}
              tintColor={"#FFF"}
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password: password })}
              autoCapitalize="none"
              ref={input => {
                this.passwordTextInput = input;
              }}
              returnKeyType={"next"}
              onSubmitEditing={() => this._onPressHandler()}
              blurOnSubmit={false}
              secureTextEntry={true}
            />

            <View style={{ flexDirection: "row" }}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <CheckBox
                  title="Keep me logged out"
                  checkedTitle="Keep me logged in"
                  checked={this.state.stayLoggedIn}
                  onPress={() =>
                    this.setState({ stayLoggedIn: !this.state.stayLoggedIn })
                  }
                  containerStyle={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                    borderWidth: 0
                  }}
                  textStyle={{ color: "#fff", fontWeight: "normal" }}
                  checkedColor="#fff"
                  uncheckedColor="#fff"
                />
              </View>
              <TouchableOpacity
                style={{ paddingVertical: 8 }}
                onPress={() => this.props.navigation.navigate("Password")}
              >
                <Text
                  style={{ color: "#FFF", textDecorationLine: "underline" }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <AnimateLoadingButton
            ref={c => (this.loadingButton = c)}
            width={260}
            height={50}
            title="Sign In"
            titleFontSize={16}
            titleColor="#FFF"
            backgroundColor="#34485C"
            borderRadius={4}
            onPress={this._onPressHandler}
          />

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.skipArea}
              onPress={() => this.props.navigation.navigate("App")}
            >
              <Text style={{ color: "#FFF" }}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.newUserClickArea}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "#FFF" }}>
              New User? Click here to sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16
  },
  skipArea: {
    width: 80,
    height: 50,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  newUserClickArea: {
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  logoContainer: {
    alignItems: "center"
  }
});

export default connect(
  null,
  { saveToken, saveUser }
)(SignIn);
