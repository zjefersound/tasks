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
import axios from 'axios';

import styles from './styles';
import backgroundImage from '../../../assets/imgs/login.png';

import AuthInput from '../../components/AuthInput';

import { server, showError, showSuccess } from '../../utils';

const initialState = {
    name: '',
    email: 'jef123@gmail.com',
    password: '123456',
    confirmPassword: '',
    stageNew: false,
};
export default class Auth extends Component {
    state = {
        ...initialState,    
    }
    
    signInOrSignUp = () => {
        if ( this.state.stageNew ) {
            this.signUp();
        } else {
            this.signIn();
        }
    }

    signUp = async () => {
        
        try{
            
            if ( this.state.password === this.state.confirmPassword ) {
                await axios.post(`${server}/signup`, {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                }); 
                showSuccess('Usuário cadastrado!');
                this.setState({ ...initialState });
            } else {
                showError('Senhas diferentes!');
                this.setState({ password: '', confirmPassword: '' });
            }

        }catch(exception){
            showError(exception);
        }
    }

    signIn = async () => {
        try{
            const response = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            });

            axios.defaults.headers.common['Authorization'] = 
                `bearer ${response.data.token}`;
            this.props.navigation.navigate('Home', response.data);

        } catch(exception) {
            showError(exception);
        }
    }

    toggleMethod = () => {
        this.setState({ stageNew: !this.state.stageNew });
    }

    render(){
        const validations = [];

        validations.push(
            this.state.email && this.state.email.includes('@'));
        validations.push(
            this.state.password && this.state.password.length >= 6);
        
        if ( this.state.stageNew ) {
            validations.push(
                this.state.name && this.state.name.trim().length >= 3);
            validations.push(
                this.state.password === this.state.confirmPassword );
        }

        const isValidForm = validations.reduce((status, validation) => {
            return status && validation;
        });

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
                                onChangeText = { name => this.setState({ name }) }
                            /> 
                        }
                        <AuthInput 
                            iconName = "at" 
                            placeholder = "Email." 
                            value = { this.state.email }
                            style = { styles.input }
                            onChangeText = { email => this.setState({ email }) }
                        /> 
                        <AuthInput 
                            iconName = "lock" 
                            placeholder = "Senha." 
                            value = { this.state.password }
                            style = { styles.input }
                            secureTextEntry
                            onChangeText = { password => this.setState({ password }) }
                        />
                        {this.state.stageNew &&
                            <AuthInput 
                                iconName = "lock" 
                                placeholder = "Confirmação da Senha." 
                                value = { this.state.confirmPassword }
                                style = { styles.input }
                                secureTextEntry
                                onChangeText = { confirmPassword => 
                                    this.setState({ confirmPassword }) }
                            />
                        } 
                        <TouchableOpacity 
                            onPress = { this.signInOrSignUp }
                            activeOpacity = {0.8}
                            disabled = { !isValidForm }
                        >
                            <View 
                                style = { 
                                    [styles.button,
                                    isValidForm ? {} : styles.buttonDisabled] 
                                }
                            >
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