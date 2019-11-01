import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  },
  loadingFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  noNews: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "500"
  }
});

export default styles;
