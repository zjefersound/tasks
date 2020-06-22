import React from 'react';
import { 
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default props => {
    return (
        <View style = { [styles.container, props.style] }>
            <Icon 
                name = { props.iconName } 
                size = {20} 
                style = { styles.icon }
            /> 
            <TextInput { ...props } style = { styles.input }/>
        </View>
    );
}