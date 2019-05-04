import React, { Component } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import HTML from "react-native-render-html";
import axios from "axios";
import { connect } from "react-redux";
import { getTerms } from "../actions";
import MyColors from "../config/colors";
import ServerIp from "../config/server";

class TermsConditions extends Component {
  static navigationOptions = {
    title: "Terms and Conditions",
    headerStyle: {
      backgroundColor: `${MyColors.PRIMARY}`
    },
    headerTitleStyle: {
      color: "#FFF",
      fontWeight: "200"
    },
    headerTintColor: "#FFF"
  };
  constructor(props) {
    super(props);
    axios.defaults.baseURL = ServerIp;
  }
  componentDidMount() {
    axios
      .get("http://192.168.1.68:3000/api/terms-conditions")
      .then(response => {
        this.props.getTerms(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <HTML html={this.props.terms.termsConditions.t_and_c} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16
  }
});

const mapStateToProps = state => ({
  terms: state.terms
});

export default connect(
  mapStateToProps,
  { getTerms }
)(TermsConditions);
