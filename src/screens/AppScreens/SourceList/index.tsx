import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Button } from "../../../components";
import styles from "./styles";
import { NewsItem } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {
  fetchImageData,
  fetchMoreImageData,
  fetchNewsData,
  deleteSource,
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
  deleteSource: (index: number) => void;
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

class SourceList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20
    };
  }

  render() {
    const { navigation, imageData, fetchMoreImageData, loading, news, sourceArray, deleteSource } = this.props;
    const { page, limit } = this.state;
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

        <FlatList
          data={sourceArray}
          keyExtractor={item => String(Math.random())}// TODO key
          renderItem={({ item, index }: { item: string, index: number }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("NewsList", { sourceUrl: item })}
              >
                <View style={styles.sourceItem}>
                  <View style={{ flex: 10 }}>
                    <Text style={styles.titleStyle}>
                      {item}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => { deleteSource(index) }}
                    >
                      <Icon name={'ios-trash'} size={40} />
                    </TouchableOpacity>
                  </View>
                </View>

              </TouchableOpacity>
            );
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
    deleteSource: (index: number) =>
      dispatch(deleteSource(index)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(SourceList);
