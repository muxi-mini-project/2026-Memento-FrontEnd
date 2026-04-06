import { notfiItem } from "@/app/api/interface";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import Inspire from "../assets/images/inspiration.svg";
import Empathy from "../assets/images/resonance.svg";
export default function MessageTip(props: notfiItem) {
  return (
    <View style={styles.tips}>
      <View style={styles.touxiang}>
        <ImageBackground source={{ uri: props.actor_avatar_url }} />
        {props.reaction_type === "inspired" ? (
          <Inspire style={styles.Icon} />
        ) : (
          <Empathy style={styles.Icon}/>
        )}
      </View>
      <View>
        <Text style={{ color: "#999", fontSize: 12 }}>{props.created_at}</Text>
        {props.reaction_type === "inspired" ? (
          <Text style={styles.Inpiretext}>受到了启发</Text>
        ) : (
          <Text style={styles.Inpiretext}>和你有共鸣</Text>
        )}
      </View>
      <View style={styles.zuopin}>
        {props.cover_image !== null && (
          <ImageBackground
            source={{ uri: props.cover_image.variants.card_4x3.url }}
          ></ImageBackground>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tips: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 80,
    width: "100%",
    borderBottomColor: "#EEEEEE",
    flex: 1,
    borderBottomWidth: 1,
    borderWidth: 0,
    position: "relative",
  },
  touxiang: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: 14,
    position: "relative",
  },
  Icon: {
    position: "absolute",
    top:26,
    left:26,
    zIndex:1
  },
  Inpiretext: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
  },
  zuopin: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
    top: 20,
    right: 24,
  },
});
