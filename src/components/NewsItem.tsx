import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ImageBackground
} from "react-native";
import stripHtml from "string-strip-html";
import HTMLView from "react-native-htmlview";
import { colors } from "../constants";

interface Props extends ViewProps {
  title?: string;
  avatar?: string;
  subTitle: string;
  stripHtmlDescription?: boolean;
}

const defaultProps = Object.freeze({
  stripHtmlDescription: true,
  subTitle: '',
})

export class NewsItem extends PureComponent<Props, {}> {

  public static readonly defaultProps = defaultProps

  render() {
    const {
      title,
      avatar,
      subTitle,
      stripHtmlDescription,
    } = this.props;

    const subTitlevalue = stripHtmlDescription ? `<p>${stripHtml(subTitle)}</p>` : `<p>${subTitle}</p>`

    return (
      <View {...this.props} style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: avatar }}
          style={styles.avatarStyle}
        />
        <HTMLView
          value={`<p>${stripHtml(title)}</p>`}
          stylesheet={styleTitle}
        />
        <HTMLView
          value={subTitlevalue}
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