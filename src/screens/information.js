import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput, ToastAndroid } from 'react-native';
import Textarea from 'react-native-textarea';
import Modal from 'react-native-modal';
import AppIntroSlider from 'react-native-app-intro-slider';
import {connect} from 'react-redux';
import {logOut} from '../actions';
import axios from 'axios';
import IntroSlides from '../components/introSlides';
import {ServerIp} from '../config/server';
import MyColors from '../config/colors';

class Information extends Component {
    static navigationOptions = {
        title: 'Information',
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
            showIntro: false,
            isModalVisible: false,
            feedbackTitle: '',
            feedback: ''
        }
        this.feedbackModal = this.feedbackModal.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    _onDone = () => {
        this.setState({ showIntro: false });
    }
    _onSkip = () => {
        this.setState({ showIntro: false });
    }
    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible})
    }
    sendFeedback() {
        if(this.state.feedback.length <= 0){
            alert('Please enter message or press the cancel button');
            return;
        }
        axios.post('/api/feedback', {
            title: this.state.feedbackTitle,
            message: this.state.feedback,
            respondent: this.props.user.userDetails.full_name
        })
        .then((response) => {
            this.setState({isModalVisible: false});
            ToastAndroid.show('Feedback successfully sent.', ToastAndroid.LONG);
        })
        .catch((error) => {
            console.log(error);
            this.setState({isModalVisible: false});
            alert('Cannot send feedback. Please check your connection.');
        });
    }

    feedbackModal(){
        return (
            <Modal isVisible={this.state.isModalVisible} style={styles.modal}
            onBackdropPress={() => this.setState({isModalVisible: false})}
            onBackButtonPress={() => this.setState({isModalVisible: false})}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={{color: '#fff'}}>Give us feedback to improve the app or just show your appreciation</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <TextInput value={this.state.feedbackTitle} placeholder='Enter Feedback Title (optional)'
                            onChangeText={input => this.setState({feedbackTitle: input})}
                            style={{borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 8, paddingBottom: -4}}
                        />
                        <Textarea value={this.state.feedback}
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={input => this.setState({feedback: input})}
                            placeholder={'Write your message...'}
                            maxLength={255}
                            underlineColorAndroid={'transparent'}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => this._toggleModal()}>
                                <Text style={{color: '#fff'}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {backgroundColor: `${MyColors.PRIMARY}`, marginLeft: 8}]} onPress={() => this.sendFeedback()}>
                                <Text style={{color: '#fff'}}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    logOut(){
        this.props.logOut();
        this.props.navigation.navigate('Auth');
    }

    render(){
        if(this.state.showIntro){
            return <AppIntroSlider slides={IntroSlides} onDone={this._onDone}
            showSkipButton={true} onSkip={this._onSkip}/>;
        } else {
            return (
                <ScrollView style={styles.mainContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => this._toggleModal()}>
                        <Text>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.navigation.navigate('PetrolPumpMap')}>
                        <Text>Find Petrol Stations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => this.setState({showIntro: true})}>
                        <Text>About App</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.navigation.navigate('TermsConditions')}>
                        <Text>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => this._toggleModal()}>
                        <Text>Send Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => this.logOut()}>
                        <Text>{this.props.user.isAuthenticated ? "Log out" : "Log in"}</Text>
                    </TouchableOpacity>
                    {this.feedbackModal()}
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    option: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    modal: {
        padding: 12,
        margin: 16,
        justifyContent: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    modalHeader:{
        backgroundColor: `${MyColors.PRIMARY}`,
        padding: 8,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
    },
    modalBody: {
        flex: 1,
        padding: 8
    },
    modalContent: {
        height: 320,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    textareaContainer: {
        flex: 1,
        marginBottom: 8
    },
    textarea: {
        flex: 1,
        textAlignVertical: 'top',  // hack android
        fontSize: 14,
        color: '#333',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        paddingBottom: 8
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: 100,
        borderRadius: 3,
    },
});

const mapStateToProps = (state) => ({
    user: state.auth
});

export default connect(mapStateToProps, {logOut})(Information);