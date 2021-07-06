/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import { ScrollView } from 'react-native';
import {newPaymentMethod} from '../../helper/Api'
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import {connect} from 'react-redux';

import Validations from '../../helper/Validations';
 class NewpayoutMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountholderName:'',
      accountholderType:'',
      routing_Number:'',
      state:'',
      account_number:'',
      editType: true,
      country:'',
      isModalVisible: false,
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      btnTwoText: '',
     
    };
  }
  isFormFilled() {
    let checkaccount_holder_name = Validations.checkUsername(this.state.accountholderName);
    let checkaccount_holder_type = Validations.checkUsername(this.state.accountholderType,);
    let checkrouting_number = Validations.checkUsername(this.state.routing_Number);
    let checkaccount_number = Validations.checkUsername(this.state.account_number);
  
    if (
      checkaccount_holder_name &&
      checkaccount_holder_type &&
      checkrouting_number &&
      checkaccount_number 
    ) {
      return true;
    }
    if (!checkaccount_holder_name) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add accountholderName in form',
      });
    } else if (!checkaccount_holder_type) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add account_holder_type in form',
      });
    } else if (!checkrouting_number) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add routing_Number in form',
      });
    } else if (!checkaccount_number) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add account_number in form',
      });
    } 
    return false;
  }
 
  newPayoutMethod = async()=>{
   if(this.isFormFilled()){
     let formData = new FormData();
     formData.append('account_holder_name', 'Krutik Parikh')
     formData.append('account_holder_type', 'individual')
     formData.append('routing_number', '11000-000')
     formData.append('account_number', '000123456789')
     formData.append('user_id', 'm22czqOm5yOSzHu0WcwfTcDWTTb2')
     formData.append('host_id', 'acct_1J76Rq4PqXr6wNe4')
   
  //    let data={
  //   account_holder_name:'Krutik Parikh',
  //   account_holder_type:'individual',
  //   routing_number:'11000-000',
  //   account_number:'000123456789',
  //   user_id:'m22czqOm5yOSzHu0WcwfTcDWTTb2',
  //   host_id:'acct_1J76Rq4PqXr6wNe4'
  //  }
    this.setState({loading:true})
   
    await newPaymentMethod(formData).then((response) => {
      console.log(response)
if(response.message=="Successfully Added Card"){
      this.props.navigation.navigate("paymentsandPayouts2")
      this.setState({loading:false})
}else{
  alert("Failed")
  this.setState({loading:false})

}
    });
  }
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <ScrollView>
          {this.state.editType ? (
            <View>
              <HeaderWithOptionBtn
                headerTitle={'New Payout Method'}
                backColor={WHITE.dark}
                borderBottom={true}
                leftIcon={require('../../assets/back.png')}
                leftPress={() => this.props.navigation.goBack()}
              />

              <View style={styles.blockView}>
                <Text style={styles.textView}>Bank Transfer</Text>
                <TouchableOpacity
                  onPress={() => this.setState({editType: false})}>
                  <Image
                    style={styles.sideImage}
                    source={require('../../assets/listDetail.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <HeaderWithOptionBtn
                headerTitle={'Bank Transfer'}
                backColor={WHITE.dark}
                borderBottom={true}
                leftIcon={require('../../assets/back.png')}
                leftPress={() => alert()}
              />
              <View style={styles.blockView2}>
                      <TextInput
                        style={styles.firstInput}
                        placeholder={'Account Holder Name'}
                        onChangeText={value => this.setState({accountholderName: value})}
                        value={this.state.accountholderName}
                        
                      />
                      <TextInput
                        style={styles.firstInput}
                        placeholder={'Account Holder Type'}
                        onChangeText={value => this.setState({accountholderType: value})}
                        value={this.state.accountholderType}
                        
                      />
            
                      <TextInput
                        style={styles.firstInput}
                        placeholder={'Routing No'}
                        onChangeText={value => this.setState({routing_Number: value})}
                        value={this.state.city}
                        
                      />
             
                      <TextInput
                        style={styles.firstInput}
                        placeholder={'Account No'}
                        onChangeText={value => this.setState({account_number: value})}
                        value={this.state.account_number}
                        
                      />
             
              </View>
              <TouchableOpacity onPress={()=>this.newPayoutMethod()} style={styles.btn}>
                <Text style={styles.btntext}>SAVE</Text>
              </TouchableOpacity>
            </View>
          )}
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError === true && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => this.setState({popUpError: false})}
              doneButtonPress={() => this.setState({popUpError: false})}
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

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewpayoutMethod);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  blockView: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockView2: {
    marginTop: 30,
    alignItems: 'center',
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    marginLeft: 20,
    marginVertical: 26,
    color: '#494949',
  },
  sideImage: {
    marginRight: 20,
  },
  TextInputWrapper: {
    justifyContent: 'center',
    width: SCREEN.width - 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  firstInput: {
    width: SCREEN.width - 40,
    height: 53,
    marginTop:20,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    alignSelf: 'center',
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    marginBottom:10,
    backgroundColor: 'black',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
});
