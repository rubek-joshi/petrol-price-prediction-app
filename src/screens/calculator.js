import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Header from "../components/header";
import Loading from "../components/loadingIndicator";

class Calculator extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-calculator" size={24} color={tintColor} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      paymentType: "Litre",
      userInput: "",
      totalAmount: 0
    };
    this.displayCalcInput = this.displayCalcInput.bind(this);
    this.calculateAmount = this.calculateAmount.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
  }

  calculateAmount(litreBasis, value) {
    this.setState({ userInput: value.replace(/[^0-9]/g, "") }, () => {
      let userInput = this.state.userInput;
      const currentRate = this.props.rates.latestRates.find(x => x.location == 'Kathmandu').petrol;
      //handling empty input
      if (!userInput) {
        userInput = "0";
      }
      if (litreBasis) {
        const calculated = currentRate * parseInt(userInput, 10);
        this.setState({ totalAmount: calculated });
      } else {
        const calculated = parseInt(userInput, 10) / currentRate;
        this.setState({ totalAmount: Number(calculated.toFixed(2)) });
      }
    });
  }

  displayCalcInput() {
    if (this.state.paymentType == "Litre") {
      return (
        <View style={styles.userInputArea}>
          <TextInput
            value={this.state.userInput}
            onChangeText={value => this.calculateAmount(true, value)}
            style={styles.textBox}
            keyboardType="numeric"
            placeholder="Enter value"
            maxLength={3}
          />
          <Text style={{ marginLeft: 16 }}>litre(s)</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.userInputArea}>
          <Text style={{ marginRight: 16 }}>Nrs.</Text>
          <TextInput
            value={this.state.userInput}
            onChangeText={value => this.calculateAmount(false, value)}
            style={styles.textBox}
            keyboardType="numeric"
            placeholder="Enter value"
            maxLength={7}
          />
        </View>
      );
    }
  }

  handleDropDown(type) {
    const value = this.state.userInput;
    this.setState({ paymentType: type }, () => {
      if (this.state.paymentType == "Litre") {
        this.calculateAmount(true, value);
      } else {
        this.calculateAmount(false, value);
      }
    });
  }

  render() {
    if (!this.props.rates.latestRates.length == 0) {
      return (
        <View flex={1}>
          <Header heading="Petrol Calculator" />
          <View style={styles.mainContainer}>
            <View>
              <Text>
                Current Rate:{" "}
                <Text style={{ fontWeight: "500" }}>
                  Nrs. {this.props.rates.latestRates.find(x => x.location == 'Kathmandu').petrol}
                </Text>
              </Text>
            </View>

            <View style={[styles.box, styles.totalContainer]}>
              <Text style={{ padding: 16 }}>Total Amount: </Text>
              <View
                style={{
                  borderBottomColor: "#949494",
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
              />
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 20, paddingTop: 20 }}>
                    {this.state.paymentType == "Litre" ? "NRs." : ""}
                  </Text>
                </View>
                <Text style={styles.result}>{this.state.totalAmount}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20, paddingTop: 20 }}>
                    {this.state.paymentType == "Amount" ? "litre(s)" : ""}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.box, { paddingHorizontal: 16 }]}>
              <Dropdown
                label="Select method"
                data={paymentTypeData}
                value={this.state.paymentType}
                textColor="#414141"
                onChangeText={value => this.handleDropDown(value)}
              />

              {this.displayCalcInput()}
            </View>
          </View>
        </View>
      );
    } else {
      return <Loading load={true} />;
    }
  }
}

const paymentTypeData = [
  { value: "Litre", label: "Pay Per Litre" },
  { value: "Amount", label: "Pay By Amount" }
];

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#d9dce0",
    paddingLeft: 16
  },
  userInputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16
  },
  result: {
    fontSize: 50,
    fontWeight: "400"
  },
  box: {
    borderRadius: 3,
    backgroundColor: "#FFF",
    elevation: 1,
    marginVertical: 8
  },
  totalContainer: {
    height: 200
  }
});

const mapStateToProps = state => ({
  rates: state.rates
});

export default connect(
  mapStateToProps,
  null
)(Calculator);
