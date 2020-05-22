import { StyleSheet, Dimensions } from 'react-native';
import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    },  
    buttonsBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginVertical: 20,
        marginRight: 20,
        padding: 12,
        fontSize: 15,
        borderRadius: 6,
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        color: commonStyles.colors.secondary,
        backgroundColor: commonStyles.colors.today
    },
    button_cancel: {
        backgroundColor: '#7777',
        color: commonStyles.colors.subText,
    },
    inputText: {
        fontFamily: commonStyles.fontFamily,
        width: Dimensions.get('window').width - 40,
        height: 50,
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,

    }
});

export default styles;