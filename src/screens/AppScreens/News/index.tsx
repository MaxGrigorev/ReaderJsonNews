import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Linking, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import moment from "moment"
import styles from "./styles";
import { NewsItem, Button, Header } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {
  fetchImageData,
  fetchMoreImageData,
  fetchNewsData,
} from "../../../redux/actions/fetch";

import { itemNews } from '../../../redux/reducers'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchImageData: (page?: number, limit?: number) => void;
  fetchMoreImageData: (page?: number, limit?: number) => void;
  fetchNewsData: () => void;
  imageData: any;
  loading: boolean;
}

interface State {
  page: number;
  limit: number;
}

class News extends Component<Props, State> {

  handleClick = () => {
    const { news } = this.props.navigation.state.params;
    Linking.canOpenURL(news.link).then(supported => {
      if (supported) {
        Linking.openURL(news.link);
      } else {
        console.log("Don't know how to open URI: " + news.link);
      }
    });
  };

  render() {
    const { navigation } = this.props;

    const { news } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header
          title="News"
          leftButtonPress={() => navigation.goBack()}
        />
        <NewsItem
          avatar={news.imageUrl}
          title={news.title}
          subTitle={news.description}
          stripHtmlDescription={false}
        />
        <View style={styles.linkContainer}>
          <Text
            style={styles.date}
          >
            {moment(news.date).format('MMMM D YYYY, h:mm A')}
          </Text>
          {news.link &&
            <Button
              text="Open link"
              onPress={this.handleClick}
            />
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  imageData: state.data,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchImageData: (page?: number, limit?: number) =>
      dispatch(fetchImageData(page, limit)),
    fetchMoreImageData: (page?: number, limit?: number) =>
      dispatch(fetchMoreImageData(page, limit)),
    fetchNewsData: () =>
      dispatch(fetchNewsData()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(News);
