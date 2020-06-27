import { StyleSheet } from 'react-native';

import commonStyles from '../../commonStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: commonStyles.colors.secondaryImageColor,
        fontFamily: commonStyles.fontFamily,
        fontSize: 70,
        marginBottom: 20
    },
    subtitle: {
        color: commonStyles.colors.secondaryImageColor,
        fontFamily: commonStyles.fontFamily,
        fontSize: 24,
        
    },
    input: {
        backgroundColor: "#FFF",
        marginTop: 10,
        height: 48
    },
    formContainer: {
        backgroundColor: "#0003",
        padding: 20,
        width: '90%',
        borderRadius: 20
    },
    button: {
        backgroundColor: "#0A0",
        marginTop: 10,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonDisabled: {
        backgroundColor: "#8A8",
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 18
    },
    toggleMethod: {
        padding: 10,
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
    
});

export default styles;