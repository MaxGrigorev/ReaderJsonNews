import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Input, Button, Header } from "../../../components";
import {
  setSource
} from "../../../redux/actions/fetch";
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  setSource: (sourceUrl: string) => void;
}
interface userData {
  username: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required()
});

class SetSource extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation, setSource } = this.props;
    setSource(values.username)
    console.log(values, "handleLogin");
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
            {/* <ScrollView bounces={false}> */}
            <Formik
              initialValues={{ username: "", }}
              // validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                // console.log(props, "fdsfsdfdsf");
                return (
                  <View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Enter source url"
                        value={props.values.username}
                        onChangeText={props.handleChange("username")}
                        onBlur={props.handleBlur("username")}
                        error={props.touched.username && props.errors.username}
                      />
                      <Button text="Setup the source" onPress={props.handleSubmit} />
                    </View>
                  </View>
                );
              }}
            </Formik>
            {/* </ScrollView> */}
          </KeyboardAvoidingView>
        </View>
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
    setSource: (sourceUrl: string) =>
      dispatch(setSource(sourceUrl)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(SetSource);
