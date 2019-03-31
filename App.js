import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage, ActivityIndicator} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import MainNavigator from './src/navigations';
import IntroSlides from './src/components/introSlides';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showRealApp: false
    }
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  _onSkip = () => {
    this.setState({ showRealApp: true });
  }

  componentDidMount(){
    AsyncStorage.getItem('alreadyUsed').then(value => {
      console.log('Already used', value);
      if(value === null) {
        AsyncStorage.setItem('alreadyUsed', 'true');
        AsyncStorage.setItem('lastUpdated', (new Date().toLocaleDateString()));
        this.setState({isLoading: false});
      } else {
        console.log(AsyncStorage.getItem('lastUpdated'));
        this.setState({showRealApp: true, isLoading: false});
      }
    });
  }

  render() {
    //console.log(this.state);
    if (this.state.isLoading){
      return (
        <View style={styles.mainContainer}>
            <ActivityIndicator size='large' animating={this.state.isLoading}/>
        </View>
      );
    } else {
      if (this.state.showRealApp) {
        return <MainNavigator/>;
      } else {
        return <AppIntroSlider slides={IntroSlides} onDone={this._onDone}
                showSkipButton={true} onSkip={this._onSkip}/>;
      }
    }
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1
  }
});