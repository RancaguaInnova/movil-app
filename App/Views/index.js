
import React from "react";
import Routes from "./Routes";
import { View, Platform, Text } from "react-native";
import viewStyles from "App/styles/views";

const App = () => (
  <View style={{ flex: 1, marginTop: 0 }}>
    <Routes />
  </View>
);

export default App;