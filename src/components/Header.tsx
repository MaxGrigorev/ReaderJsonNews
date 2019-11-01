import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  title: string;
  leftButtonPress?: () => void;
  rightButtonPress?: () => void;
}

export class Header extends Component<Props, {}> {
  render() {
    const { title, leftButtonPress, rightButtonPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {!!leftButtonPress &&
            <TouchableOpacity style={styles.iconButton} onPress={leftButtonPress}>
              <Icon name="ios-arrow-back" size={24} />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.midContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          {rightButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={rightButtonPress}
            >
              <Text style={styles.rightButton}>{'Setup the source'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  rightButton: {
    color: colors.primary,
    fontWeight: "600"
  },
  leftContainer: {
    flex: 2,
    alignItems: "flex-start"
  },
  midContainer: {
    flex: 1,
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  rightContainer: {
    flex: 2,
    alignItems: "flex-end"
  },
  iconButton: {
    paddingHorizontal: 16
  }
});
