import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { NewsItem } from "../../../components";
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

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
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
          rightButtonPress={() => this.handleLogout()}
        />
        <NewsItem
          avatar={news.imageUrl}
          title={news.title}
          subTitle={news.description}
        />

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
