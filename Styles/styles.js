import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  filenameText: {
    marginLeft: 20,
    alignSelf: "center",
    flexShrink: 1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    aspectRatio: 1,
  },
  row: {
    margin: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  rowContainer: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  headerContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: "lightgray",
  },
  headerText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export { styles };
