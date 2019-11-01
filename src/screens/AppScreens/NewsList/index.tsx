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
  news: any[];
}

interface itemProp {
  // item: any;
  title: string;
  date: Date,
  shortDescription: string,
  imageUrl: string,
  description: string,
}

interface State {
  page: number;
  limit: number;
}

class NewsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20
    };
  }

  componentDidMount() {
    const { fetchImageData, fetchNewsData } = this.props;
    const { page, limit } = this.state;
    fetchImageData(page, limit);
    fetchNewsData();
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation, imageData, fetchMoreImageData, loading, news } = this.props;
    const { page, limit } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title=""
          rightButtonPress={() => { navigation.navigate("SetSource"); }}
        />
        <FlatList
          data={news}
          keyExtractor={item => String(Math.random())}// TODO key
          renderItem={({ item }: { item: itemNews }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("News", { news: item })}
              >
                <NewsItem
                  avatar={item.imageUrl}
                  title={item.title}
                  subTitle={item.shortDescription}
                />
              </TouchableOpacity>
            );
          }}
          onEndReached={() => {
            this.setState({ page: page + 1 });
            fetchMoreImageData(page + 1, limit);
          }}
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingFooter}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  imageData: state.data,
  news: state.news,
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
)(NewsList);
