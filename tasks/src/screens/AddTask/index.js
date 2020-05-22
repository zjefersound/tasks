import React, { Component } from 'react';
import { 
    Modal, 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

//Estilos e imagens
import styles from './styles';

const initialState = { desc: ''}

export default class AddTask extends Component { 
    state = {
        ...initialState
    }

    render(){
        return (
            <Modal transparent = {true} visible = { this.props.isVisible }
                onRequestClose = { this.props.onCancel }
                animationType = 'slide'>
                <TouchableWithoutFeedback 
                    onPress = { this.props.onCancel }>
                    <View style = { styles.background }></View>
                </TouchableWithoutFeedback>
                <View style = { styles.container }>
                    <Text style = { styles.header }>Nova tarefa:</Text>
                    <TextInput style = { styles.inputText }
                        placeholder = 'Informe a descrição da tarefa...'
                        value = { this.state.desc }
                        onChangeText = { desc => this.setState({desc}) }/>
                    <View style = { styles.buttonsBar } >
                        <TouchableOpacity onPress = { this.props.onCancel}>
                            <Text style = { [styles.button, styles.button_cancel] }>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = { styles.button }>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback 
                    onPress = { this.props.onCancel }>
                    <View style = { styles.background }></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
};