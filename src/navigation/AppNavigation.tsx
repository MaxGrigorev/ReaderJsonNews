import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import NewsList from "../screens/AppScreens/NewsList";
import News from "../screens/AppScreens/News";
import SetSource from "../screens/AppScreens/SetSource"
import SourceList from "../screens/AppScreens/SourceList"

import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";

const MainStack = createStackNavigator(
  {
    Home: { screen: Home },
    NewsList: { screen: NewsList },
    News: { screen: News },
    SetSource: { screen: SetSource },
    SourceList: { screen: SourceList },
  },
  {
    initialRouteName: "NewsList",
    headerMode: "none"
  }
);

const AppStack = createDrawerNavigator(
  {
    MainStack: { screen: MainStack },
    Blank: { screen: Blank }
  },
  {
    drawerWidth: width - 50,
    drawerPosition: "left",
    contentComponent: props => <SideBar {...props} />
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AppStack: AppStack
    },
    {
      initialRouteName: "AppStack"
    }
  )
);
