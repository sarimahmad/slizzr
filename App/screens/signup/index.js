


import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native';
import TextField from '../../component/TextField/index';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ButtonResetPassaword from '../../component/ButtonResetPassword';

 export default class SignUp extends Component {
   constructor(props) {
     super(props);
     this.state = {
       firstName: '',
       lastName: '',
       email: '',
       password: '',
       confirmPassword: ''
     };
   }
   storeInputData = (text, type) => {
     if (type === "firstName") {
       this.setState({ firstName: text });
     } else if (type === "lastName") {
       this.setState({ lastName: text });
     } else if (type === "email") {
       this.setState({ email: text });
     } else if (type === "password") {
       this.setState({ password: text });
     } else if (type === "confirmPassword") {
       this.setState({ confirmPassword: text });
     }
   };
   handleSubmit = () => {
     this.props.navigation.navigate("BirthDate")
   }
   render() {
     return (
       <View style={styles.wrapperView}>
        <ScrollView >
          
          <SafeAreaView style={{ alignItems: 'center'}}>
            <View style={styles.flex}>
             <Image style={styles.logo} source={require('../../assets/logo.png')} />
             <Text style={styles.titleText}>ing Up</Text>
             </View>
            
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop:'5%'}}>
               
               <View style={{marginRight:'2%'}}>
               <TextField  placeholder='First Name' type="small"/>
               </View>
               <View style={{marginLeft:'2%'}}>
              
               <TextField  placeholder='Last Name' type="small"/>
               </View>
               </View>
               <TextField  placeholder='Email adress' />
               <TextField  placeholder='Password' />
               <TextField  placeholder='ConfirmPassword' />
               <ButtonResetPassaword btnLabel={'SIGN UP'} data={this.handleSubmit}/>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signin")} style={{marginVertical:'1%',flexDirection:'row'}}>
            
                 <Text >Already have an account?</Text>
                 <Text> Log in</Text>
           </TouchableOpacity>
              <Text style={styles.policyText}>Other sign up options</Text>
           
             <View style={styles.btnFaceBook}>
              <Image  source={require('../../assets/socialFaceBook.png')} />
              </View>
              <View style={styles.btnGoogle}>
              <Image  source={require('../../assets/socialGoogle.png')} />
              </View>
          
                <View style={{marginTop:'10%'}}>
                 <Text >By signing up, you agree to Slizzr’s </Text>
                 <Text> Terms of Service and Privacy Policy.</Text>
                 </View>
         </SafeAreaView>
         </ScrollView>
      
       </View>
     );
   }
 }
  const styles = StyleSheet.create({
    logo: {
      height: 82,
      width: 62,
      resizeMode: 'contain',
      marginTop: 25,
    
      alignSelf: 'center',
    },
    flex:{
        flexDirection:'row',
        alignItems:'flex-end',
    },
    titleText: {
      marginTop: 13,
      marginBottom: '3%',
    //   color: BLACK.textInputTitle,
    //   fontFamily: FONT.Nunito.bold,
      fontSize: 24,
      alignSelf: 'flex-end',
    },  
    detailWrapper: {
      alignSelf: 'center',
   
    
    },
    wrapperView: {
      height:hp('100%'),
      width:wp('100%'),
    
      flexDirection:'column'

    
    },
//     btnText: {
//       fontSize: 16,
//       alignSelf: 'center',
//       fontFamily: FONT.Nunito.medium,
//       fontSize: 14,
//       color: BLACK.textInputTitle,
//   ​
//     },
    policyText: {
   
      alignSelf: 'center',
      marginTop:'2%',
      color: BLACK.appDark,
      fontFamily: FONT.Nunito.regular,
    },
    btnFaceBook: {
        height:hp('5%'),
        marginTop:'5%'
        
      },
    btnGoogle: {
        height:hp('5%'),
        marginTop:'10%' 
    },
//     absoluteLeftIcon: {
//       position: 'absolute',
//       left: 10,
//     },
//     flex: {
//       flexDirection: 'row'
//     },
//     alreadyHaveAccount: {
//       fontSize: 14,
//       fontFamily: FONT.Nunito.regular,
//       color: BLACK.textInputTitle,
//       alignSelf: 'center',
//       marginTop: 19,
//     }
  });
