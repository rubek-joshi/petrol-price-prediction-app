import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/home';

const Home = createStackNavigator({
    Home: HomeScreen
});

export default Home;