import React, { Fragment } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import { LocationItem } from "../component/LocationItem";
// import { colors, fonts } from "../Theme";
import {API_KEY} from "../helper/Constant"

export default class GoogleSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedFormattedAddress: "" };
  }

  setSelectedFormattedAddress = (formattedAddress) => {
    this.setState({ selectedFormattedAddress: formattedAddress });
  };

  render() {
    return (
      <View style={styles.googleSearchBar}>
        <GoogleAutoComplete
          apiKey={API_KEY}
          debounce={2000}
          minLength={3}
          queryTypes=""
          // components="country:ca"
        >
          {({
            handleTextChange,
            locationResults,
            fetchDetails,
            isSearching,
            clearSearch,
            inputValue,
          }) => {
            return (
              <Fragment>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter Location"
                    onChangeText={handleTextChange}
                    value={inputValue || this.props.Address}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => this.props.closeLocationModal()}
                  >
                    <Text style={styles.addButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                {isSearching && <ActivityIndicator />}
                {this.state.selectedFormattedAddress != inputValue && (
                  <ScrollView>
                    {locationResults.map((el) => (
                      <LocationItem
                        {...el}
                        key={el.id}
                        fetchDetails={fetchDetails}
                        setFormatedAddress={handleTextChange}
                        setSelectedFormattedAddress={
                          this.setSelectedFormattedAddress
                        }
                        setLocation={this.props.setLocation}
                        getAddress={this.props.getAddress}
                      />
                    ))}
                  </ScrollView>
                )}
              </Fragment>
            );
          }}
        </GoogleAutoComplete>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    // height: 53,
    margin: 10,
    width: "90%",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
    // fontFamily: fonts.fbo,
    justifyContent: "center",
    fontSize: 14,
    color: "grey",
    borderColor: 'grey', // "rgba(0, 0, 0, 0.247487)",
  },
  inputWrapper: {
    flexDirection: "row",
  },
  addButtonText: {
    fontSize: 17,
    justifyContent: "center",
  },
  addButton: { justifyContent: "center" },
  googleSearchBar: {
    //marginHorizontal: 10,
  },
});
