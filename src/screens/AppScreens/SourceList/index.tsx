import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import shortid from 'shortid';
import { Header } from "../../../components";
import styles from "./styles";
import {
  fetchNewsData,
  deleteSource,
} from "../../../redux/actions";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchNewsData: () => void;
  loading: boolean;
  news: any[];
  sourceArray: string[];
  deleteSource: (index: number) => void;
}

class SourceList extends Component<Props, {}> {

  render() {
    const { navigation, loading, sourceArray, deleteSource } = this.props;
    return (
      <View style={styles.container}>
        <Header
          iconName='ios-menu'
          title="SOURCE"
          rightButtonPress={() => { navigation.navigate("SetSource"); }}
          leftButtonPress={() => navigation.closeDrawer()}
        />
        {!sourceArray.length &&
          <View style={styles.noNews}>
            <Text style={styles.titleStyle}>
              {'The source is not defined'}
            </Text>
          </View>
        }

        {!!sourceArray.length &&
          <TouchableOpacity
              onPress={() => {navigation.navigate("NewsList", { sourceUrl: null,channel:null });navigation.closeDrawer()}}
            >
            <View style={styles.sourceItem}>
                <Text style={styles.titleStyle}>
                  {'All channel'}
                </Text>
            </View>
          </TouchableOpacity>
        }

        <FlatList
          data={sourceArray}
          keyExtractor={item => shortid.generate()}
          renderItem={({ item, index }: { item: string, index: number }) => {
            return (
              <TouchableOpacity
                onPress={() => {navigation.navigate("NewsList", { sourceUrl: item,channel:index+1 });navigation.closeDrawer()}}
              >
                <View style={styles.sourceItem}>
                  <View style={{ flex: 10 }}>
                  <Text style={styles.titleStyle}>
                      {'Channel '+index+1}
                    </Text>
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
  news: state.news,
  loading: state.loading,
  sourceArray: state.sourceArray,
});

function bindToAction(dispatch: any) {
  return {
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
