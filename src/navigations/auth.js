import { createMaterialTopTabNavigator } from 'react-navigation';

import SignUpScreen from '../screens/signup';
import SignInScreen from '../screens/signin';

const AuthStack = createMaterialTopTabNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen
},
{
    initialRouteName: 'SignIn',
    tabBarOptions: {
        upperCaseLabel: false,
        tabStyle: {
            display: 'none',
        },
        indicatorStyle: {
            height: 0, //hide indicator
        }
    }
}
);

export default AuthStack;