import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header, Button } from "../../../components";
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
  sourceArray: string[];
}

interface itemProp {
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
    const { fetchNewsData } = this.props;
    fetchNewsData();
  }

  tryReload = () => {
    const { fetchNewsData } = this.props;
    fetchNewsData();
  }

  render() {
    const { navigation, imageData, fetchMoreImageData, loading, news, sourceArray } = this.props;
    const { page, limit } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title=""
          rightButtonPress={() => { navigation.navigate("SetSource"); }}
          leftButtonPress={() => navigation.openDrawer()}
        />
        {!sourceArray.length &&
          <View style={styles.noNews}>
            <Text style={styles.titleStyle}>
              {'The source is not defined'}
            </Text>
          </View>
        }

        {!!sourceArray.length && !!!news.length &&
          <View style={styles.noNews}>
            <Text style={styles.titleStyle}>
              {'Try reload or set another source'}
            </Text>
            <Button text="Try reload" onPress={this.tryReload} />
          </View>
        }

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
  loading: state.loading,
  sourceArray: state.sourceArray,
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
