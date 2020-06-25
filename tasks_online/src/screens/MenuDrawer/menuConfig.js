import commonStyles from '../../commonStyles';
import MenuDrawer from './index';

const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: MenuDrawer,
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.colors.fontFamily,
            fontWeight: 'normal',
            fontSize: 16, 
            color: commonStyles.colors.mainText,
        },
        activeLabelStyle: {
            fontWeight: 'bold',
            color: '#7C7',
        },
    }
};

export default menuConfig;