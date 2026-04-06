import { Link, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Arrowback from "../assets/images/arrow-back.svg";
import ArrowRight from "../assets/images/arrow-auth.svg";
import { SettingButton } from "@/components/settingbutton";
import { useSettingStore } from "./stores/authstore";
import { use, useCallback, useEffect } from "react";
import { getMeSetting, updateMeNotificationSettings, updatePublicable } from "./api/me";
export default function Configure() {
  const public_pool_enabled=useSettingStore((state) => state.public_pool_enabled);
  const setPublicPoolEnabled=useSettingStore((state) => state.setPublicPoolEnabled);
  const reaction_enabled=useSettingStore((state) => state.reaction_enabled);
  const setReactionEnabled=useSettingStore((state) => state.setReactionEnabled);
  const creation_reminder_enabled=useSettingStore((state) => state.creation_reminder_enabled);
  const setCreationReminderEnabled=useSettingStore((state) => state.setCreationReminderEnabled);
  const router = useRouter();
  const handleout = async () => {
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("user_name");
    router.navigate("/signin");
  };
  const getSetting=async ()=>{
    const res=await getMeSetting()
    setPublicPoolEnabled(res.data.public_pool_enabled)
    setReactionEnabled(res.data.reaction_enabled)
    setCreationReminderEnabled(res.data.creation_reminder_enabled)
  }
  useEffect(()=>{
    getSetting()
  },[router])
  const handleUpdatePublicable=useCallback(()=>{
    updatePublicable(public_pool_enabled)
  },[public_pool_enabled])
  const handleUpdateNotificationSettings=useCallback(()=>{
    updateMeNotificationSettings(reaction_enabled,creation_reminder_enabled)

  },[reaction_enabled,creation_reminder_enabled])
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
      <View
        style={{
          paddingHorizontal: 24,
          width: "100%",
          backgroundColor: "#F9F9F9",
        }}
      >
        <Text style={styles.titletext}>账号</Text>
        <View style={[styles.kuang, { flexDirection: "row" }]}>
          <Text>个人资料</Text>
          <Pressable
            style={{ position: "absolute", top: 25, right: 22 }}
            onPress={() => {
              router.navigate("/setAuthdata");
            }}
          >
            <ArrowRight style={{ width: 5, height: 10 }}></ArrowRight>
          </Pressable>
        </View>

        <Text style={styles.titletext}>隐私权限</Text>
        <View style={[styles.kuang, { flexDirection: "row",gap:30 }]}>
          <Text>是否公开官方关键词下上传的照片</Text>
      
                        {public_pool_enabled ? (
                  <Pressable
                    style={[styles.changebtn,{backgroundColor:"#72B6FF",alignItems:"flex-end",paddingRight:1}]}
                    onPress={() => setPublicPoolEnabled(!public_pool_enabled)}
                  >
                    <View style={styles.circle}></View>
                  </Pressable>
                ) : (
                  <Pressable style={styles.changebtn} onPress={() => {setPublicPoolEnabled(!public_pool_enabled),handleUpdatePublicable}}>
                    <View style={styles.circle}></View>
                  </Pressable>
                )}
        </View>
        <Text style={styles.titletext}>通知设置</Text>
        <View style={styles.kuang}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>互动通知</Text>
                 { reaction_enabled? (
                  <Pressable
                    style={[styles.changebtn,{backgroundColor:"#72B6FF",alignItems:"flex-end",paddingRight:1}]}
                    onPress={() => {setReactionEnabled(!reaction_enabled),handleUpdateNotificationSettings}}
                  >
                    <View style={styles.circle}></View>
                  </Pressable>
                ) : (
                  <Pressable style={styles.changebtn} onPress={() => setReactionEnabled(!reaction_enabled)}>
                    <View style={styles.circle}></View>
                  </Pressable>
                )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>创作提醒</Text>
                      {creation_reminder_enabled ? (
                  <Pressable
                    style={[styles.changebtn,{backgroundColor:"#72B6FF",alignItems:"flex-end",paddingRight:1}]}
                    onPress={() => {setCreationReminderEnabled(!creation_reminder_enabled),handleUpdateNotificationSettings}}
                  >
                    <View style={styles.circle}></View>
                  </Pressable>
                ) : (
                  <Pressable style={styles.changebtn} onPress={() => setCreationReminderEnabled(!creation_reminder_enabled)}>
                    <View style={styles.circle}></View>
                  </Pressable>
                )}
          </View>
        </View>

        <Text style={styles.titletext}>关于</Text>
        <View style={styles.kuang}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>用户协议</Text>
            <Text>点击查看</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.font}>隐私政策</Text>
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
          style={[styles.kuang, { marginTop: 20, alignItems: "center" }]}
          onPress={handleout}
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
    justifyContent: "center",
    paddingLeft: 1,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
  },
});
