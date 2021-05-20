import React from 'react';
import { Text, View ,Image,TouchableOpacity} from 'react-native';
import Styles from './Styles'


const Tabs = ({  tab, onPress, image }) => {
    return (
      <TouchableOpacity style={Styles.Option} onPress={onPress}>
        <Image
          height={5}
          source={image}
        />
       
      </TouchableOpacity>
    );
  };

export default Tabs;
