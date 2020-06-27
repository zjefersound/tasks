import { 
    Alert, 
    Platform,
} from 'react-native';

const server = Platform.OS === 'ios' 
    ? 'http://localhost:3000' 
    : 'http://10.0.2.2:3000';

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um problema', `${err.response.data}`);
    }else{
        Alert.alert('Ops! Erro inesperado', `${err}`);
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', String(msg));
}

export {
    server,
    showError,
    showSuccess,
}