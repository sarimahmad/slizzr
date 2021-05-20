import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Styles from './Styles';
import Tabs from '../../Components/Tabs/Tabs'
const Tabbar = ({state,navigation,image}) => {
  const {routes} = state;
  useEffect(() => {}, []);
  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
    //   setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };
  return (
    <View style={Styles.bottomWrapper}>
      <View style={Styles.container}>
      {routes.map((route, index) => (
          <Tabs
            tab={route}
            image={route.params.image}
            onPress={() => handlePress(route.name, index)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};
export default Tabbar;
