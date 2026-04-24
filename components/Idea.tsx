import React, { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import IdeaIcon from "../assets/images/idea.svg";
import { PromptWords } from "../app/api/interface";
import Smalltip from "./tipsmall";
import { GuideRect } from "./guide/types";

type IdeaProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onModalMeasure?: (rect: GuideRect) => void;
};

export const Idea = ({ open, onOpenChange, onModalMeasure }: IdeaProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const contentRef = useRef<View | null>(null);

  const isOpen = open ?? internalOpen;

  const setOpen = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }
  };

  const measureContent = () => {
    contentRef.current?.measureInWindow((x, y, width, height) => {
      if (!width || !height) {
        return;
      }

      onModalMeasure?.({ x, y, width, height });
    });
  };

  return (
    <>
      <Pressable style={styles.findIcon} onPress={() => setOpen(true)}>
        <IdeaIcon width={24} height={26} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent
        visible={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalMask} onPress={() => setOpen(false)}>
          <Pressable
            ref={contentRef}
            collapsable={false}
            style={styles.modalContent}
            onLayout={measureContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Smalltip
              borderColor="#B7E0FE"
              textColor="#41A1FC"
              tagText="直觉"
              tagColor="#41A1FC"
              describeText="基于第一感受与当下情绪"
              kind={PromptWords.intuition}
            />
            <Smalltip
              borderColor="#FFCCD2"
              textColor="#FFA9BF"
              tagText="空间"
              tagColor="#FC9AA4"
              describeText="关注个体在空间中的位置与方向"
              kind={PromptWords.structure}
            />
            <Smalltip
              borderColor="#CFE9DC"
              textColor="#6DBD95"
              tagText="观念"
              tagColor="#6DBD95"
              describeText="围绕意义、主题与表达"
              kind={PromptWords.concept}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
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
