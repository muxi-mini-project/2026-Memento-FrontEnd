import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Arrowback from "../assets/images/arrow-back.svg";
import MessageTip from "@/components/messageTip";
import { use, useEffect,useState } from "react";
import { getNotificationslist } from "./api/me";
import { notfiItem } from "./api/interface";

export default function Message() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<notfiItem[]>([]);
  const [next_cursor, setNext_cursor]=useState("")
  useEffect(()=>{
    const getNotifications=async()=>{
      const res=await getNotificationslist()
      setNotifications(res.data.items)
      setNext_cursor(res.data.next_cursor)
    }
    getNotifications()
  },[])
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Arrowback style={styles.arrowback} />
          <Text style={styles.headertext}>互动</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.messagelist}>
        {
          notifications && notifications.map((item,index)=>{
            return(
              <MessageTip key={index} {...item} />
            )
          })
        }
       
      </ScrollView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
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
    position:"relative",
    backgroundColor:"#fff"
  },
  arrowback: {
    left:26,
    position:"absolute"
  },
  headertext:{
    fontSize: 16,
    fontWeight:500,
    position:"absolute",
    left:164,
  },
  messagelist:{
    backgroundColor:"#FBFBFD",
    width:"100%"
  }
});
