import { StyleSheet, Platform, } from 'react-native';
import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
    container: { 
        flex: 1
    },
    background: {
        flex: 3,
    },  
    taskList: {
        flex: 7,
        backgroundColor: commonStyles.colors.secondary,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',  
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondaryImageColor,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,

    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondaryImageColor,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 0,
        marginTop: Platform.OS === 'ios' ? 30 : 0
    },
    iconVisible: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    addTaskButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.colors.today,
    },
    infoMessage: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
        marginTop: 20,
        textAlign: 'center'
    }
});

export default styles;