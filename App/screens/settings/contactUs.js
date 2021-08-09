/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import Textarea from 'react-native-textarea';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { contactUs } from '../../helper/Api';
import {connect} from 'react-redux';
import Loader from '../../component/Loader';
import Validations from '../../helper/Validations';
 class ContactUs extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      loading:false,
      name:'',
      email:'',
      phone:'',
      message:''
    }
  
    // this.handleEvent = this.handleEvent.bind(this)
  }
  isFormFilledCheck() {
    let name = Validations.checkUsername(this.state.name);
    let email= Validations.checkEmail(this.state.email);
    let phone= Validations.checkUsername(this.state.phone);
    let message = Validations.checkUsername(this.state.message);
    if (name && email && phone && message ) {
      return true;
    }
    if (!name) {
      alert("Failed : invalid name")
    } else if (!email) {
      alert("Failed : invalid email")
    }else if (!phone) {
      alert("Failed : invalid phone")
    }else if (!message) {
      alert("Failed : invalid message")
    }
    return false;
  }

  storeInputData=(value,type)=>{
    if(type==="name"){
      this.setState({name:value})
    }else if(type==="email"){
  this.setState({email:value})
}else if(type==="phone"){
  this.setState({phone:value})
}else if(type==="message"){
  this.setState({message:value})
}
console.log(this.state) 
}
  contact=async ()=>{
    if(this.isFormFilledCheck()){
      const data = {
        name: this.state.name,
        email: this.state.email,
        phone:this.state.phone,
        message: this.state.message,
        
      };
      this.setState({loading: true});
      await contactUs(data,this.props.userToken).then(response => {
        this.setState({loading: false});
        alert(response.Message)
     
      });
    
  }
}
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            headerTitle={'Contact Us'}
            borderBottom={true}
            leftPress={() => this.props.navigation.pop()}
            leftIcon={require('../../assets/back.png')}
          />
          <Text style={styles.textView}>
            Please fill out this form to contact us and we’ll get back to you as
            soon as we can!
          </Text>
          <View style={styles.inputView}>
            <TextInput  
             onChangeText={(value)=>this.storeInputData(value,"name")}
             style={styles.inputTextView}
              placeholder="Name" />
            <TextInput
              onChangeText={(value)=>this.storeInputData(value,"email")}
              style={styles.inputTextView}
              placeholder="Email Address"
            />
            <TextInput
              onChangeText={(value)=>this.storeInputData(value,"phone")}
            
              style={styles.inputTextView}
              placeholder="Phone Number"
            />
            <Textarea
              onChangeText={(value)=>this.storeInputData(value,"message")}
            
              style={[styles.inputTextView, {height: 159}]}
              maxLength={200}
              placeholder="Message"
            />
          </View>
          <TouchableOpacity onPress={()=>this.contact()} style={styles.btn}>
            <Text style={styles.btntext}> SEND MESSAGE</Text>
          </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);

const styles = StyleSheet.create({
  wrapperView: {
    backgroundColor: WHITE.dark,
    flex: 1,
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    color: '#494949',
  },
  inputView: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputTextView: {
    backgroundColor: WHITE.dark,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    width: SCREEN.width - 40,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    marginTop: 20,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
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
