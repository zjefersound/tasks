import commonStyles from '../../commonStyles';
import MenuDrawer from './index';

const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: MenuDrawer,
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 18, 
            color: commonStyles.colors.mainText,
        },
        activeLabelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'bold', 
        },
        activeBackgroundColor: '#8883'
    }
};

export default menuConfig;