import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { colors } from "../../../constants";
import { ListItem } from "../../../components/ListItem";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class SideBar extends Component<Props, {}> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ListItem
          title="News List"
          onPress={() => navigation.navigate("NewsList")}
        />
        <ListItem
          title="Source List"
          onPress={() => navigation.navigate("SourceList")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  }
});

export default SideBar;
