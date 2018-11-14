import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Text } from "react-native";
import { renderChildElements } from "@shoutem/ui/html";

export default class CustomHeader extends React.Component {
  render() {
    return (
      <View>
        {<Header {...this.props} />}
      </View> 
    );
  }
};