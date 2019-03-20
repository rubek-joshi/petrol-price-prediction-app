import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import MyColors from '../config/colors';
import Header from '../components/header';
import Loading from '../components/loadingIndicator';

class Newsfeed extends Component {
    static navigationOptions = {
        tabBarIcon: <Icon name="news" size={24} color={MyColors.MAIN_TAB_MENU} />
    }
    constructor(props) {
        super(props);
        axios.get('http://192.168.1.68:3000/api/news')
        .then(response => {
            console.log(response);
            this.setState({news: response.data})
        })
        .catch(error => {
            console.log(error);
        });
        this.renderNews = this.renderNews.bind(this);
    }
    renderNews(){
        return this.state.news.map((newsItem) => {
            return (
                <View style={styles.newsContainer} key={newsItem.id}>
                    <Text style={styles.newsTitle}>{newsItem.news_title}</Text>
                    <Text style={{paddingBottom: 8}}>Date: {newsItem.date_published}</Text>
                    
                    <View style={{borderBottomColor: '#949494', borderBottomWidth: StyleSheet.hairlineWidth}}/>
                    <View style={{paddingVertical: 8}}>
                        <Text>
                            {newsItem.news_body}
                        </Text>
                    </View>
                </View>
            );
        });
    }
    render(){
        console.log('State:', this.state);
        if(this.state){
            return (
                <View style={styles.mainContainer}>
                    <Header heading='Newsfeed'/>
                    <ScrollView>
                        { this.renderNews() }
                    </ScrollView>
                </View>
            );
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
        paddingHorizontal: 16,
    },
    newsTitle: {
        fontSize: 30,
        fontWeight: '600'
    }
});

export default Newsfeed;