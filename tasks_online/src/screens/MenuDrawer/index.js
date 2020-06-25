import React from 'react';
import { 
    ScrollView, 
    View, 
    Text,
    TouchableOpacity 
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Gravatar } from 'react-native-gravatar';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';

export default props => {
    const gravatarConfig = {
        email: props.navigation.getParam('email'),
        secure: true,
    };
    return (
        <ScrollView style = { styles.background }>
            <View style = { styles.header }>
                <View style = { styles.titleHeader }>
                    <Text style = { styles.title }>Tasks</Text>
                    <TouchableOpacity 
                        style = { styles.luminosity }
                        onPress = { () => props.navigation.closeDrawer() }>
                        <Icon 
                            name = 'close' 
                            size = {20}
                            color = { commonStyles.colors.mainText } 
                        /> 
                    </TouchableOpacity>
                </View>
                <View style = { styles.headerContent }>
                    <Gravatar 
                        style = { styles.avatar }
                        options = { gravatarConfig } 
                    />
                    <View style = {styles.userInfo}> 
                        <Text style = { styles.name }>
                            { props.navigation.getParam('name') }
                        </Text>
                        <Text style = { styles.email }>
                            { props.navigation.getParam('email') }
                        </Text>
                    </View>
                </View>
            </View>
            <DrawerItems { ...props } />
        </ScrollView>
    );
}