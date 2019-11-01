import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import shortid from 'shortid';
import { Header, Button } from "../../../components";
import styles from "./styles";
import { NewsItem } from "../../../components";
import {
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

class NewsList extends Component<Props, {}> {

  componentDidMount() {
    const { fetchNewsData } = this.props;
    fetchNewsData();
    console.log('componentDidMount')
  }

  componentDidUpdate(prevProps: Props) {
    const sourceUrl = this.props.navigation.getParam('sourceUrl', '');
    const prevSourceUrl = prevProps.navigation.getParam('sourceUrl', '');
    const { fetchNewsData } = this.props;
    if ((prevSourceUrl !== sourceUrl) && !!sourceUrl) {
      console.log('componentDidUpdate if sourceUrl', sourceUrl, prevSourceUrl)
      fetchNewsData(sourceUrl);
    }
    console.log('componentDidUpdate')
  }

  tryReload = () => {
    const { fetchNewsData } = this.props;
    fetchNewsData();
  }

  render() {
    const { navigation, loading, news, sourceArray } = this.props;
    return (
      <View style={styles.container}>
        <Header
          iconName='ios-menu'
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

        {!!sourceArray.length && !!!news.length && !loading &&
          <View style={styles.noNews}>
            <Text style={styles.titleStyle}>
              {'Try reload or set another source'}
            </Text>
            <Button text="Try reload" onPress={this.tryReload} />
          </View>
        }

        <FlatList
          data={news}
          keyExtractor={item => shortid.generate()}
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
          refreshing={loading}
          onRefresh={this.tryReload}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  news: state.news,
  loading: state.loading,
  sourceArray: state.sourceArray,
});

function bindToAction(dispatch: any) {
  return {
    fetchNewsData: (sourceUrl?: string) =>
      dispatch(fetchNewsData(sourceUrl)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(NewsList);
