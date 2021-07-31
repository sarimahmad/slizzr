/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import {connect} from 'react-redux';
import { getAllRequests,acceptandRejectRequest } from '../../helper/Api';
class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findpeople: [
      ],
    };
  }

  async getAllRequests() {
    this.setState({loading:true})
    await getAllRequests(this.props.userToken).then(response => {
      this.setState({findpeople: response.Users, loading: false});
    });
  }
  async acceptandRejectRequest(status,item) {
 const data={
  current_user_id:this.props.userToken,
    mutual_connection_id:item.MutualConnectionID,
    status:status,

  }
    this.setState({loading:true})
    await acceptandRejectRequest(data).then(response => {
    if(response!==undefined){
    this.setState({
      loading: false,
      errorTitle: 'Successful',
      errorText: response.message,

      btnOneText: 'Ok',
      popUpError: true,
    });
  }else{
    this.setState({
      loading: false,
      errorTitle: 'Failed',
      errorText: "Failed to accept/reject Request",

      btnOneText: 'Ok',
      popUpError: true,
    });
  }
});
    
  }
componentDidMount(){
  this.getAllRequests()
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
          <Text style={styles.emptyFont}>
            You have no notification 
          </Text>
    </View>
  );
};
done = () => {
  this.setState({popUpError: false});
  this.props.navigation.goBack();
};

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            headerTitle={'Notification'}
            leftPress={() => this.props.navigation.openDrawer()}
            leftIcon={require('../../assets/drawer.png')}
          />

          <FlatList
            data={this.state.findpeople}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.emptyListComponent}
            renderItem={({item}) => (
              <View>
                <View style={styles.flexRow}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>             
                         <View style={styles.imgView}>
                    <Image source={require('../../assets/notification2.png')} />
                  </View>
                  <View style={styles.detail}>
                    <Text style={[styles.subtitleText]}>  
                      {item.Friend.displayName}
                    </Text>
                    <Text style={styles.greyText}>{item.adress}</Text>
                  </View>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() =>
                       this.acceptandRejectRequest("ACCEPTED",item)
                      }
                      style={{
                        marginBottom: 5,
                        marginRight: 5,
                        height: 30,
                        width: 30,
                        borderRadius: 24,
                        backgroundColor: '#4CD964',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image source={require('../../assets/check.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                       this.acceptandRejectRequest("REJECTED",item)
                      }
                      style={{
                        marginRight: 5,
                        height: 30,
                        width: 30,
                        borderRadius: 24,
                        backgroundColor: '#FF3B30',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image source={require('../../assets/closeIcon.png')} />
                    </TouchableOpacity>
                  </View>
  
                </View>
                <View
                  style={{
                    hiehgt: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    width: SCREEN.width,
                  }}
                />
              </View>
            )}
          />
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError === true && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => this.done()}
              doneButtonPress={() => this.done()}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
            />
          </Modal>
        )}

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
export default connect(mapStateToProps, mapDispatchToProps)(notification);

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
 
  imgView: {
    width: SCREEN.width * 0.16,
  },
  detail: {},
  contentView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  greyText: {
    fontSize: 12,
    color: BLACK.lightgrey,
    fontFamily: FONT.Nunito.regular,
  },
  flexRow: {
    flexDirection: 'row',
    height: 80,
    width:SCREEN.width-40,
    alignSelf:'center',
    justifyContent: 'space-between',
 
  },

  subtitleText: {
    fontSize: 12,
    color: BLACK.grey,
    fontFamily: FONT.Nunito.semiBold,
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
});
