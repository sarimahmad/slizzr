

import React, { Component } from 'react';
import {View,Image,FlatList,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { getMutualConnections } from '../helper/Api';
export default class MutualConnectionImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users:[]
    };
  }
async componentDidMount(){
    await getMutualConnections(this.props.userId).then(response => {
        // console.log(response)
        this.setState({users:response.Users})
    });

}
IconImage = (item) => {
    let name = item.FirstName.charAt(0);
    return (   
    <View style={[styles.logo,{alignItems:'center',justifyContent: 'center',backgroundColor:'#7b1fa2',borderColor:'#7b1fa2'}]}>
    <Text style={{fontSize:28,fontWeight:'600',color:'white'}}>{name}</Text>
  </View>
    )
  };
  render() {
    return (
        <View style={{marginTop: 10}}>
        <FlatList
          data={this.state.users}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('mutualConnections')
              }
              style={styles.listView}>
              {item.Pictures.length !== 0 && (
                <Image
                  style={styles.ImageView}
                  source={{uri: item.Pictures[0].Profile_Url}}
                />
              )}
              {item.Pictures.length === 0 && item.Profile && (
                <Image
                  style={styles.ImageView}
                  source={{uri: item.Profile}}
                />
              )}
              {item.Pictures.length === 0 &&
                !item.Profile &&
                this.IconImage(item)}
            </TouchableOpacity>
          )}
        />
      </View>
 );
  }
}

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderRadius: 30,
        marginLeft:5
      },
})