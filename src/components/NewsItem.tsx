import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ImageBackground
} from "react-native";
// import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import { colors } from "../constants";

interface Props extends ViewProps {
  title: string | undefined;
  avatar: string | undefined;
  subTitle: string | undefined;
}

export class NewsItem extends Component<Props, {}> {
  render() {
    const { title, avatar, subTitle } = this.props;
    return (
      <View {...this.props} style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: avatar }}
          style={styles.avatarStyle}
        />
        <HTMLView
          value={`<p>${title}</p>`}
          stylesheet={styleTitle}
        />
        <HTMLView
          value={`<p>${subTitle}</p>`}
          stylesheet={styleSubTitle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  avatarStyle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center"
  }
});

const styleSubTitle = StyleSheet.create({
  p: {
    fontSize: 14,
    color: colors.textColor
  }
});

const styleTitle = StyleSheet.create({
  p: {
    fontSize: 20,
    color: colors.textColor
  }
});