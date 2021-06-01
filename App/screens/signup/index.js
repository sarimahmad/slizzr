


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
         <SafeAreaView style={styles.contentView}>
        <ScrollView >
          
          <View  style={{ alignItems: 'center'}}>
            <View style={styles.flex}>
             <Image style={styles.logo} source={require('../../assets/logo.png')} />
             <Text style={styles.titleText}>ing Up</Text>
             </View>
            
              <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop:'5%'}}>
               
               <View style={{marginRight:6}}>
               <TextField  placeholder='First Name' type="small"/>
               </View>
               <View style={{marginLeft:6}}>
              
               <TextField  placeholder='Last Name' type="small"/>
               </View>
               </View>
               <TextField  placeholder='Email adress' />
               <TextField  placeholder='Password' />
               <TextField  placeholder='ConfirmPassword' />
               <ButtonResetPassaword btnLabel={'SIGN UP'} data={this.handleSubmit}/>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signin")} style={{marginTop:26,flexDirection:'row'}}>
            
                 <Text style={styles.subtitletext}>Already have an account?</Text>
                 <Text style={[styles.subtitletext,{color:'#F818D9'}]}> Log in</Text>
           </TouchableOpacity>
              <Text style={[styles.subtitletextbold,{marginTop:10}]}>Other sign up options</Text>
           
              <View style={styles.btnFaceBook}>
                <View
                  style={{
                    position: 'absolute',
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 44,
                    backgroundColor: 'white',
                    left: 30,
                  }}>
                  <Image source={require('../../assets/facebook.png')} />
                </View>
                <TouchableOpacity>
                  <Text style={styles.btnText}>Continue with Facebook</Text>
                </TouchableOpacity>
              </View>


              <View style={styles.btnGoogle}>
                <View
                  style={{
                    position: 'absolute',
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 44,
                    backgroundColor: 'white',
                    left: 30,
                  }}>
                  <Image source={require('../../assets/google.png')} />
                </View>
                <TouchableOpacity>
                  <Text style={styles.btnText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>

             
                <View style={{marginTop:25,}}>
                 <Text style={{fontSize:12}}>By signing up, you agree to Slizzr’s </Text>
                <View style={{flexDirection:'row'}}>
                <Text style={[styles.text,{fontSize:12}]}>Terms of Service</Text>
                <Text style={{fontSize:12}}> and </Text>
                <Text  style={[styles.text,{fontSize:12}]}>Privacy Policy.</Text>
                
                </View>
                
                 </View>
                 </View>
         </ScrollView>
         </SafeAreaView>
      
       </View>
     );
   }
 }
  const styles = StyleSheet.create({
    logo: {
      height: 65,
      width: 65,
      resizeMode: 'contain',
      marginTop: 25,
    
      alignSelf: 'center',
    },
    flex:{
        flexDirection:'row',
        alignItems:'flex-end',
    },
    text:{
      color:'#F818D9',
      fontFamily: FONT.Nunito.regular,
     
    },
    textPurple:{
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.regular,
      fontSize: 14,
    
    },
    titleText: {
      marginTop: 26,
     
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.bold,
      fontSize: 28,
      alignSelf: 'flex-end',
    },  
    subtitletext:{
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.regular,
      fontSize: 15,
    },
    subtitletextbold:{
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.bold,
      fontSize: 14,
    },
    detailWrapper: {
      alignSelf: 'center',
   
    
    },
    wrapperView: {
      flex:1,
      backgroundColor: WHITE.dark,
 
    },
    contentView: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      width:SCREEN.width-40,
      backgroundColor: WHITE.dark,
 
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
      height: 55,
      backgroundColor: '#3664A2',
      width: '100%',
      borderRadius: 25,
      height: 55,
      justifyContent: 'center',
      marginTop: 10,
    },
    btnText: {
      textAlignVertical: 'center',
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      fontFamily:FONT.Nunito.bold,
      color: '#f1f1f2',
    },
   
    btnGoogle: {
      height: 55,
      backgroundColor: '#FF3B30',
      width: '100%',
      borderRadius: 25,
      height: 55,
      justifyContent: 'center',
      marginTop: 19,
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
