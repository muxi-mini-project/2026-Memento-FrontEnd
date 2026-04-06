import { View, StyleSheet, Pressable, Text,Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Arrowback from "../assets/images/arrow-back.svg";
import { useRouter } from "expo-router";
import ArrowRight from "../assets/images/arrow-auth.svg";
import { useEffect, useState } from "react";
import { updateMeNickname } from "./api/me";
import { useMyStore } from "./stores/authstore";
import * as ImagePicker from "expo-image-picker";

interface user{
nickname:string
avatar_url:string
email:string
}
export default function setAuthdata() {
    const [userInfo, setUserInfo]=useState<user>(
        {
            nickname: "",
            avatar_url: "",
            email: "",
        }
    )
    const name=useMyStore((state) => state.nickname)
  const router = useRouter();
  useEffect(()=>{
    
    const updateMyname=async()=>{
        try {
    const res = await updateMeNickname(name); 
    setUserInfo(res.data)
  } catch (error) {
    console.error("请求失败：", error);
    if (( error as any).code === 'ECONNABORTED') {
      alert("请求超时，请检查网络或稍后重试");
    } else {
      alert("加载失败，请稍后重试");
    }
  }
    }
    updateMyname()
  
  },[])
  //后续上传头像逻辑
  const handleAvater=()=>{

  }
    // const handleOpenGallery = async () => {
    //   // 申请相册权限
    //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== "granted") {
    //     alert("需要相册权限才能选择照片");
    //     return;
    //   }
    //   // 打开相册
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     quality: 0.8,
    //     allowsMultipleSelection: false, 
    //     mediaTypes: "images", 
    //     allowsEditing: false, 
    //   });
  
    //   if (!result.canceled) {
        
    //     const selectedPhotos = result.assets.map((asset, index) => ({
    //       id: index, 
    //       uri: asset.uri,
    //       width: asset.width, 
    //       height: asset.height,
    //       fileName: asset.fileName, 
    //     }));
  
  
    //     if (typeof onPhotosSelected === "function") {
    //       onPhotosSelected(selectedPhotos);
    //     }
    //     console.log("子组件选中的照片列表:", selectedPhotos);
    //   router.navigate({
    //     pathname: "/beforepulish",
    //       params: {
    //       photos: JSON.stringify(selectedPhotos)
    //     }
    //   })
        
    //   }
    // };
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Arrowback style={styles.arrowback} />
          <Text style={styles.headertext}>个人资料</Text>
        </Pressable>
      </View>
      <View
        style={{
          flex:1,
          paddingHorizontal: 24,
          width: "100%",
          backgroundColor: "#F9F9F9",
        }}
      >
        <View style={styles.body}>
          <View style={styles.kuang}>
            <Text style={styles.text}>头像</Text>
            <View>
                <Image source={{uri: userInfo?.avatar_url}} style={{width: 24, height: 24, borderRadius: 50}}/>
            </View>
            <ArrowRight style={styles.ArrowRight}></ArrowRight>
          </View>
          <View style={styles.kuang}>
            <Text style={styles.text}>昵称</Text>
            <Text>{userInfo?.nickname}</Text>
            <ArrowRight style={styles.ArrowRight}></ArrowRight>
          </View>
            <View style={styles.kuang}>
            <Text style={styles.text}>账号</Text>
            <Text>{userInfo?.email}</Text>
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
  body: {
    width: 327,
    height: 130,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    paddingHorizontal:23,
    paddingTop:16,
  },
  kuang: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  text:{
    fontSize: 14,
    color: "#666666",
    marginRight:36
  },
  ArrowRight:{
    width: 5,
    height: 10,
    position: "absolute",
    right: 0,
  }
});
