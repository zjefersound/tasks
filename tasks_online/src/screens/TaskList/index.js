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
    };

    loadTasks = async () => {
        const response = await axios.get(`${server}/tasks`)
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

    toggleTask = taskId => {
        const tasks = [ ...this.state.tasks ];
        tasks.forEach(task => {
            if( task.id === taskId ) {
                task.doneAt = task.doneAt ? null : new Date();
            }
        });
        this.setState({ tasks }, this.filterTasks);
    };

    addTask = newTask => {
        if( !newTask.desc || !newTask.desc.trim() ) {
            Alert.alert('Dados inválidos', 'Descrição não informada!');
            return;
        }

        const tasks = [ ...this.state.tasks ];
        tasks.unshift({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        });

        this.setState({ tasks, showAddTask: false }, this.filterTasks);
    };
    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({ tasks }, this.filterTasks);
    };

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM');
        return (
            <View style = { styles.container }>
                <AddTask isVisible = { this.state.showAddTask }
                    onCancel = { () => this.setState({ showAddTask: false}) }
                    onSave = { this.addTask }/>
                <StatusBar backgroundColor = { commonStyles.colors.today } />
                <ImageBackground source = { todayImage }
                    style = { styles.background }>
                    <View style = { styles.iconBar }>
                        <TouchableOpacity onPress = { this.toggleFilter }
                            style = { styles.iconVisible }>
                            <Icon name = { this.state.showDoneTasks ? 
                                'eye-slash' : 'eye' } 
                                size = {20}
                                color = { commonStyles.colors.secondary }/>
                        </TouchableOpacity>
                    </View>
                    <View style = { styles.titleBar }>
                        <Text style = { styles.title }>Hoje</Text>
                        <Text style = { styles.subtitle }>{ today }</Text>
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
                <TouchableOpacity style = { styles.addTaskButton }
                    activeOpacity = {0.7}
                    onPress = { () => this.setState({ showAddTask: true }) }>
                    <Icon name = "plus" size = {25} 
                        color = { commonStyles.colors.secondary } />
                </TouchableOpacity>
            </View>
        );
    }
};