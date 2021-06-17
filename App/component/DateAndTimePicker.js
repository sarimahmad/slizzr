console.disableYellowBox = true;
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "react-moment";

import FormButton from "./FormButton";
import { SCREEN } from "../helper/Constant";

export default class DateAndTimePicker extends React.Component {
  state = {
    clearGoogleSearch: true,
    show: false,
    platform: true,
    dateTime: null,
  };
  // platform true === android
  // platform false === ios
  componentDidMount = () => {
    if (Platform.OS === "ios") {
      this.setState({ platform: false });
    }
    // this.setState({ dateTime: this.props.value });
  };
  show = () => this.setState({ show: true });
  OnChange = (event, selectedValue) => {
    console.log("event", event);
    if (event.type != "dismissed") {
      this.setState({ dateTime: selectedValue, show: false });
      this.props.setDateAndTime(selectedValue);
    } else {
      this.setState({ show: false });
    }
  };
  _onConfirm = () => {
    this.setState({ show: false });
    this.props.setDateAndTime(this.state.dateTime);
  };

  datePicker = () => {
    if (this.state.platform) {
      if (this.state.show)
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.props.value}
            mode={this.props.mode}
            is24Hour={false}
            display="spinner"
            onChange={this.OnChange}
            onTouchCancel={(value) => {
              console.log("touch cancel", value);
              this.setState({ show: false });
            }}
          />
        );
    } else {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.show}
        >
          <View style={styles.iosPicker}>
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.dateTime}
              mode={this.props.mode}
              is24Hour={false}
              display="spinner"
              onChange={this.OnChange}
            />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={this._onConfirm}
                title="CONFRIM"
                buttonColor="#F57C00"
              />
            </View>
          </View>
        </Modal>
      );
    }
  };

  render() {
    return (
      <View style={styles.content}>
    
        <View style={styles.inputRight}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ show: true });
            }}
          >
            <Image source={require('../assets/calendar-range.png')} width={15.37} height={20} style={{marginRight:10,marginBottom:5}}/>
          </TouchableOpacity>
        </View>

        {this.state.dateTime != null ? (
          <Moment
            style={this.props.datebutton}
            element={Text}
            format={this.props.format}
          >
            {this.state.dateTime}
          </Moment>
        ) : (
          <View style={this.props.datebutton}>
            {/* <Text
              style={{
                // fontFamily: fonts.fbo,
                fontSize: 20,
                marginLeft: 20,
              }}
            >
              {"Birth Date"}
            </Text> */}
          </View>
        )
        }

        {this.datePicker()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
  
  },
  firstSlot: {
    borderColor: "rgba(0, 0, 0, 0.247487)",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
    width: "80%",
  },
  iosPicker: {
    marginTop: "50%",
  },
  buttonContainer: {
    margin: 25,
  },
  input: {
    borderColor: "rgba(0, 0, 0, 0.247487)",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
  },
  inputRight: {
    borderColor: "rgba(0, 0, 0, 0.247487)",
    borderWidth: 1,
    width:SCREEN.width-40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
   
    borderRadius: 10,
    borderRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
  
    paddingLeft: 0,
    paddingRight: 0,
  },
});
