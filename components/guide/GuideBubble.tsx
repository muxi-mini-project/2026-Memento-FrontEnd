import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { GuideBubblePlacement } from "./types";

type GuideBubbleProps = {
  bubbleLeft: number;
  bubbleTop: number;
  description: string;
  isLastStep: boolean;
  onPrimaryPress: () => void;
  onSkip: () => void;
  placement: GuideBubblePlacement;
  tailLeft: number;
  title: string;
};

export default function GuideBubble({
  bubbleLeft,
  bubbleTop,
  description,
  isLastStep,
  onPrimaryPress,
  onSkip,
  placement,
  tailLeft,
  title,
}: GuideBubbleProps) {
  const tailPositionClass =
    placement === "bottom" ? "-top-2 border-l border-t" : "-bottom-2 border-b border-r";

  return (
    <Animated.View
      entering={FadeIn.duration(220)}
      exiting={FadeOut.duration(140)}
      style={{
        left: bubbleLeft,
        top: bubbleTop,
        width: 304,
      }}
      className="absolute"
    >
      <View
        className={`absolute h-4 w-4 rotate-45 border-[#D2E1FF] bg-white ${tailPositionClass}`}
        style={{ left: tailLeft }}
      />
      <View className="rounded-[28px] border border-[#D2E1FF] bg-white px-5 pb-5 pt-4">
        <Text className="mt-3 text-lg font-semibold text-[#22304A]">
          {title}
        </Text>
        <Text className="mt-2 text-sm leading-6 text-[#5D6B84]">
          {description}
        </Text>
        <View className="mt-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={onSkip}
              className="rounded-full border border-[#D2E1FF] px-4 py-2"
            >
              <Text className="text-sm font-medium text-[#5D6B84]">跳过</Text>
            </Pressable>
            <Pressable
              onPress={onPrimaryPress}
              className="rounded-full bg-[#72B6FF] px-4 py-2"
            >
              <Text className="text-sm font-medium text-white">
                {isLastStep ? "完成" : "下一步"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
