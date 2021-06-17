//FormButton.js
import React from "react";
import { Button } from "react-native-elements";

const FormButton = ({
  title,
  buttonType,
  buttonStyle,
  buttonColor,
  onPress,
  titleStyle,
  disabled,
  enableColor,
  family,
  ...rest
}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{
      //borderColor: buttonColor,
      borderRadius: 27.5,
      ...buttonStyle,
      height: 55,
      backgroundColor:  !disabled ? enableColor ? enableColor : "#1E1E1E" :   "8E8E8E",
    }}
    disabled={disabled}
    onPress={onPress}
    titleStyle={[{
      // fontWeight: "bold",
      fontSize: 14,
      fontFamily: family ? family : "Nunito-Regular",
      color: "#FFFFFF",
    }, titleStyle]}
  />
);

export default FormButton;
