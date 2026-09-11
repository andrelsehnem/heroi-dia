import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.yellow,
    marginBottom: 18,
  },
  kicker: {
    color: COLORS.yellow,
    fontFamily: "Courier New",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 11,
    marginBottom: 3,
  },
  title: {
    color: COLORS.paper,
    fontFamily: "Anton_400Regular",
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: 0.3,
  },
  stamp: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.red,
    borderWidth: 3,
    borderColor: COLORS.ink,
    transform: [{ rotate: "-8deg" }],
    alignItems: "center",
    justifyContent: "center",
  },
  stampText: {
    color: "#fff",
    fontFamily: "Anton_400Regular",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 14,
  },
});
