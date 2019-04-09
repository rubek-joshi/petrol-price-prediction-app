import React, { Component } from 'react';
import { StyleSheet, Dimensions, AsyncStorage, ScrollView, RefreshControl, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View as AnimatableView } from 'react-native-animatable';
import PureChart from 'react-native-pure-chart';
import { connect } from 'react-redux';
import axios from 'axios';
import { getRates, getPrediction } from '../actions';
import { ServerIp } from '../config/server';
import MyColors from '../config/colors';

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
        axios.defaults.baseURL = ServerIp;
        this.state = {
            refreshing: false,
            flashLastUpdated: false,
            initialPrediction: null,
            lastUpdated: 'n/a'
        }
        this._onRefresh = this._onRefresh.bind(this);
        this.setupChart = this.setupChart.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.getPrediction = this.getPrediction.bind(this);
    }

    componentDidMount(){
        axios.get('/api/rates')
        .then((response) => {
            this.props.getRates(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

        this.getPrediction();

        AsyncStorage.getItem('lastUpdated', (err, value) => {
            if(err) throw err;
            if(value !== null) {
                this.setState({lastUpdated: value});
            }
        });
    }

    getPrediction(){
        axios.get('/api/rates/petrol-prediction')
        .then((response) => {
            console.log(response.data);
            this.props.getPrediction(response.data);
            this.setupChart();
            this.setState({refreshing: false, flashLastUpdated: false});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    setupChart(){
        let predictionTemp = [
            {
                seriesName: 'Actual Price',
                data: [],
                color: `${MyColors.PRIMARY}`
            },
            {
                seriesName: 'Predicted',
                data: [],
                color: '#F60550'
            }
        ]
        this.props.rates.prediction.map((item) => {
            predictionTemp[0].data.push({
                x: item.date_published,
                y: item.petrol
            });
            predictionTemp[1].data.push({
                x: item.date_published,
                y: item.petrol_prediction
            });
        });
        console.log(predictionTemp);
        this.setState({initialPrediction: predictionTemp});
    }

    renderChart(){
        if(this.state.initialPrediction){
            return (
                <View style={{backgroundColor: '#fff'}}>
                    <View style={styles.legendContainer}>
                        <Text style={{fontWeight: 'bold'}}>Legend:</Text>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendCircle, styles.actual]} />
                            <Text style={styles.legendText}>Actual Price</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={[styles.legendCircle, styles.predicted]} />
                            <Text style={styles.legendText}>Predicted Price</Text>
                        </View>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row', width: 15}}>
                            <Text style={styles.yAxisLabel}>Petrol Price (in NRs.)</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <PureChart data={this.state.initialPrediction} type='line'
                                height={300}
                                numberOfYAxisGuideLine={10}
                                showEvenNumberXaxisLabel={false}
                                gap={100}
                                selectedColor={'#0073EF'}
                                />
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text>Date</Text>
                    </View>
                    
                </View>
            );
        } else {
            return null;
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true, flashLastUpdated: true});
        axios.get('/api/rates')
        .then((response) => {
            this.getPrediction();
            this._updateLastUpdated();
            this.props.getRates(response.data);
        })
        .catch((error) => {
            this.setState({refreshing: false, flashLastUpdated: false});
            console.log(error);
        });
    }

    renderMarketRates(){
        return this.props.rates.latestRates.map((item) => {
            return (
                <View style={[styles.box, {width: Dimensions.get('window').width - 32}]} key={item.id}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                        <Text style={{flex: 1, fontWeight: '600'}}>{item.location} Petrol Market Price</Text>
                    </View>
                    <View style={styles.dailyPriceContainer}>
                        <Text style={{fontSize: 30, fontWeight: '400'}}>Nrs.<Text style={{fontSize: 60}}>{item.petrol}</Text>/litre</Text>
                    </View>
                </View>
            );
        })
    }

    // updates the last updated date with current date
    _updateLastUpdated = async () => {
        try {
            await AsyncStorage.mergeItem('lastUpdated', (new Date().toLocaleDateString()));
        } catch (error) {
            console.log(error);
        }
    }

    render(){
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
                        <Text>Last updated on: {this.state.lastUpdated}</Text>
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
                        {this.renderChart()}
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
    },
    legendContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "white",
        elevation: 1
    },
    legendCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginRight: 5,
        alignSelf: 'center'
    },
    legendItem: {
        flexDirection: "row"
    },
    legendText: {
        fontSize: 16
    },
    actual: {
        backgroundColor: `${MyColors.PRIMARY}`
    },
    predicted: {
        backgroundColor: '#F60550'
    },
    yAxisLabel: {
        width: 140,
        alignSelf: 'center',
        transform: [{rotate: '-90deg'}, {translateY: -63}]
    }
});

const mapStateToProps = (state) => ({
    rates: state.rates
});

export default connect(mapStateToProps, { getRates, getPrediction })(Home);