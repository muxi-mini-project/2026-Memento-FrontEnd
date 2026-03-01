import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Arrowback from "../assets/images/arrow-back.svg";
import MessageTip from "@/components/messageTip";
export default function Message() {
  const router = useRouter();
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
        <MessageTip/>
         <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
        <MessageTip/>
       
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
