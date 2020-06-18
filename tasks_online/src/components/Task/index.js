import React from 'react';
import { 
    View, 
    Text, 
    TouchableWithoutFeedback,  
    TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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

    const getRightContent = () => {
        return (
            <TouchableOpacity style = { styles.right } 
                onPress = { () => props.onDelete && props.onDelete(props.id) }
                activeOpacity = {0.7} >
                <Icon name = 'trash' size = {25} color = '#FFF'/>
            </TouchableOpacity>
        );
    };
    
    const getLeftContent = () => {
        return (
            <View style = { styles.left } >
                <Icon name = 'trash' size = {25} color = '#FFF'/>
                <Text style = { styles.excludeText }> Excluir </Text>
            </View>
        );
    };
    
    return (
        <Swipeable renderRightActions = { getRightContent } 
            overshootRight = {false}
            renderLeftActions = { getLeftContent }
            onSwipeableLeftOpen = { () => props.onDelete && props.onDelete(props.id) }>
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
        </Swipeable>
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