import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';

import Header from '../../component/Header';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import {getAllBlockedUsers} from '../../helper/Api';
import Loader from '../../component/Loader';
import {connect} from 'react-redux';
import {FONT, SCREEN} from '../../helper/Constant';
 class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      blockedUser: [
        // {id: 1, name: 'Christina Sin'},
        // {id: 2, name: 'Sandra Martinez'},
        // {id: 3, name: 'Gerald Martinez'},
        // {id: 4, name: 'Bryan Jordan'},
        // {id: 5, name: 'Keith Santos'},
        // {id: 6, name: 'Tiffany Pena'},
      ],
    };
  }
  componentDidMount(){
    this.blockedUsers()
  }
  async blockedUsers() {
    this.setState({loading:true})
    await getAllBlockedUsers(this.props.userToken).then(response => {
      this.setState({blockedUser: response.Users});
      this.setState({loading:false})
    });
  }
  emptyListComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          display: 'flex',
          marginTop: SCREEN.height / 4,
        }}>
          <View>
            <Text style={styles.emptyFont}>
              No Blocked User .
            </Text>
          </View>
      </View>
    );
  };
 
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
            ListEmptyComponent={this.emptyListComponent}
            
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.blockView}>
                <View style={styles.directionView}>
                  <Image
                    style={styles.imageView}
                    source={require('../../assets/Slizzer-icon/Oval.png')}
                  />
                  <Text style={styles.textView}>{item.Friend.displayName}</Text>
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
        {this.state.loading && <Loader loading={this.state.loading} />}
     
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BlockedUser);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  emptyFont: {
    fontSize: 20,
    textAlign: 'center',
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    marginBottom: 20,
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
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    color: BLACK.grey,
  },
  image2: {
    width: 35,
    height: 35,
    marginRight: 22,
  },
});
