import React, { Component } from "react";
import { View, Linking, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import moment from "moment"
import styles from "./styles";
import { NewsItem, Button, Header } from "../../../components";
import { fetchNewsData } from "../../../redux/actions";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchNewsData: () => void;
  loading: boolean;
}

class News extends Component<Props, {}> {

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
          title=""
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
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchNewsData: () =>
      dispatch(fetchNewsData()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(News);
