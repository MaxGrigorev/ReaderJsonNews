import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Input, Button, Header } from "../../../components";
import {
  setSource
} from "../../../redux/actions";
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  setSource: (sourceUrl: string) => void;
}
interface userData {
  sourceUrl: string;
}

class SetSource extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation, setSource } = this.props;
    setSource(values.sourceUrl)
    navigation.navigate("NewsList");
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title=""
          leftButtonPress={() => navigation.goBack()}
        />
        <View style={styles.formContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Formik
              initialValues={{ sourceUrl: "", }}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Enter source url"
                        value={props.values.sourceUrl}
                        onChangeText={props.handleChange("sourceUrl")}
                        onBlur={props.handleBlur("sourceUrl")}
                      />
                      <Button text="Setup the source" onPress={props.handleSubmit} />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  news: state.news,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    setSource: (sourceUrl: string) =>
      dispatch(setSource(sourceUrl)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(SetSource);
