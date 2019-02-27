import { createBottomTabNavigator } from 'react-navigation';

import SignUpScreen from '../screens/signup';
import SignInScreen from '../screens/signin';

const AuthStack = createBottomTabNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen
},
{
    initialRouteName: 'SignIn'
}
);

export default AuthStack;