import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Arrowback from "../assets/images/arrow-back.svg";
import { useRouter } from "expo-router";
import ArrowRight from "../assets/images/arrow-auth.svg";
import { use, useEffect, useState } from "react";
import { updateMeNickname } from "./api/me";
import { useMyStore } from "./stores/authstore";
import * as ImagePicker from "expo-image-picker";
import BaseTouXiang from "../assets/images/baseTouxiang.svg";
export default function setAuthdata() {
  const name = useMyStore((state) => state.nickname);
  const avatar_url = useMyStore((state) => state.avatar_url);
  const email = useMyStore((state) => state.email);
  const setNickname = useMyStore((state) => state.setNickname);
  const setAvater = useMyStore((state) => state.setAvater);
  const router = useRouter();
  const updateMyname = async () => {
    try {
      const res = await updateMeNickname(name);
      setNickname(res.data.nickname);
    } catch (error) {
      console.error("请求失败：", error);
      if ((error as any).code === "ECONNABORTED") {
        alert("请求超时，请检查网络或稍后重试");
      } else {
        alert("加载失败，请稍后重试");
      }
    }
  };

  // 后续上传头像逻辑
  const handleAvater = () => {
    handleOpenGallery();
  };
  const handleOpenGallery = async () => {
    // 申请相册权限
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("需要相册权限才能选择照片");
      return;
    }
    // 打开相册
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      allowsMultipleSelection: false,
      mediaTypes: "images",
      allowsEditing: false,
    });
    if (!result.canceled) {
    }
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={styles.arrowback}
        >
          <Arrowback />
        </Pressable>
        <Text style={styles.headertext}>个人资料</Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          width: "100%",
          backgroundColor: "#F9F9F9",
        }}
      >
        <View style={styles.body}>
          <View style={styles.kuang}>
            <Text style={styles.text}>头像</Text>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              {avatar_url ? <Image /> : <BaseTouXiang></BaseTouXiang>}
            </View>
            <Pressable style={styles.ArrowRight} onPress={handleAvater}>
              <ArrowRight></ArrowRight>
            </Pressable>
          </View>
          <View style={styles.kuang}>
            <Text style={styles.text}>昵称</Text>
            <Text>{name}</Text>
            <Pressable
              style={styles.ArrowRight}
              onPress={() => {
                router.navigate("/updateName");
              }}
            >
              <ArrowRight></ArrowRight>
            </Pressable>
          </View>
          <View style={styles.kuang}>
            <Text style={styles.text}>账号</Text>
            <Text>{email}</Text>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 44,
    width: "100%",
    marginTop: 44,
    alignItems: "center",
    justifyContent: "center",
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
  },
  body: {
    height: 130,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    paddingHorizontal: 23,
    paddingTop: 16,
  },
  kuang: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: "#666666",
    marginRight: 36,
  },
  ArrowRight: {
    width: 5,
    height: 10,
    position: "absolute",
    right: 0,
  },
});
