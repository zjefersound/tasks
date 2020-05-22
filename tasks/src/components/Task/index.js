import React from 'react';
import { View, Text } from 'react-native';

//Estilos e imagens
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
    return (
        <View style = { styles.container }>
            <View style = { styles.checkContainer }>
                { getCheckView( props.doneAt ) }
            </View>
            <View>
                <Text>{ props.desc }</Text>
                <Text>{ props.estimateAt + "" }</Text>
            </View>
        </View>
    );
};

function getCheckView( doneAt ) {
    if( doneAt != null ) {
        return ( 
            <View style = { styles.done }>
                <Icon name = 'check' size = {15} color = '#FFF' />
            </View>
        );
    }else {
        return ( 
            <View style = { styles.pending }></View>
        );
    }   
}