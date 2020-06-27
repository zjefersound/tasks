import { StyleSheet } from 'react-native';
import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#8881',
        backgroundColor: commonStyles.colors.secondary,
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    checkContainer: { 
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: { 
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: { 
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: '#F11',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        backgroundColor: '#F11',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#FFF',
        marginLeft: 10
    }
});

export default styles;