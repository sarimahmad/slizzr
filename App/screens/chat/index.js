import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BLACK, BLUE, WHITE, APPCOLOR } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import { width, height } from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserImages, getUserProfile } from '../../helper/Api';
import { GiftedChat,Bubble,InputToolbar} from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import Loader from '../../component/Loader';

const chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [CurrentUser, setCurrentUser] = useState({})
  const [HostProfile, setHostProfile] = useState({})
  const [CurrentUserProfilePicture, setCurrentUserProfilePicture] = useState("")
  const [HostUserProfilePicture, setHostUserProfilePicture] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [messages, setMessages] = useState([]);

  const { CurrentUserUID, HostUID, EventID,AttendeesList,chatType } = route.params;

  useEffect(() => {
    getUserDetails().then(() =>  {
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    // getAllMessages()

    const docid  = HostUID > CurrentUserUID ? CurrentUserUID+ "-" + HostUID : HostUID+"-"+CurrentUserUID 
      const messageRef = firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt',"desc")

    const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
          const allmsg =   querySnap.docs.map(docSanp=>{
           const data = docSanp.data()
           if(data.createdAt){
               return {
                  ...docSanp.data(),
                  createdAt:docSanp.data().createdAt.toDate()
              }
           }else {
              return {
                  ...docSanp.data(),
                  createdAt:new Date()
              }
           }
              
          })
          setMessages(allmsg)
      })


      return ()=>{
        unSubscribe()
      }

      
    }, [])

  async function getUserDetails() {
    await getUserProfile(CurrentUserUID).then(response => {
      setCurrentUser(response)
    })

    await getUserProfile(HostUID).then(response => {
      setHostProfile(response)
    })

    await getUserImages(CurrentUserUID).then(response => {
      if (response.Pictures.length === 0) {
        setCurrentUserProfilePicture('https://storage.googleapis.com/slizzr-6a887.appspot.com/DefaultProfile.png')
      } else {
        setCurrentUserProfilePicture(response.Pictures[0].Profile_Url)
      }
    })

    await getUserImages(HostUID).then(response => {
      if (response.Pictures.length === 0) {
        setHostUserProfilePicture('https://storage.googleapis.com/slizzr-6a887.appspot.com/DefaultProfile.png')
      } else {
        setHostUserProfilePicture(response.Pictures[0].Profile_Url)
      }
    })
  }

  const getAllMessages = async ()=>{
    const docid  = HostUID > CurrentUserUID ? CurrentUserUID+ "-" + HostUID : HostUID+"-"+CurrentUserUID 
    const querySanp = await firestore().collection('chatrooms')
    .doc(docid)
    .collection('messages')
    .orderBy('createdAt',"desc")
    .get()
   const allmsg =   querySanp.docs.map(docSanp=>{
        return {
            ...docSanp.data(),
            createdAt:docSanp.data().createdAt.toDate()
        }
    })
    setMessages(allmsg)


 }

 const onSend = async(messageArray) => {
  const msg = messageArray[0]
  const mymsg = {
      ...msg,
      sentBy:CurrentUserUID,
      sentTo:HostUID,
      createdAt:new Date(),
      eventId: EventID,
      user:CurrentUser
  }
 setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
 const docid  = HostUID > CurrentUserUID ? CurrentUserUID+ "-" + HostUID : HostUID+"-"+CurrentUserUID 

 firestore().collection('chatrooms')
 .doc(docid)
 .collection('messages')
 .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
   

}

  if (isLoading) {
    return (
      <View style={styles.wrapperView}>
        {isLoading && <Loader loading={isLoading} />}
      </View>
    )
  }
  return (
    <View style={styles.wrapperView}>

      <SafeAreaView style={styles.contentView}>
        <HeaderWithOptionBtn

          borderBottom={true}
          backColor={WHITE.dark}
          headerTitle={HostProfile.User && HostProfile.User.displayName}
          leftPress={() => navigation.goBack()}
          leftIcon={require('../../assets/back.png')}
          profileIcon={isLoading ? 'https://storage.googleapis.com/slizzr-6a887.appspot.com/DefaultProfile.png' : (HostUserProfilePicture)}
        />
          <View style={{flex: 1 }}>
          <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: CurrentUserUID,
                }}
                renderBubble={(props)=>{
                    return <Bubble
                    {...props}
                    timeTextStyle={{
                      left: {
                        color: 'black',
                      },
                      right: {
                        color: 'black',
                      },
                    }}
                    textStyle={{
                      left: {
                        color: 'black',
                      },
                      right: {
                        color: 'black',
                      },
                    }}
                    wrapperStyle={{
                      right: {
                        backgroundColor:"#EBE5F1",
                      },
                      left:{
                        backgroundColor:"#F818D9",
                      },
                    }}
                  />
                }}

                renderInputToolbar={(props)=>{
                    return <InputToolbar {...props}
                     containerStyle={{borderTopWidth: 1.5, borderTopColor: '#EBE5F1'}} 
                     textInputStyle={{ color: "black" }}
                     />
                }}
                
                />
          </View>
      </SafeAreaView>
    </View>
  );
}
export default chat
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  myMessages: {
    backgroundColor: '#F818D9',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 66,
    width: SCREEN.width * 0.75,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherMessages: {
    backgroundColor: '#EBE5F1',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 66,
    width: SCREEN.width * 0.75,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detail: {
    flexDirection: 'row',
    width: wp('60%'),
    paddingTop: 10,
  },
  next: {
    paddingTop: 15,
  },

  imgView: {
    width: wp('20%'),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    paddingVertical: 10,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 36,
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
