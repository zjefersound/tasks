import { Platform, StyleSheet } from 'react-native';

import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
    background: {
        backgroundColor: commonStyles.colors.secondary,
        flex: 1,
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        borderBottomWidth: 1,
        borderColor: '#8883',
    },
    headerContent: {
        flexDirection: 'row',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 28,
        color: commonStyles.colors.mainText,
    },
    titleHeader: {
        padding: 16,
        backgroundColor:'#8883',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderWidth: 3,
        borderRadius: 28,
        margin: 16,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 18,
        fontWeight: 'bold',
        color: commonStyles.colors.mainText,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 12,
        fontWeight: 'normal',
        color: commonStyles.colors.subText,
    },
    signOut: { 
        borderTopWidth: 1,
        borderColor: '#8883',
        flexDirection: 'row',
        padding: 16
    },
    signOutText: {
        color: '#C33',
        fontFamily: commonStyles.fontFamily,
        fontSize: 16,
        paddingLeft: 16
    },
    themeText: {
        color: commonStyles.colors.mainText,
        fontFamily: commonStyles.fontFamily,
        fontSize: 16,
        paddingLeft: 16
    },
    footer: {
        
    }
});

export default styles;