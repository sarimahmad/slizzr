/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import FlipCard from 'react-native-flip-card';
// import { colors, fonts, images } from "../Theme";
import {Dimensions} from 'react-native';
export default class FlipImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
    };
  }

  flipCard = () => {
    this.setState({flip: !this.state.flip});
  };

  render() {
    const {flip} = this.state;
    const {imageUrl, Name, Description, Address} = this.props;
    const image = {uri: imageUrl};
    return (
      <FlipCard
        style={styles.cardMain}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={flip}
        clickable={true}>
        <View style={[styles.imageHeader]}>
          <Image
            source={image}
            style={{borderRadius: 20, height: 335, width: 335}}
          />
          <TouchableOpacity
            onPress={() => this.flipCard()}
            style={{
              position: 'absolute',
              top: 15,
              height: 35,

              width: 35,
              borderRadius: 60,
              backgroundColor: 'white',
              left: 15,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Image
              style={{marginLeft: 5}}
              source={require('../assets/group.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageHeader2}>
          <TouchableOpacity
            onPress={() => this.flipCard()}
            style={{
              borderWidth: 1,
              height: 35,
              width: 35,
              borderRadius: 24,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/backEvent.png')}
              style={styles.logo}
            />
          </TouchableOpacity>

          <Text style={[styles.titleText, {textAlign: 'center'}]}>{Name}</Text>
          <View style={{minHeight: 80}}>
            <Text
              style={[
                styles.subtitleText,
                {textAlign: 'center', fontSize: 12},
              ]}>
              {Description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(178, 171, 177, 0.246039)',
              padding: 20,
              marginHorizontal: 20,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <Image
              source={require('../assets/location.png')}
              style={{height: 16, width: 12}}
            />

            <Text style={{marginLeft: 5}}>{Address}</Text>
          </View>
        </View>
      </FlipCard>
    );
  }
}

const styles = StyleSheet.create({
  cardMain: {
    flex: 1,
    // paddingHorizontal: 10,
  },
  imageHeader2: {
    elevation: 5,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    height: 335,
  },
  imageHeader: {
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    marginBottom: 20,
    shadowOpacity: 0.1,
    height: 335,
  },
  options: {
    width: 35,
    height: 35,
    borderRadius: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 25,
    top: 15,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  poster: {
    // flex: 1,
    borderRadius: 20,
    width: Dimensions.get('window').width - 40,
    height: 350,

    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImageBackground: {
    borderRadius: 20,
    resizeMode: 'stretch',
  },
  flipBackButton: {
    position: 'absolute',
    left: 25,
    top: 20,
    width: 35,
    height: 35,
    borderColor: '#B2ABB1',
    borderWidth: 1,
    borderRadius: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipBackButtonImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  flipBackTitle: {
    fontSize: 17,
    // fontFamily: ,
    textAlign: 'center',
    color: 'grey',
    width: '100%',
  },
  flipCardBack: {
    // flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 20,
    elevation: 1,
    height: 350,
    // position: "absolute",
    // marginTop: 20,
  },
  flipText: {
    fontSize: 12,
    // fontFamily: fonts.fre,
    textAlign: 'center',
    color: '#494949',
    paddingHorizontal: 30,
  },
  distance: {
    // display: "flex",
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    flexDirection: 'row',
    marginVertical: 60,
    borderRadius: 15,
    width: Dimensions.get('window').width - 80,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: 'rgba(178, 171, 177, 0.246)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  distanceText: {
    color: '#494949',
    // fontFamily: fonts.fre,
    fontSize: 12,
  },
  lockIcon: {
    borderRadius: 17,
    // display: "flex",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    // width :'100%',
    // left: 25,
    right: 10,
    top: 15,
    // backgroundColor: "#fff",
    zIndex: 1,
  },
  lockImage: {
    resizeMode: 'cover',
    // flex: 1,
    // height: 30,
    // width: 30,
    // borderWidth: 1,
    // borderRadius :30,
    // borderColor: "white",
  },
  pinMarker: {
    marginRight: 5,
    // height: 25,
    // width: 25,
    resizeMode: 'contain',
  },
});
