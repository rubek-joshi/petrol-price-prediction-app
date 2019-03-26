import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import MyColors from '../config/colors';
import Header from '../components/header';
import Loading from '../components/loadingIndicator';
import {ServerIp} from '../config/server';

axios.defaults.baseURL = ServerIp;

class Newsfeed extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="news" size={24} color={MyColors.MAIN_TAB_MENU} />
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            news: null
        }
        axios.get('/api/news')
        .then(response => {
            console.log(response);
            this.setState({isLoading: false, news: response.data})
        })
        .catch(error => {
            console.log(error);
            this.setState({isLoading: false})
        });
        this.renderNews = this.renderNews.bind(this);
        this.handleTryAgain = this.handleTryAgain.bind(this);
    }

    handleTryAgain(){
        this.setState({isLoading: true});
        axios.get('/api/news')
        .then(response => {
            console.log(response);
            this.setState({isLoading: false, news: response.data})
        })
        .catch(error => {
            console.log(error);
            this.setState({isLoading: false})
        });
    }

    renderNews(){
        return this.state.news.map((newsItem) => {
            return (
                <View style={styles.newsContainer} key={newsItem.id}>
                    <TouchableNativeFeedback style={styles.newsContainer}>
                        <View style={{paddingHorizontal: 16}}>
                            <Text style={styles.newsTitle}>{newsItem.news_title}</Text>
                            <Text style={{paddingBottom: 8}}>Date: {newsItem.date_published}</Text>
                            <Image source={{uri: ServerIp + '/api/news/' + newsItem.image}} style={styles.newsImage}/>
                            <View style={{borderBottomColor: '#949494', borderBottomWidth: StyleSheet.hairlineWidth}}/>
                            <View style={{paddingVertical: 8}}>
                                <Text>
                                    {newsItem.news_body}
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        });
    }
    render(){
        if(!this.state.isLoading){
            if(this.state.news){
                return (
                    <View style={styles.mainContainer}>
                        <Header heading='Newsfeed'/>
                        <ScrollView>
                            { this.renderNews() }
                        </ScrollView>
                    </View>
                );
            } else {
                return (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Failed to connect to the network.</Text>
                        <TouchableOpacity style={styles.btnTryAgain} onPress={() => this.handleTryAgain()}>
                            <Text style={{color: '#FFF'}}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        } else {
            return <Loading load={true}/>;
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    newsContainer: {
        borderRadius: 3,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    newsTitle: {
        fontSize: 30,
        fontWeight: '600'
    },
    newsImage: {
        height: 200,
        width: '100%'
    },
    btnTryAgain: {
        margin: 16,
        padding: 8,
        backgroundColor: '#7a7a7a',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        elevation: 1
    }
});

export default Newsfeed;