import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Modal } from "react-native";
import  IdeaIcon  from '../assets/images/idea.svg';
import Smalltip from "./tipsmall";
import { PromptWords } from "../app/api/interface";
 export const  Idea = () => {
    const [tipstate, setTipstate]=useState(false);
  return(
    <>
    <Pressable style={styles.findIcon} onPress={() =>{ setTipstate(true);
    }}>
        <IdeaIcon width={24} height={26}></IdeaIcon>
      </Pressable>
            <Modal
              animationType="slide"
              transparent={true}
              visible={tipstate}
              onRequestClose={() => setTipstate(false)}
            >
              <Pressable style={styles.modalMask} onPress={() => setTipstate(false)}>
                <Pressable
                  style={styles.modalContent}
                  onPress={(e) => e.stopPropagation()}
                >
                  <Smalltip
                    borderColor="#B7E0FE"
                    textColor="#41A1FC"
                    tagText="直觉"
                    tagColor="#41A1FC"
                    describeText="基于第一感受与当下情绪"
                    kind={PromptWords.intuition}
                  ></Smalltip>
                  <Smalltip
                    borderColor="#FFCCD2"
                    textColor="#FFA9BF"
                    tagText="空间"
                    tagColor="#FC9AA4"
                    describeText="关注个体在空间中的位置与方向"
                    kind={PromptWords.structure}
                  ></Smalltip>
                  <Smalltip
                    borderColor="#CFE9DC"
                    textColor="#6DBD95"
                    tagText="观念"
                    tagColor="#6DBD95"
                    describeText="围绕意义、主题与表达"
                    kind={PromptWords.concept}
                  ></Smalltip>
                </Pressable>
              </Pressable>
            </Modal></>
      
  )
};
const styles = StyleSheet.create({
  findIcon: {
   justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
  },
   modalMask: {
    flex: 1,
    backgroundColor: "rgba(21, 24, 30, 0.2)",
    justifyContent: "flex-end",
  },
  // 抽屉内容
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
});