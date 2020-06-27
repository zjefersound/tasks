import React, { Component } from 'react';
import { 
    View,  
    ActivityIndicator, 
    StatusBar

} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

export default class AuthOrApp extends Component {
    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData');
        let userData;
        try{
            userData = JSON.parse(userDataJson);
        } catch(exception) {
            //user data invalido
        }   

        if ( userData && userData.token ) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData);
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor = '#282828' /> 
                <View style = { styles.container }>
                    <ActivityIndicator size = 'large' /> 
                </View>
            </>
        );
    }
}