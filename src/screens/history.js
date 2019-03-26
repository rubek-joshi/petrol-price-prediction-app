import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {ServerIp} from '../config/server';
import MyColors from '../config/colors';

axios.defaults.baseURL = ServerIp;
class History extends Component {
    static navigationOptions = {
        title: 'History',
        headerStyle: {
            backgroundColor: `${MyColors.PRIMARY}`
        },
        headerTitleStyle: {
            color: '#FFF',
            fontWeight: '200'
        },
        headerTintColor: '#FFF' 
    }
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
        this.renderHistory = this.renderHistory.bind(this);
    }
    componentDidMount(){
        axios.get('/api/rates/history')
        .then((response) => {
            console.log(response.data);
            this.setState({history: response.data})
        })
        .catch((error) => {
            console.log(error);
        });
    }
    renderHistory(){
        return this.state.history.map((item, index, array) => {
            let status = 'dot-single';
            let statusColor = '#fff'
            if(!(index == array.length - 1)){
                const nextItem = array[index + 1];
                if(nextItem.petrol > item.petrol){
                    status = 'triangle-down';
                    statusColor = '#F60550';
                } else if (nextItem.petrol < item.petrol){
                    status = 'triangle-up';
                    statusColor = '#3FC52E';
                } else {
                    status = 'minus';
                    statusColor = '#A7B0B5';
                }
            }
            return (
                <View key={item.id} style={styles.tableContainer}>
                    <View style={styles.tableData}>
                        <Text>{item.date_published}</Text>
                    </View>
                    <View style={styles.tableData}>
                        <Text>{item.petrol}</Text>
                    </View>
                    <View style={styles.tableData}>
                        <Icon name={status} size={24} color={statusColor}/>
                    </View>
                </View>
            );
        });
    }
    render(){
        return (
            <View style={styles.mainContainer}>
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeaders}>
                        <Text>Date</Text>
                    </View>
                    <View style={styles.tableHeaders}>
                        <Text>Petrol</Text>
                    </View>
                    <View style={styles.tableHeaders}>
                        <Text>Status</Text>
                    </View>
                </View>
                <ScrollView>
                    {this.renderHistory()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    tableContainer: {
        flexDirection: 'row',
    },
    tableHeaders: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8
    },
    tableData: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    }
});

export default History;