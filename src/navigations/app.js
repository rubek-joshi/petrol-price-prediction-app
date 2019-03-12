import { createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/home';
import CalculatorScreen from '../screens/calculator';

const Home = createMaterialTopTabNavigator({
    Home: HomeScreen,
    Calculator: CalculatorScreen
},{
    tabBarPosition: 'bottom'
});

export default Home;