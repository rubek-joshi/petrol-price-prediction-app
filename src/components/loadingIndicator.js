import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import MyColors from "../config/colors";

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator
          size="large"
          color={MyColors.PRIMARY}
          animating={this.props.load}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center"
  }
});
