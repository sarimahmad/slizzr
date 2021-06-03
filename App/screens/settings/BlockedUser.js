import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {FONT} from '../../helper/Constant';
import Header from '../../component/Header';
import {SafeAreaView} from 'react-navigation';

export default class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedUser: [
        {id: 1, name: 'Christina Sin'},
        {id: 2, name: 'Sandra Martinez'},
        {id: 3, name: 'Gerald Martinez'},
        {id: 4, name: 'Bryan Jordan'},
        {id: 5, name: 'Keith Santos'},
        {id: 6, name: 'Tiffany Pena'},
      ],
    };
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <Header
            headerTitle={'Blocked Users'}
            navigation={this.props.navigation}
            route={'SettingsNavigation'}
        
          />
          <FlatList
            data={this.state.blockedUser}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.blockView}>
                <View style={styles.directionView}>
                  <Image
                    style={styles.imageView}
                    source={require('../../assets/Slizzer-icon/Oval.png')}
                  />
                  <Text style={styles.textView}>{item.name}</Text>
                </View>
                <View>
                  <Image
                    style={styles.image2}
                    source={require('../../assets/Slizzer-icon/cross.png')}
                  />
                </View>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  contextView: {
    flex: 1,
  },
  blockView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 80,
    alignItems: 'center',
  },
  directionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    color: '#494949',
  },
  image2: {
    width: 35,
    height: 35,
    marginRight: 22,
  },
});
