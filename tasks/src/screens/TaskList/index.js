import React, { Component } from 'react';
import { 
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

//componentes
import Task from '../../components/Task';
import AddTask from '../AddTask';


export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        showAddTask: true,
        visibleTasks: [],
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar livro de Receitas',
                estimateAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Roubar livro de Receitas',
                estimateAt: new Date(),
                doneAt: null,
            },
        ],
    };

    componentDidMount = () => {
        this.filterTasks();
    }

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

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
        return (
            <View style = { styles.container }>
                <AddTask isVisible = { this.state.showAddTask }
                    onCancel = { () => this.setState({ showAddTask: false}) }/>
                <StatusBar backgroundColor = { commonStyles.colors.today } />
                <ImageBackground source = { todayImage }
                    style = { styles.background }>
                    <View style = { styles.iconBar }>
                        <TouchableOpacity onPress = { this.toggleFilter }>
                            <Icon name = { this.state.showDoneTasks ? 'eye-slash' : 'eye' } 
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
                    <FlatList data = { this.state.visibleTasks } 
                        keyExtractor = { item => `${item.id}` } 
                        renderItem = { ({ item }) => 
                            <Task { ...item } toggleTask = { this.toggleTask }/> }/>
                </View>
            </View>
        );
    }
};