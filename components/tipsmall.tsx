import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Createway } from "./createway";

interface SmalltipProps {
  borderColor: string;
  textColor: string;
  tagText: string;
  tagColor: string;
  describeText: string;
}
export default function Smalltip({
  borderColor,
  textColor,
  tagText,
  tagColor,
  describeText,
}: SmalltipProps) {
  const [detail, setDetail] = useState(false);

  return (
    <>
      <Pressable
        style={[
          styles.findkuang,
          {
            borderColor: borderColor,
          },
        ]}
        onPress={() => setDetail(true)}
      >
        <Text style={[styles.findtext]}>{tagText}</Text>
        <Text style={[styles.findsmalltext, { color: textColor }]}>
          {describeText}
        </Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={detail}
        onRequestClose={() => setDetail(false)}
      >
        <Pressable style={styles.modalMask} onPress={() => setDetail(false)}>
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.findkuang, { borderColor: borderColor }]}>
              <Text style={[styles.ideatext, { color: textColor }]}>
                提示提示提示提示
              </Text>
              <Text style={[styles.smalltext, { color: tagColor }]}>
                {tagText}
              </Text>
            </View>
            <Text style={styles.modalTitle}>有灵感了？马上试试</Text>
            <Createway />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalMask: {
    flex: 1,
    backgroundColor: "rgba(21, 24, 30, 0.2)",
    justifyContent: "flex-end",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: 429,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  findkuang: {
    display: "flex",
    flexDirection: "column",
    width: 335,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    marginBottom: 20,
    paddingLeft: 22,
    gap: 6,
    position: "relative",
  },
  smalltext: {
    fontSize: 16,
    fontFamily: "思源黑体",
    position: "absolute",
    right: 15,
    top: 65,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  ideatext: {
    fontSize: 22,
    fontWeight: "400",
  },
  findtext: {
    color: "#333333",
    fontSize: 22,
    fontWeight: "400",
  },
  findsmalltext: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 4,
  },
});
