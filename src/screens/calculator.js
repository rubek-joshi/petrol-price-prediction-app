import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import MyColors from '../config/colors';
import Header from '../components/header';

class Calculator extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="md-calculator" size={24} color={MyColors.MAIN_TAB_MENU} />
    }
    constructor(props) {
        super(props);
        this.state={
            paymentType: 'Litre',
            userInput: '',
            currentRate: 108,
            totalAmount: 0
        }
        this.displayCalcInput = this.displayCalcInput.bind(this);
        this.calculateAmount = this.calculateAmount.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
    }

    calculateAmount(litreBasis, value){
        this.setState({userInput: value}, () => {
            let userInput = this.state.userInput;
            const currentRate = this.state.currentRate;
            //handling empty input
            if(!userInput){
                userInput = '0';
            }
            if(litreBasis){
                const calculated = currentRate * parseInt(userInput, 10);
                this.setState({totalAmount: calculated});
            } else {
                const calculated = parseInt(userInput, 10) / currentRate;
                this.setState({totalAmount: Number((calculated).toFixed(2))});
            }
        });
    }

    displayCalcInput(){
        if(this.state.paymentType == 'Litre'){
            return (
                <View style={styles.userInputArea}>
                    <TextInput value={this.state.userInput}
                    onChangeText={(value) => this.calculateAmount(true, value)}
                    style={styles.textBox}
                    keyboardType='numeric'
                    placeholder='Enter value'/>
                    <Text style={{marginLeft: 16}}>litre(s)</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.userInputArea}>
                    <Text style={{marginRight: 16}}>Nrs.</Text>
                    <TextInput value={this.state.userInput}
                    onChangeText={(value) => this.calculateAmount(false, value)}
                    style={styles.textBox}
                    keyboardType='numeric'
                    placeholder='Enter value'/>
                </View>
            );
        }
    }

    handleDropDown(type){
        const value = this.state.userInput;
        this.setState({paymentType: type}, () => {
            if(this.state.paymentType == 'Litre'){
                this.calculateAmount(true, value);
            } else {
                this.calculateAmount(false, value);
            } 
        });
    }

    render(){
        return (
            <View flex={1}>
                <Header heading='Petrol Calculator'/>
                <View style={styles.mainContainer}>
                    
                    <View>
                        <Text>Current Rate: <Text style={{fontWeight: '500'}}>Nrs. {this.state.currentRate}</Text></Text>
                    </View>

                    <View style={[styles.box, {paddingHorizontal: 16}]}>
                        <Dropdown label='Select method'
                        data={paymentTypeData}
                        value={this.state.paymentType}
                        onChangeText={(value) => this.handleDropDown(value)}/>
                        
                        {this.displayCalcInput()}

                    </View>
                    
                    <View style={[styles.box, styles.totalContainer]}>
                        <Text style={{padding: 16}}>Total Amount: </Text>
                        <View style={{
                                borderBottomColor: '#d9dce0',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.result}>{this.state.totalAmount}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const paymentTypeData = [
    { value: 'Litre', label: 'Pay Per Litre'},
    { value: 'Amount', label: 'Pay By Amount'}
]

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16
    },
    textBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#d9dce0',
        paddingLeft: 16
    },
    userInputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16
    },
    result: {
        fontSize: 50,
        fontWeight: '400'
    },
    box: {
        borderRadius: 3,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 8
    },
    totalContainer: {
        height: 200,
    }
});

export default Calculator;