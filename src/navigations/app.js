import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MyColors from '../config/colors';

import HomeScreen from '../screens/home';
import NewsFeedScreen from '../screens/newsfeed';
import CalculatorScreen from '../screens/calculator';
import InformationScreen from '../screens/information';
import HistoryScreen from '../screens/history';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    /* any other route you want to render under the tab bar */
});

HomeStack.navigationOptions = {
    tabBarIcon: <Icon name="home" size={24} color={MyColors.MAIN_TAB_MENU} />
}

const TabNavigator = createMaterialBottomTabNavigator({
    Home: HomeStack,
    NewsFeed: NewsFeedScreen,
    Calculator: CalculatorScreen,
    Information: InformationScreen
},{
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
    activeTintColor: '#FFF',
    inactiveTintColor: '#000',
    barStyle: {
        backgroundColor: `${MyColors.PRIMARY}`,
        paddingVertical: 5
    },
});

TabNavigator.navigationOptions = {
    header: null
}

const MainStack = createStackNavigator({
    Tabs: TabNavigator,
    History: HistoryScreen,
    /* any other route you want to render above the tab bar */
});

export default MainStack;