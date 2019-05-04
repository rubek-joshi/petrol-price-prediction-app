import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { ServerIp } from "../config/server";
import colors from "../config/colors";

class Loading extends Component {
  constructor(props) {
    super(props);
    axios.defaults.baseURL = ServerIp;
  }
  componentDidMount() {
    if (!this.props.auth.token) {
      this.props.navigation.navigate("Auth");
    } else {
      console.log("Token detected:", this.props.auth.token);
      //make request to check token expired or not
      axios
        .post(
          "/api/users/check-token",
          {},
          {
            headers: {
              Authorization: this.props.auth.token
            }
          }
        )
        .then(response => {
          this.props.navigation.navigate("App");
        })
        .catch(error => {
          console.log(error);
          this.props.navigation.navigate("Auth");
        });
    }
    //check auth
    //this.props.navigation.navigate(this.props.auth.token ? 'App' : 'Auth'); //check token
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator
          size="large"
          color={colors.PRIMARY}
          animating={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Loading);
