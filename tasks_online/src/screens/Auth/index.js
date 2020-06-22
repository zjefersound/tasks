import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';

import styles from './styles';
import backgroundImage from '../../../assets/imgs/login.jpg';

import AuthInput from '../../components/AuthInput';

export default class Auth extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false,
    }
    
    signInOrSignUp = () => {
        if ( this.state.stageNew ) {
            Alert.alert("Cadastrado!", "Usuário cadastrado com sucesso");
        } else {
            Alert.alert("Entrou!", "Log in com sucesso");
        }
    }
    toggleMethod = () => {
        this.setState({ stageNew: !this.state.stageNew });
    }

    render(){
        return (
            <>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <ImageBackground 
                    source = { backgroundImage } 
                    style = { styles.container }
                >
                    <Text style = { styles.title }>Tasks</Text>
                    <View style = { styles.formContainer }>
                        <Text style = { styles.subtitle }>
                            {this.state.stageNew 
                                ? "Crie sua conta" 
                                : "Informe seus dados" 
                            }
                        </Text>
                        {this.state.stageNew &&
                            <AuthInput 
                                iconName = "user" 
                                placeholder = "Nome." 
                                value = { this.state.name }
                                style = { styles.input }
                                onChange = { name => this.setState({ name }) }
                            /> 
                        }
                        <AuthInput 
                            iconName = "at" 
                            placeholder = "Email." 
                            value = { this.state.email }
                            style = { styles.input }
                            onChange = { email => this.setState({ email }) }
                        /> 
                        <AuthInput 
                            iconName = "lock" 
                            placeholder = "Senha." 
                            value = { this.state.password }
                            style = { styles.input }
                            secureTextEntry
                            onChange = { password => this.setState({ password }) }
                        />
                        {this.state.stageNew &&
                            <AuthInput 
                                iconName = "lock" 
                                placeholder = "Confirmação da Senha." 
                                value = { this.state.confirmPassword }
                                style = { styles.input }
                                secureTextEntry
                                onChange = { confirmPassword => 
                                    this.setState({ confirmPassword }) }
                            />
                        } 
                        <TouchableOpacity 
                            onPress = { this.signInOrSignUp }
                            activeOpacity = {0.8}
                        >
                            <View style = { styles.button }>
                                <Text style = { styles.buttonText }>
                                    { this.state.stageNew 
                                        ? 'Cadastrar' 
                                        : 'Entrar'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress = { this.toggleMethod }
                        activeOpacity = {0.8}
                    >
                        <Text style = { styles.toggleMethod }>
                            {this.state.stageNew
                            ? 'Voltar para o login.'
                            : 'Faça seu cadastro.'}
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </>
        ); 
    }
}