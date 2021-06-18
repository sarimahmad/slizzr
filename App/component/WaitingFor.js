import React from "react";
import { StyleSheet, View, Text, Image, Animated } from "react-native";
// import SlizzrLogo from "../icons/SlizzrLogo.png";
import { useState } from "react";
import { useEffect } from "react";
// import { fonts } from "../Theme";

const WaitingFor = ({ type }) => {
  const [animated, setAnmated] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0.3));
  const [animated2, setAnmated2] = useState(new Animated.Value(0));
  const [opacity2, setOpacity2] = useState(new Animated.Value(0.3));
  const [animated3, setAnmated3] = useState(new Animated.Value(0));
  const [opacity3, setOpacity3] = useState(new Animated.Value(0.3));
  const [animated4, setAnmated4] = useState(new Animated.Value(0));
  const [opacity4, setOpacity4] = useState(new Animated.Value(0.3));

  const animationData = [
    {
      scale: {
        name: animated,
      },
      opacity: {
        name: opacity,
      },
    },
    {
      scale: {
        name: animated2,
      },
      opacity: {
        name: opacity2,
      },
    },
    {
      scale: {
        name: animated3,
      },
      opacity: {
        name: opacity3,
      },
    },
    {
      scale: {
        name: animated4,
      },
      opacity: {
        name: opacity4,
      },
    },
  ];

  useEffect(() => {
    
    this.loop()
    }, []);
  loop=()=>{
    Animated.stagger(500, [
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated, {
            toValue: 3,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),

      Animated.loop(
        Animated.parallel([
          Animated.timing(animated2, {
            toValue: 3,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated3, {
            toValue: 3,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity3, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated4, {
            toValue: 3,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity4, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
 
  }
    return (
    <View style={styles.container}>
      {animationData.map((animation, index) => {
        const { opacity, scale } = animation;
        return (
          <Animated.View
            key={index}
            style={[
              styles.animatedCircles,
              {
                opacity: opacity.name,
                transform: [
                  {
                    scale: scale.name,
                  },
                ],
              },
            ]}
          />
        );
      })}

      <View style={styles.staticImageWrapper}>
        <Image source={require('../assets/logo.png')} style={{height:80,width:80}}/>
      </View>
      <Text style={styles.text}>Finding {type} ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  staticImageWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    position: "absolute",
  },
  text: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 28,
    // fontFamily: fonts.nuniblack,
    position: "absolute",
    bottom: 135,
  },
  animatedCircles: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: "absolute",
    backgroundColor: "#F818D9",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaitingFor;
