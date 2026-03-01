import { StyleSheet, View, Text, Pressable, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {  useRouter } from "expo-router";
import React, { use } from "react";
import Edit from "../../assets/images/edit.svg";
import Message from "../../assets/images/message.svg";
import Configure from "../../assets/images/configure.svg";
import HomeCard from "../../components/homeCard";

export default function HomeScreen() {
    const router = useRouter();

  return (
    
    <ScrollView>
      <SafeAreaView style={styles.container}>
      
        <Pressable style={[styles.ConfigureIcon, { right: 74 }]} onPress={()=>{router.navigate("/message")}}>
          <Message />
        </Pressable>
        <View style={styles.chatnum}>
          <Text style={styles.numtext}>12</Text>
        </View>
          <Pressable style={styles.ConfigureIcon}  onPress={()=>{router.navigate("/configure")}}>
          <Configure />
        </Pressable>
        <View style={styles.touxiangcontainer}>
          <View style={styles.touxiang}></View>
          <Text style={styles.username}>用户名</Text>
          <Pressable
            onPress={() => {
              console.log("换头像");
            }}
            style={styles.editkuang}
          >
            <Edit />
          </Pressable>
          {/* <View style={styles.goodmm}>
            <ImageBackground source={'../../assets/images/goodmm.svg'}/>
          </View> */}
          <View style={styles.sumcontainer}>
            <View style={styles.sumitem}>
              <Text style={styles.sumnumber}>xxx</Text>
              <Text style={styles.sumlable}>官方作品</Text>
            </View>
            <View style={styles.sumitem}>
              <Text style={styles.sumnumber}>xxx</Text>
              <Text style={styles.sumlable}>自定义作品</Text>
            </View>
          </View>
        </View>
        <View style={styles.listheader}>
          <Text>自定义关键词</Text>
          <Pressable
            onPress={() => {
              console.log("新建自定义关键词");
            }}
          >
            <Text style={{ fontSize: 12, color: "#999999" }}>+新建</Text>
          </Pressable>
        </View>
        <ScrollView>
          <HomeCard hasAim={true}></HomeCard>
          <HomeCard hasAim={false}></HomeCard>
          <HomeCard hasAim={false}></HomeCard>
          <HomeCard hasAim={false}></HomeCard>
          <HomeCard hasAim={false}></HomeCard>
        </ScrollView>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  ConfigureIcon: {
    width: 36,
    height: 36,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 54,
    right: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  chatnum: {
    width: 16,
    height: 16,
    position: "absolute",
    backgroundColor: "#FE585B",
    top: 53,
    right: 69,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  numtext: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: 700,
  },
  touxiangcontainer: {
    position: "relative",
    height: 375,
    width: "100%",
    // backgroundColor: '#fdfdfd',后续背景是头像
  },
  touxiang: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 118,
    left: 138,
    borderRadius: 50,
    backgroundColor: "#858181", //后边改图片
  },
  username: {
    position: "absolute",
    top: 225,
    left: 158,
    fontSize: 20,
    color: "#3D3D3D",
    fontWeight: "700",
    marginTop: 7,
  },
  editkuang: {
    position: "absolute",
    top: 190,
    left: 213,
    backgroundColor: "#72B6FF",
    width: 26,
    height: 26,
    borderRadius: 13,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  goodmm:{
    width:150,
    height:150,
    position:"absolute",
    top:198,
    right:11,
    backgroundColor:"#ffffff"
  },
  sumcontainer: {
    height: 100,
    width: 327,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 96,
    position: "absolute",
    top: 287,
    left: 24,
  },
  sumitem: {},
  sumnumber: {
    fontSize: 36,
    color: "#3D3D3D",
  },
  sumlable: {
    fontSize: 14,
    color: "#3D3D3D",
  },
  listheader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 180,
    marginTop: 39,
  },
});
