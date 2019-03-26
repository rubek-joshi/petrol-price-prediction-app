import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, RefreshControl, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View as AnimatableView } from 'react-native-animatable';
import PureChart from 'react-native-pure-chart';
import { connect } from 'react-redux';
import { getRates } from '../actions';
import axios from 'axios';
import { ServerIp } from '../config/server';
import MyColors from '../config/colors';

axios.defaults.baseURL = ServerIp;
class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: `${MyColors.PRIMARY}`
        },
        headerTitleStyle: {
            color: '#FFF',
            fontWeight: '200'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            flashLastUpdated: false
        }
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount(){
        axios.get('/api/rates')
        .then((response) => {
            this.props.getRates(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    _onRefresh = () => {
        this.setState({refreshing: true, flashLastUpdated: true});
        setTimeout(() => {
            this.setState({refreshing: false, flashLastUpdated: false}); 
        }, 2000);
    }

    renderMarketRates(){
        return this.props.rates.latestRates.map((item) => {
            return (
                <View style={[styles.box, {width: Dimensions.get('window').width - 32}]} key={item.id}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1, fontWeight: '600'}}>{item.location} Petrol Market Price</Text>
                    </View>
                    <View style={styles.dailyPriceContainer}>
                        <Text style={{fontSize: 30, fontWeight: '400'}}>Nrs.<Text style={{fontSize: 60}}>{item.petrol}</Text>/litre</Text>
                    </View>
                </View>
            );
        })
    }

    render(){
        let sampleData = [
            {
              seriesName: 'series1',
              data: [
                {x: '2018-02-01', y: 30},
                {x: '2018-02-02', y: 200},
                {x: '2018-02-03', y: 170},
                {x: '2018-02-04', y: 250},
                {x: '2018-02-05', y: 10}
              ],
              color: `${MyColors.PRIMARY}`
            },
            {
              seriesName: 'series2',
              data: [
                {x: '2018-02-01', y: 20},
                {x: '2018-02-02', y: 100},
                {x: '2018-02-03', y: 140},
                {x: '2018-02-04', y: 550},
                {x: '2018-02-05', y: 40}
              ],
              color: `${MyColors.secondary}`
            }
        ]
        return (
            <View style={styles.mainContainer}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    
                    <AnimatableView animation={this.state.flashLastUpdated ? 'flash' : undefined}
                        style={styles.lastUpdatedBox}
                        easing='linear' useNativeDriver>
                        <Text>Last updated on: 15/03/2019</Text>
                    </AnimatableView>

                    <View style={styles.box}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontWeight: '600'}}>Petrol Market Price</Text>
                            <TouchableOpacity style={styles.historyButton} onPress={() => this.props.navigation.navigate('History')}>
                                <Icon name="history" size={24} color={MyColors.PRIMARY} />
                                <Text style={{paddingLeft: 5}}>History</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView 
                        horizontal={true}
                        snapToInterval={Dimensions.get('window').width} //your element width
                        snapToAlignment={'center'}
                        showsHorizontalScrollIndicator={false}
                    >
                        {this.renderMarketRates()}
                    </ScrollView>

                    <View style={styles.chartContainer}>
                        <PureChart data={sampleData} type='line'
                        height={300}
                        numberOfYAxisGuideLine={10}
                        showEvenNumberXaxisLabel={false}
                        gap={90}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    box: {
        borderRadius: 3,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 8,
        marginHorizontal: 16,
        paddingHorizontal: 16,
    },
    lastUpdatedBox: {
        padding: 16,
        backgroundColor: '#FFF',
        elevation: 1
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 8
    },
    dailyPriceContainer:{
        alignItems: 'center',
        paddingBottom: 16
    },
    chartContainer: {
        marginHorizontal: 16,
        borderRadius: 3,
        elevation: 1
    }
});

const mapStateToProps = (state) => ({
    rates: state.rates
});

export default connect(mapStateToProps, { getRates })(Home);