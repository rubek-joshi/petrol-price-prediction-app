import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {getComposition} from '../actions/index';
import {ServerIp} from '../config/server';
import MyColors from '../config/colors';

class PriceComposition extends Component {
    static navigationOptions = {
        title: 'Petrol Price Composition',
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
        axios.defaults.baseURL = ServerIp;
    }
    componentDidMount(){
        axios.get('/api/price-composition')
        .then(response => {
            this.props.getComposition(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
    renderComposition(){
        let composition = this.props.rates.composition;
        console.log('composition:', composition);
        return (
            <View style={{padding: 16}}>
                <View style={{flexDirection: 'row', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{flex: 1, fontWeight: 'bold'}}>Published Date and Time</Text>
                    <Text style={{fontWeight: 'bold'}}>{composition.published_at}</Text>
                </View>
                <View style={{borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Border Retail Price</Text>
                        <Text>{composition.retail_price}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Custom Duty</Text>
                        <Text>{composition.custom_duty}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Road Maintenance</Text>
                        <Text>{composition.road_maintenance}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Pending Development Tax</Text>
                        <Text>{composition.pending_dev_tax}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Pollution Fees</Text>
                        <Text>{composition.pollution_fees}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Price Stabilization Fee</Text>
                        <Text>{composition.price_stabilization}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>VAT</Text>
                        <Text>{composition.VAT}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{flex: 1, fontWeight: 'bold'}}>Subtotal</Text>
                    <Text style={{fontWeight: 'bold'}}>{composition.retail_price + composition.custom_duty + composition.road_maintenance + composition.pending_dev_tax + composition.pollution_fees + composition.price_stabilization + composition.VAT}</Text>
                </View>
                <View style={{borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Average Transportation Cost</Text>
                        <Text>{composition.avg_transportation_cost}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Insurance</Text>
                        <Text>{composition.insurance}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Administrative Cost</Text>
                        <Text>{composition.administrative_cost}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Technological Loss</Text>
                        <Text>{composition.technological_loss}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Determined Profit per litre</Text>
                        <Text>{composition.determined_profit}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Text style={{flex: 1}}>Fuel Station Charge</Text>
                        <Text>{composition.fuel_station}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{flex: 1, fontWeight: 'bold'}}>Total (Market Price)</Text>
                    <Text style={{fontWeight: 'bold'}}>{composition.petrol}</Text>
                </View>
            </View>
        );
    }
    render(){
        return (
            <ScrollView>
                {this.renderComposition()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    rates: state.rates
});

export default connect(mapStateToProps, {getComposition})(PriceComposition);