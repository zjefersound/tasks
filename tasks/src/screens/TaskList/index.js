import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar} from 'react-native';

//Estilo e visuais
import styles from './styles';
import todayImage from '../../../assets/imgs/today.jpg';

//funcionalidades
import moment from 'moment';
import 'moment/locale/pt-br';

//componentes
import Task from '../../components/Task';


export default class TaskList extends Component {
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
        return (
            <View style = { styles.container }>
                <StatusBar backgroundColor = '#282828' />
                <ImageBackground source = { todayImage }
                    style = { styles.background }>
                    <View style = { styles.titleBar }>
                        <Text style = { styles.title }>Hoje</Text>
                        <Text style = { styles.subtitle }>{ today }</Text>
                    </View>
                </ImageBackground>
                <View style = { styles.taskList }>
                    <Task desc = 'Comprar pão' 
                        estimateAt = { new Date() } 
                        doneAt = { null } />
                    <Task desc = 'Limpar a casa' 
                        estimateAt = { new Date() } 
                        doneAt = { new Date() } />
                </View>
            </View>
        );
    }
};