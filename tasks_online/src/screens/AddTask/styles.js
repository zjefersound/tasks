import { StyleSheet, Dimensions } from 'react-native';
import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    container: {
        backgroundColor: commonStyles.colors.secondary
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondaryImageColor,
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        fontWeight: 'bold'
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
        color: commonStyles.colors.secondaryImageColor,
        backgroundColor: commonStyles.colors.today
    },
    button_cancel: {
        backgroundColor: '#7777',
        color: '#333',
    },
    inputText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        width: Dimensions.get('window').width - 40,
        height: 50,
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#8884',
        borderRadius: 25,
        paddingLeft: 24,
        paddingRight: 16
    },
    dateBar: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.mainText
    },
    date_icon: {
        marginRight: 10,
    }
});

export default styles;