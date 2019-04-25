import { createStackNavigator } from 'react-navigation';

import ForgotPasswordScreen from '../screens/forgotPassword';
import ResetPasswordScreen from '../screens/resetPassword';

const ResetPasswordStack = createStackNavigator({
    ForgotPassword: ForgotPasswordScreen,
    ResetPassword: ResetPasswordScreen
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
});

export default ResetPasswordStack;