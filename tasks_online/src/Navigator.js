import React from 'react';
import { } from 'react-native';
import { 
    createAppContainer, 
    createSwitchNavigator 
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

//componentes
import Auth from './screens/Auth';
import AuthOrApp from './screens/AuthOrApp';
import TaskList from './screens/TaskList';
import menuConfig from './screens/MenuDrawer/menuConfig';

const menuRoutes = {  
    Today: {
        name: 'Today',
        screen: props => <TaskList title = 'Hoje' daysAhead = {0} {...props}/>,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <TaskList title = 'Amanhã' daysAhead = {1} {...props}/>,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <TaskList title = 'Semana' daysAhead = {7} {...props}/>,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <TaskList title = 'Mês' daysAhead = {30} {...props}/>,
        navigationOptions: {
            title: 'Mês'
        }
    },
};

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
    AuthOrApp: {
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
});

export default createAppContainer(mainNavigator);
