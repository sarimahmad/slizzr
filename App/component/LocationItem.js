import React, { PureComponent } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export class LocationItem extends PureComponent {
  handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id);
    this.props.setFormatedAddress(res.formatted_address);

    this.props.setSelectedFormattedAddress(res.formatted_address);
    this.props.setLocation(
      res.geometry.location.lat,
      res.geometry.location.lng
    );
    this.props.getAddress(res.formatted_address);
  };

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this.handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
  },
});
