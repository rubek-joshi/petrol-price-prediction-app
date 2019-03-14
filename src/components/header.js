import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MyColors from '../config/colors';
import MyFont from '../config/header';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <View style={styles.header}>
                {/* <TouchableOpacity style={styles.touchTarget}>
                    <View style={{paddingTop: 4}}>
                        <Icon name={this.props.leftIcon} size={24} color='white'/>
                    </View>
                </TouchableOpacity> */}

                <Text style={styles.headerText}>{this.props.heading}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: MyFont.HEADER_HEIGHT,
        backgroundColor: `${MyColors.PRIMARY}`,
        flexDirection: 'row',
        elevation: 1
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 16,
        paddingHorizontal: 16
    },
    touchTarget: {
        alignSelf: 'stretch',
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Header;