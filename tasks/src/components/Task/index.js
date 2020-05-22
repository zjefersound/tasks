import React from 'react';
import { View, Text, TouchableWithoutFeedback,  } from 'react-native';

//Estilos e imagens
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

//funcionalidades
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {

    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {} ;

    const date = moment(props.estimateAt).locale('pt-br')
        .format('dddd, D [de] MMMM');

    return (
        <View style = { styles.container }>
            <TouchableWithoutFeedback
                onPress = { () => props.toggleTask( props.id ) }>
                <View style = { styles.checkContainer }>
                    { getCheckView( props.doneAt ) }
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style = { [styles.desc, doneOrNotStyle] } >
                    { props.desc }</Text>
                <Text style = { styles.date }>{ date }</Text>
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