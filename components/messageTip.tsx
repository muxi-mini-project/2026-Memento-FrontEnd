import { View, StyleSheet, ImageBackground, Text } from "react-native";
export default function MessageTip() {
  return (
    <View style={styles.tips}>
      <View style={styles.touxiang}>
        {/* <ImageBackground source={'../../'}/> */}
      </View>
      <View>
        <Text>2026/1/22 10:03</Text>
        <Text>和你有共鸣</Text>
        {/* 后边传props启发或共鸣 */}
      </View>
      <View style={styles.zuopin}>{/* 封面缩略图 */}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  tips: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    height: 80,
    width: "100%",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    borderWidth: 0,
  },
  touxiang: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#585858",
    marginRight: 14,
  },
  zuopin: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#70c1dc",
    marginLeft: 124,
  },
});
