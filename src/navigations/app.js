import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MyColors from '../config/colors';

import HomeScreen from '../screens/home';
import NewsFeedScreen from '../screens/newsfeed';
import CalculatorScreen from '../screens/calculator';
import InformationScreen from '../screens/information';

const Home = createMaterialBottomTabNavigator({
    Home: HomeScreen,
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
    }
});

export default Home;