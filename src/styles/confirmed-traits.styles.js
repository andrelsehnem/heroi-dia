import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default StyleSheet.create({
  area: {
    marginHorizontal: 20,
    marginBottom: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  title: {
    color: COLORS.yellow,
    fontFamily: "Anton_400Regular",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  count: {
    color: COLORS.green,
    fontFamily: "Courier New",
    fontSize: 11,
    fontWeight: "900",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  trait: {
    width: "48%",
    minHeight: 54,
    backgroundColor: "#e2f1e5",
    borderWidth: 2,
    borderColor: COLORS.ink,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 7,
  },
  traitCopy: {
    flex: 1,
  },
  label: {
    color: "#51715a",
    fontFamily: "Courier New",
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  value: {
    color: COLORS.ink,
    fontFamily: "Georgia",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  empty: {
    minHeight: 58,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.muted,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  emptyText: {
    color: COLORS.muted,
    fontFamily: "Courier New",
    fontSize: 11,
  },
});
