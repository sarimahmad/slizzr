import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import Swiper from 'react-native-swiper';
class introduction extends Component {
  state = {};
 async componentDidMount() {
   
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <SafeAreaView style={styles.container}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.detailText}>
            Revolutionize the way you host and attend events!
          </Text>

          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            paginationStyle={styles.paginationStyle}
            activeDot={<View style={styles.selectedDotView} />}
            dot={<View style={styles.unselectedDotView} />}>
            <View style={styles.slide1}>
              <View style={styles.ImageWrapper}>
                <Image
                  style={styles.getStartedImg}
                  source={require('../../assets/9.png')}
                />
              </View>
            </View>
            <View style={styles.slide2}>
              <View style={styles.ImageWrapper}>
                <Image
                  style={styles.getStartedImg}
                  source={require('../../assets/8.png')}
                />
              </View>
            </View>
            <View style={styles.slide3}>
              <View style={styles.ImageWrapper}>
                <Image
                  style={styles.getStartedImg}
                  source={require('../../assets/1472.png')}
                />
              </View>
            </View>
          </Swiper>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}
            style={styles.getStartedBtn}
            activeOpacity={0.8}>
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signin')}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default introduction;

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
    marginTop: 20,
  },
  paginationStyle: {
    // backgroundColor:'green',
  },
  selectedDotView: {
    backgroundColor: 'grey',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  unselectedDotView: {
    backgroundColor: 'lightgrey',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDots: {
    backgroundColor: 'grey',
    width: 16,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  wrapper: {
    backgroundColor: WHITE.dark,
    height: 379,
  },
  slide1: {
    elevation: 10,
  },
  slide2: {
    elevation: 10,
  },
  slide3: {
    elevation: 10,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE.dark,
  },
  detailText: {
    fontSize: 20,
    fontFamily: FONT.Nunito.regular,
    color: BLACK.grey,
    marginTop: 15,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  getStartedImg: {
    alignSelf: 'center',
    resizeMode: 'stretch',
    marginTop: 30,
    height: SCREEN.height / 2.2,
    width: SCREEN.width - 180,
    borderRadius: 15,
  },
  ImageWrapper: {
    alignSelf: 'center',
    marginTop: 30,
    height: SCREEN.height / 2.2,
    width: SCREEN.width - 180,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
      },
      android: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 120,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
        backgroundColor: 'white',
        height: SCREEN.height + 20,
      },
    }),
  },
  getStartedBtn: {
    height: 55,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK.btn,
    borderRadius: 27.5,
  },
  loginText: {
    fontSize: 14,
    color: BLACK.grey,
    fontFamily: FONT.Nunito.bold,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 14,
    color: WHITE.dark,
    fontFamily: FONT.Nunito.bold,
    alignSelf: 'center',
  },
});
