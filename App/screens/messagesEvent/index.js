import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAllMessages, getEventDetail } from '../../helper/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const messagesEvent = (props) => {
  const [messages, SetMessages] = useState([])
  const [currentUID, SetCurrentUID] = useState("")
  const [event, SetEvent] = useState({})
  const navigation = useNavigation()
  const route = useRoute();

  const { EventID } = route.params;

  useEffect(() => {
    getMessage()
    
}, [])

  async function getMessage(){
    const TOKEN = await AsyncStorage.getItem('token');
    if(TOKEN){
      SetCurrentUID(TOKEN)
      await getAllMessages({
        "event_id": EventID,
        "user_id": TOKEN.slice(1, -1),
      }).then((response) => {
        SetMessages(response.Messages)
      }).catch((error) => {
        console.log(error)
      })
  
    }
    if(EventID){
    await getEventDetail(EventID).then((response) => {
      SetEvent(response.Event)
    }).catch((error) => console.log(error))

    }
      
  }
  // Empty Component
  const emptyListComponent = () => {
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
          <Text>No messages to show for this event.</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrapperView}>

      <SafeAreaView style={styles.contentView}>
        <HeaderWithOptionBtn

          borderBottom={true}
          backColor={WHITE.dark}
          leftPress={() => navigation.goBack()}
          leftIcon={require('../../assets/back.png')}
          rightPress={() => navigation.navigate("newMessage")}
          rightIcon={require('../../assets/newMesssage.png')}
          headerTitle={'Messages'}

        />

        <FlatList
          data={messages}
          keyExtractor={item => item._id}
          ListEmptyComponent={emptyListComponent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('chat', {
                CurrentUserUID: currentUID.slice(1, -1), 
                HostUID : item.user.id, 
                EventID : event.id
              })}>
              <View style={styles.flexRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.imgView}>
                    
             {item.Pictures.length > 0 ? (
              <Image
                source={ {uri : item.Pictures[1].Profile_Url}}
                style={styles.logo}
              />
            ) : (
             <View style={[styles.logo,{alignItems:'center',justifyContent: 'center',backgroundColor:'#7b1fa2',borderColor:'#7b1fa2'}]}>
               <Text style={{fontSize:28,fontWeight:'600',color:'white'}}>
                 {  item.user.FirstName.charAt(0).concat(item.user.LastName.charAt(0))    }
                 </Text>
             </View>
            )}

                  </View>
                  <View style={styles.detail}>
                    <Text style={[styles.titleText, { fontFamily: FONT.Nunito.semiBold }]}>{item.user && item.user.displayName}</Text>
                    <Text style={{ color: '#B2ABB1', fontSize: 12 }}>{item.text}</Text>
                  </View>
                </View>  
                {/* <View style={{ height: 23, width: 23, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F818D9', marginRight: 9 }}>
                  <Text style={[styles.titleText, { color: 'white' }]}>{item.Messages && item.Messages.length}</Text>
                </View> */}
              </View>
              <View style={{ height: 1, borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: SCREEN.width }}></View>

            </TouchableOpacity>
          )}
        />

      </SafeAreaView>
    </View>
  );

}

export default messagesEvent

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,

  },

  flexRow: {
    width: SCREEN.width - 40,

    flexDirection: 'row',
    paddingVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',

  },

  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('60%'),
  },
  imgView: {

    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {   height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 30,
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
