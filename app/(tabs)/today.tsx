import React, { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";

import Memento from "../../assets/images/memento.svg";
import TalkKuang from "../../assets/images/talkkuang.svg";
import GuideOverlay from "../../components/guide/GuideOverlay";
import { GuideRect, GuideStep, GuideTargetKey } from "../../components/guide/types";
import { PhotoWay, TakePhotoWay } from "../../components/createWay_1";
import { Idea } from "@/components/Idea";
import { getoffcialHome } from "../api/keywords";
import usePromptStore from "../stores/usePromptStore";
import { useGuideStore } from "../stores/useGuideStore";

const { width: screenWidth } = Dimensions.get("window");

const TODAY_GUIDE_STEPS: GuideStep[] = [
  {
    align: "center",
    description: "每一个词，\n都是一种看世界的方式\n今天，我们从这个词开始",
    key: "dailyKeyword",
    placement: "bottom",
    title: "每日关键词",
  },
  {
    align: "right",
    description: "看看别人，\n是如何理解同一个词的",
    key: "publicBrowse",
    placement: "top",
    title: "公共浏览入口",
  },
  {
    align: "right",
    description: "当你不知道该拍什么，\n这里会给你一些可能的方向",
    key: "hintEntry",
    placement: "bottom",
    title: "提示板块入口",
  },
  {
    align: "center",
    description: "这里有不同的观察方向，每天只能选一个\n你更想从哪个方向开始？",
    fallbackKey: "hintEntry",
    key: "ruleHint",
    placement: "top",
    title: "提示选择及查看规则",
  },
];

const isSameRect = (prev: GuideRect | null | undefined, next: GuideRect) => {
  if (!prev) {
    return false;
  }

  return (
    Math.abs(prev.x - next.x) < 1 &&
    Math.abs(prev.y - next.y) < 1 &&
    Math.abs(prev.width - next.width) < 1 &&
    Math.abs(prev.height - next.height) < 1
  );
};

export default function TabTwoScreen() {
  const [dailysentence, setDailysentence] = useState(
    "很多快乐来不及命名,只被当作日常",
  );
  const [keyWords_text, setKeyWords_text] = useState("关键词");
  const [participant_user_count, setParticipant_user_count] = useState(0);
  const [yesterday_user_count, setYesterday_user_count] = useState(0);
  const [ideaOpen, setIdeaOpen] = useState(false);

  const currentStep = useGuideStore((state) => state.currentStep);
  const hasHydrated = useGuideStore((state) => state.hasHydrated);
  const isFinished = useGuideStore((state) => state.isFinished);
  const nextStep = useGuideStore((state) => state.nextStep);
  const complete = useGuideStore((state) => state.complete);

  const [layouts, setLayouts] = useState<
    Partial<Record<GuideTargetKey, GuideRect | null>>
  >({});

  const dailyKeywordRef = useRef<View | null>(null);
  const publicBrowseRef = useRef<View | null>(null);
  const hintEntryRef = useRef<View | null>(null);

  const guideVisible = hasHydrated && !isFinished;

  const updateLayout = useEffectEvent((
    key: GuideTargetKey,
    ref: React.RefObject<View | null>,
  ) => {
    ref.current?.measureInWindow((x, y, width, height) => {
      if (!width || !height) {
        return;
      }

      const nextRect = { height, width, x, y };

      setLayouts((prev) => {
        if (isSameRect(prev[key], nextRect)) {
          return prev;
        }

        return {
          ...prev,
          [key]: nextRect,
        };
      });
    });
  });

  const measureTargets = useEffectEvent(() => {
    updateLayout("dailyKeyword", dailyKeywordRef);
    updateLayout("publicBrowse", publicBrowseRef);
    updateLayout("hintEntry", hintEntryRef);
  });

  const updateRuleHintLayout = useEffectEvent((rect: GuideRect) => {
    setLayouts((prev) => {
      if (isSameRect(prev.ruleHint, rect)) {
        return prev;
      }

      return {
        ...prev,
        ruleHint: rect,
      };
    });
  });

  const date = usePromptStore((state) => state.biz_date);
  const setDate = usePromptStore((state) => state.setdate);
  const setKeywordId = usePromptStore((state) => state.setKeywordId);
  const setBiz_date = usePromptStore((state) => state.setBiz_date);
  const setTodayKeyword = usePromptStore((state) => state.setTodayKeyword);
  const setYesterdaysKeyword = usePromptStore(
    (state) => state.setYesterdaysKeyword,
  );
  const setYesterdaydate = usePromptStore((state) => state.setYesterdaydate);

  const formatDate = (dateStr: string) => {
    if (!dateStr || !dateStr.includes("-")) {
      return dateStr;
    }
    const [year, month, day] = dateStr.split("-");
    const formattedMonth = Number(month).toString();
    const formattedDay = Number(day).toString();
    return `${year}/${formattedMonth}/${formattedDay}`;
  };

  useEffect(() => {
    const fetchKeyWords = async () => {
      try {
        const response = await getoffcialHome();
        const data = response.data;
        const today = data.today;
        const yesterday = data.yesterday;

        setKeyWords_text(today.keyword.text);
        setTodayKeyword(today.keyword.text);
        setDate(today.biz_date);
        setParticipant_user_count(today.participant_user_count);
        setYesterday_user_count(yesterday.participant_user_count);
        setKeywordId(today.keyword.id);
        setBiz_date(formatDate(today.biz_date));
        setYesterdaysKeyword(yesterday.keyword.text);
        setYesterdaydate(yesterday.biz_date);
      } catch (error) {
        console.log(error);
        Alert.alert("错误", "获取关键词失败");
      }
    };

    fetchKeyWords();
  }, [
    setBiz_date,
    setDate,
    setKeywordId,
    setTodayKeyword,
    setYesterdaydate,
    setYesterdaysKeyword,
  ]);

  const dailysentenceku = [
    "很多快乐来不及命名,只被当作日常",
    "用微小的事物感知幸福",
    "好在时间是个很大的容器",
    "最喜欢翻着照片回忆当时的心情",
    "人生就是用来创造回忆的",
    "普通的一天,也在认真发生",
    "三分钟热度就会有三分钟收获",
    "焦虑也没关系,饼干焦焦的也很好吃",
  ];

  const getRandomSentence = useEffectEvent(() => {
    const randomIndex = Math.floor(Math.random() * dailysentenceku.length);
    return dailysentenceku[randomIndex];
  });

  useEffect(() => {
    setDailysentence(getRandomSentence());
  }, [getRandomSentence]);

  useEffect(() => {
    if (!guideVisible) {
      setIdeaOpen(false);
      return;
    }

    if (currentStep === TODAY_GUIDE_STEPS.length - 1) {
      setIdeaOpen(true);
    } else {
      setIdeaOpen(false);
    }
  }, [currentStep, guideVisible]);

  useEffect(() => {
    if (!guideVisible) {
      return;
    }

    const timeoutId = setTimeout(() => {
      measureTargets();
    }, 220);

    return () => clearTimeout(timeoutId);
  }, [currentStep, guideVisible, keyWords_text, measureTargets]);

  return (
    <ScrollView>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.dateIconRow}>
          <Text style={styles.dateText}>{date}</Text>
          <View
            ref={hintEntryRef}
            collapsable={false}
            onLayout={() => updateLayout("hintEntry", hintEntryRef)}
          >
            <Idea
              open={ideaOpen}
              onOpenChange={setIdeaOpen}
              onModalMeasure={updateRuleHintLayout}
            />
          </View>
        </View>

        <View style={{ position: "absolute", top: 35, left: -19 }}>
          <Memento width={234} height={234} />
        </View>

        <View style={styles.talkkuang}>
          <TalkKuang style={{ position: "absolute" }} />
          <Text style={styles.talktext}>{dailysentence}</Text>
        </View>

        <View
          ref={dailyKeywordRef}
          collapsable={false}
          onLayout={() => updateLayout("dailyKeyword", dailyKeywordRef)}
          style={styles.keyword}
        >
          <Text style={styles.keywordtext}>{keyWords_text}</Text>
        </View>

        <View style={styles.ChooseWay}>
          <TakePhotoWay />
          <PhotoWay />
        </View>

        <View style={styles.todaydata}>
          <Text style={styles.todaytext}>今日</Text>
          <Text style={styles.statText}>已有{participant_user_count}人参与今日创作</Text>
          <Link href="/find" asChild>
            <Pressable
              ref={publicBrowseRef}
              collapsable={false}
              onLayout={() => updateLayout("publicBrowse", publicBrowseRef)}
              style={styles.linkHitBox}
            >
              <Text style={styles.linkText}>查看作品 &gt;</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.todaydata}>
          <Text style={styles.todaytext}>昨天</Text>
          <Text style={styles.statText}>
            已有{yesterday_user_count}人参与昨日创作
          </Text>
          <Link href="/yesterdayfind" asChild>
            <Text style={styles.linkText}>查看作品 &gt;</Text>
          </Link>
        </View>
      </SafeAreaProvider>

      <GuideOverlay
        currentStep={currentStep}
        layouts={layouts}
        onAdvance={() => {
          nextStep(TODAY_GUIDE_STEPS.length);
        }}
        onClose={() => {
          setIdeaOpen(false);
          complete();
        }}
        steps={TODAY_GUIDE_STEPS}
        visible={guideVisible}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    position: "relative",
  },
  dateIconRow: {
    position: "absolute",
    top: 83,
    right: 39,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateText: {
    fontSize: 14,
    fontFamily: "思源黑体",
    fontWeight: "500",
    color: "#999999",
    letterSpacing: 1,
  },
  talkkuang: {
    width: 160,
    height: 58.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "absolute",
    top: 118,
    right: 33,
  },
  talktext: {
    fontSize: 12,
    fontFamily: "思源黑体",
    fontWeight: "500",
    color: "#72B6FF",
    letterSpacing: 1,
    lineHeight: 15,
  },
  keyword: {
    height: 70,
    marginTop: 269,
    alignItems: "center",
    justifyContent: "center",
  },
  keywordtext: {
    fontSize: 48,
  },
  ChooseWay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 145,
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  todaydata: {
    position: "relative",
    height: 110,
    width: screenWidth - 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
  },
  todaytext: {
    fontSize: 30,
    fontFamily: "思源黑体",
    fontWeight: "400",
    position: "absolute",
    top: 18,
    left: 23,
  },
  statText: {
    position: "absolute",
    fontSize: 14,
    color: "#999999",
    paddingRight: 106,
    bottom: 20,
    left: 22,
  },
  linkText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#666666",
  },
  linkHitBox: {
    position: "absolute",
    bottom: 10,
    right: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
