import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, TouchableNativeFeedback, Linking, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal.1"; //scrollview added
import axios from 'axios';
import MyColors from '../config/colors';
import Header from '../components/header';
import Loading from '../components/loadingIndicator';
import {ServerIp} from '../config/server';

class Newsfeed extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="news" size={24} color={MyColors.MAIN_TAB_MENU} />
    }
    constructor(props) {
        super(props);
        axios.defaults.baseURL = ServerIp;
        this.state = {
            isLoading: true,
            news: null,
            newsIndex: 0,
            isModalVisible: false,
            isRefreshing: false
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
        this.displayModal = this.displayModal.bind(this);
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

    displayModal(){
        const news = this.state.news[this.state.newsIndex]
        return (
            <Modal isVisible={this.state.isModalVisible}
                style={{margin: 0}}
                animationIn='zoomIn'
                animationOut='zoomOut'
                animationInTiming={400}
                animationOutTiming={600}
                onBackButtonPress={() => this.setState({isModalVisible: false})}
            >
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <Image source={{uri: ServerIp + '/api/news/' + news.image}} style={styles.modalImage}/>
                    <View style={{flex: 1, padding: 16}}>
                        <Text style={{fontWeight: '500'}}>{news.date_published}</Text>
                        <Text style={{fontWeight: '600', fontSize: 40, color: '#000', opacity: 0.87}}>{news.news_title}</Text>
                        <Text>{news.news_body}</Text>
                        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text onPress={() => Linking.openURL(news.source)}>Go to source!</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.setState({isModalVisible: false})}>
                        <MaterialIcon name='arrow-back' size={30} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    renderNews(){
        return this.state.news.map((newsItem, index) => {
            return (
                <View style={styles.newsContainer} key={newsItem.id}>
                    <TouchableNativeFeedback style={styles.newsContainer} onPress={() => this.setState({isModalVisible: true, newsIndex: index})}>
                        <View style={{paddingHorizontal: 16}}>
                            <Text style={styles.newsTitle}>{newsItem.news_title}</Text>
                            <Text style={{paddingBottom: 8}}>Date: {newsItem.date_published}</Text>
                            <Image source={{uri: ServerIp + '/api/news/' + newsItem.image}} style={styles.newsImage}/>
                            <View style={{borderBottomColor: '#949494', borderBottomWidth: StyleSheet.hairlineWidth}}/>
                            <View style={{paddingVertical: 8}}>
                                <Text>
                                    {newsItem.news_body.substr(0, 150)}...
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        });
    }

    _onRefresh = () => {
        this.handleTryAgain();
    }

    render(){
        if(!this.state.isLoading){
            if(this.state.news){
                return (
                    <View style={styles.mainContainer}>
                        <Header heading='Newsfeed'/>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }>
                            { this.renderNews() }
                        </ScrollView>
                        { this.displayModal() }
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
    },
    modalImage: {
        height: 300
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 16,
        left: 16
    }
});

export default Newsfeed;