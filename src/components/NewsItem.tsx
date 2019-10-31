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
  title: string;
  avatar: string;
  subTitle: string;
}

export class NewsItem extends Component<Props, {}> {
  render() {
    const { title, avatar, subTitle } = this.props;
    return (
      <View {...this.props} style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: avatar }}
          style={styles.avatarStyle}
        >

        </ImageBackground>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.subTitleStyle}>{subTitle}</Text>
        {/* <WebView
          originWhitelist={['*']}
          // ref={'webview'}
          // automaticallyAdjustContentInsets={false}
          // style={styles.webView}
          source={{ html: title }} /> */}
        {/* <WebView
          originWhitelist={['*']}
          source={{ html: '<h1>Hello world</h1>' }}
        /> */}
        <HTMLView
          value={subTitle}
        // stylesheet={styles}
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
  titleStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textColor
  },
  subTitleStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textColor
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
