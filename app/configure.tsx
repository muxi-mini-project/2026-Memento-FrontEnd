import { Link, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Arrowback from "../assets/images/arrow-back.svg";
import MessageTip from "@/components/messageTip";
import ArrowRight from "../assets/images/arrow-right.svg";
export default function Configure() {
  const router = useRouter();
    const handleout = async () => {
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("user_name");
    router.navigate("/signin");
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Arrowback style={styles.arrowback} />
          <Text style={styles.headertext}>设置</Text>
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: 24, width: "100%",backgroundColor:"#F9F9F9" }}>
        <Text style={styles.titletext}>个人信息</Text>
        <View style={styles.kuang}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#666666",
                fontSize: 14,
                fontWeight: 400,
                marginRight: 36,
              }}
            >
              昵称
            </Text>
            <Text style={[styles.font, { marginRight: 171 }]}>用户名</Text>
            <Link href={"/name"}>
              <Text>&gt;</Text>
            </Link>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#666666",
                fontSize: 14,
                fontWeight: 400,
                marginRight: 36,
              }}
            >
              账号
            </Text>
            <Text style={styles.font}>1510184933@qq.com</Text>
          </View>
        </View>
        <Text style={styles.titletext}>隐私权限</Text>
        <View style={[styles.kuang, { flexDirection: "row" }]}>
          <Text>是否公开官方关键词下上传的照片</Text>
          <Pressable style={styles.changebtn}></Pressable>
        </View>
        <Text style={styles.titletext}>通知设置</Text>
        <View style={styles.kuang}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>互动通知</Text>
            <Pressable style={styles.changebtn}></Pressable>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>创作提醒</Text>
            <Pressable style={styles.changebtn}></Pressable>
          </View>
        </View>

        <Text style={styles.titletext}>关于</Text>
        <View style={styles.kuang}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>互动通知</Text>
            <Text>点击查看</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>创作提醒</Text>
            <Text>点击查看</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>版本号</Text>
            <Text>xxxxxxxxxxxxx</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>联系我们</Text>
            <Text>xxxxxxxxxx</Text>
          </View>
        </View>
        <Pressable
          style={[styles.kuang,{marginTop:20,alignItems:"center"}]} onPress={handleout}
        >
            <Text>退出登录</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    height: 44,
    width: "100%",
    marginTop: 44,
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
  },
  arrowback: {
    left: 26,
    position: "absolute",
  },
  headertext: {
    fontSize: 16,
    fontWeight: 500,
    position: "absolute",
    left: 164,
  },
  titletext: {
    color: "#999999",
    fontWeight: 400,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 11,
  },
  kuang: {
    width: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 23,
    paddingVertical: 22,
    borderRadius: 20,
  },
  font: {
    color: "#333333",
    fontSize: 14,
  },
  changebtn: {
    height: 20,
    width: 42,
    backgroundColor: "#EEEEEE",
    borderRadius: 99,
  },
});
