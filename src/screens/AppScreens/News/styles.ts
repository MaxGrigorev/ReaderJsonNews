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
  date: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: 'right',
  },
  linkContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  }
});

export default styles;
