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
  sourceItem: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexWrap: 'nowrap',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
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
