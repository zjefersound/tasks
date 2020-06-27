import React, { Component } from 'react';
import { 
    Modal, 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';

//Funcionalidades
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

//Estilos e imagens
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../../commonStyles';

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component { 
    state = {
        ...initialState
    };
    
    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        };

        if( this.props.onSave(newTask) ) this.setState({ ...initialState });

    };

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
                value = { this.state.date }
                mode = 'date'
                onChange = { (_,date) => this.setState({ date, showDatePicker: false }) }/>;
        
        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY');
        
        if( Platform.OS ==='android' ){
            datePicker = (
                <View>
                    <TouchableOpacity style = { styles.dateBar } onPress = { () => this.setState({ showDatePicker: true }) }>
                        <View style = { styles.date_icon }>
                            <Icon name = 'calendar' 
                                size = {20} 
                                color = { this.props.primaryColor }/>
                        </View>
                        <Text style = { styles.date }>
                            { dateString }
                        </Text>
                    </TouchableOpacity>
                    { this.state.showDatePicker && datePicker }
                </View>
            );
        }
        return datePicker;
    };
    bgColor = { backgroundColor: this.props.primaryColor };
    render(){
        return (
            <Modal transparent = {true} visible = { this.props.isVisible }
                onRequestClose = { this.props.onCancel }
                animationType = 'fade'>
                <TouchableWithoutFeedback 
                    onPress = { this.props.onCancel }>
                    <View style = { styles.background }></View>
                </TouchableWithoutFeedback>
                <View style = { styles.container }>
                    <Text style = { [styles.header, this.bgColor] }>Nova tarefa</Text>
                    <TextInput style = { styles.inputText }
                        placeholder = 'Informe a descrição da tarefa...'
                        placeholderTextColor = '#888'
                        value = { this.state.desc }
                        onChangeText = { desc => this.setState({desc}) }/>
                    {this.getDatePicker()}
                    <View style = { styles.buttonsBar } >
                        <TouchableOpacity onPress = { this.props.onCancel}>
                            <Text style = { [styles.button, styles.button_cancel] }>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = { this.save }>
                            <Text style = { [styles.button, this.bgColor] }>Salvar</Text>
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