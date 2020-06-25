import React, { Component } from 'react';
import { 
    Alert,
    View,
    Text, 
    ImageBackground, 
    StatusBar, 
    FlatList,
    TouchableOpacity,
} from 'react-native';

//Estilo e imagens
import styles from './styles';

import todayImage from '../../../assets/imgs/today.jpg';
import tomorrowImage from '../../../assets/imgs/tomorrow.jpg';
import weekImage from '../../../assets/imgs/week.jpg';
import monthImage from '../../../assets/imgs/month.jpg';

import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';

//funcionalidades
import moment from 'moment';
import 'moment/locale/pt-br';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { server, showError, showSuccess } from '../../utils';

//componentes
import Task from '../../components/Task';
import AddTask from '../AddTask';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: [],
};

export default class TaskList extends Component {
    state = {
        ...initialState
    };

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState');
        const state = JSON.parse(stateString) || initialState;
        this.setState({
            showDoneTasks: this.state.showDoneTasks
        }, this.filterTasks );
        this.loadTasks();
    };

    loadTasks = async () => {
        try {
            const maxDate = moment()
                .add({days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59:59');
            const response = await axios.get(`${server}/tasks?date=${maxDate}`);
            this.setState({ tasks: response.data }, this.filterTasks);
        } catch (exception) {
            showError(exception);
        }
    };

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
    };

    filterTasks = () => {
        let visibleTasks = null;

        if( this.state.showDoneTasks ) {
            visibleTasks = [ ...this.state.tasks ];
        }else{
            const pending = task => task.doneAt === null;
            visibleTasks = this.state.tasks.filter(pending);
        }
        
        this.setState({ visibleTasks });
        AsyncStorage.setItem('tasksState', JSON.stringify( {
            showDoneTasks: this.state.showDoneTasks,
        } ));
    };

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`);
            this.loadTasks();
            // const tasks = [ ...this.state.tasks ];
            // tasks.forEach(task => {
            //     if( task.id === taskId ) {
            //         task.doneAt = task.doneAt ? null : new Date();
            //     }
            // });
            // this.setState({ tasks }, this.filterTasks);
            
        } catch (exception) {
            showError(exception);
        }
    };

    addTask = async newTask => {
        if( !newTask.desc || !newTask.desc.trim() ) {
            Alert.alert('Dados inválidos', 'Descrição não informada!');
            return;
        }
        try { 
            await axios.post(`${server}/tasks`,{
                desc: newTask.desc,
                estimateAt: newTask.date,
            });
            // const tasks = [ ...this.state.tasks ];
            // tasks.unshift({
            //     id: Math.random(),
            //     desc: newTask.desc,
            //     estimateAt: newTask.date,
            //     doneAt: null
            // });

            // this.setState({ tasks, showAddTask: false }, this.filterTasks);
            this.setState({ showAddTask: false }, this.loadTasks);
        } catch (exception) {
            showError(exception);
        }
    };
    deleteTask = async id => {
        try { 
            await axios.delete(`${server}/tasks/${id}`,);
            this.loadTasks();
            // const tasks = this.state.tasks.filter(task => task.id !== id);
            // this.setState({ tasks }, this.filterTasks);

        } catch (exception) {
            showError(exception);
        }
    };

    getImage = () => {
        switch ( this.props.daysAhead ) {
            case 0: return todayImage;
            case 1: return tomorrowImage;
            case 7: return weekImage;
            default: return monthImage;
                
        }
    }
    getPrimaryColor = () => {
        switch ( this.props.daysAhead ) {
            case 0: return commonStyles.colors.today;
            case 1: return commonStyles.colors.tomorrow;
            case 7: return commonStyles.colors.week;
            case 30: return commonStyles.colors.month;
        }
    }

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM');
        return (
            <View style = { styles.container }>
                <AddTask isVisible = { this.state.showAddTask }
                    onCancel = { () => this.setState({ showAddTask: false}) }
                    onSave = { this.addTask }/>
                <StatusBar 
                    barStyle = 'default'
                    backgroundColor = '#282828' 
                />
                <ImageBackground source = { this.getImage() }
                    style = { styles.background }>
                    <View style = { styles.iconBar }>
                        <TouchableOpacity onPress = { () => 
                            this.props.navigation.openDrawer() }
                            style = { styles.iconVisible }>
                            <Icon name = 'bars' 
                                size = {20}
                                color = { commonStyles.colors.secondaryImageColor }/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = { this.toggleFilter }
                            style = { styles.iconVisible }>
                            <Icon name = { this.state.showDoneTasks ? 
                                'eye-slash' : 'eye' } 
                                size = {20}
                                color = { commonStyles.colors.secondaryImageColor }/>
                        </TouchableOpacity>
                    </View>
                    <View style = { styles.titleBar }>
                        <Text style = { styles.title }>
                            {this.props.title}
                        </Text>
                        <Text style = { styles.subtitle }>
                            { today }
                        </Text>
                    </View>
                </ImageBackground>
                <View style = { styles.taskList }>
                    { this.state.visibleTasks.length === 0 && this.state.tasks.length > 0 ? 
                        <Text style = { styles.infoMessage }>
                            Você não tem tarefas pendentes
                        </Text> : null }
                    { this.state.tasks.length === 0 ? 
                        <Text style = { styles.infoMessage }>
                            Vamos-lá! Adicione alguma tarefa
                        </Text> : null }
                    <FlatList data = { this.state.visibleTasks } 
                        keyExtractor = { item => `${item.id}` } 
                        renderItem = { ({ item }) => 
                            <Task { ...item } onDelete = { this.deleteTask }
                                toggleTask = { this.toggleTask }/> }/>
                </View>
                <TouchableOpacity 
                    style = {[
                        styles.addTaskButton, 
                        {backgroundColor: this.getPrimaryColor()}
                    ]}
                    activeOpacity = {0.7}
                    onPress = { () => this.setState({ showAddTask: true }) }>
                    <Icon name = "plus" size = {25} 
                        color = '#FFF' />
                </TouchableOpacity>
            </View>
        );
    }
};