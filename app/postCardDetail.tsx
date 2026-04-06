import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageSourcePropType,
  FlatList,
  Pressable,
  Image,
  ScrollView,
  Dimensions, // 新增：获取屏幕宽高
} from "react-native";
import { BlurView } from "expo-blur";
import VoiceIcon from "../assets/images/sound2.svg";
import usePromptStore from "./stores/usePromptStore";
import Arrowback from "../assets/images/goback.svg";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Arrow from "../assets/images/arrow-bottom.svg";
import { getOfficialUploadDetail } from "./api/keywords";
import { detaildataItem } from "./api/interface";

// 新增：获取屏幕宽高
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function PostCardDetail() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [detaildata, setDetaildata] = useState<detaildataItem>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useLocalSearchParams();
  const router=useRouter();
  const formatIsoDateToYMD = (isoDate:string) => {
  if (!isoDate) return ''; // 处理空值
  
  try {
    // 创建 Date 对象（自动解析 ISO 格式）
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate(); // 1-31
    return `${year}/${month}/${day}`;
  } catch (error) {
    console.error('日期转换失败：', error);
    return ''; // 转换失败返回空字符串
  }
};
  const uploadId = (() => {
    if (Array.isArray(params.upload_id)) return params.upload_id[0] || "";
    return params.upload_id || "";
  })();
  useEffect(() => {
    const getUploadDetail = async () => {
      if (!uploadId) {
        setError("无效的作品ID");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log(uploadId);
        const res = await getOfficialUploadDetail(uploadId);
        setDetaildata(res.data);
        setError("");
      } catch (err) {
        console.error("获取详情失败：", err);
        setError("加载失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };
    getUploadDetail();
  }, [uploadId]);

  // 加载/错误状态
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#72B6FF" />
      </View>
    );
  }

  if (error || !detaildata || !detaildata.images?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{error || "暂无作品数据"}</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>返回</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Pressable
        style={{ position: "absolute", top: 60, left: 16, zIndex: 999 }}
        onPress={() => router.back()}
      >
        <Arrowback style={{ width: 24, height: 24 }} />
      </Pressable>

      {/* 核心修改：FlatList 改为横向滑动 */}
      <FlatList
        data={detaildata.images}
        keyExtractor={(item, index) => `${item.id || index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        decelerationRate="fast"
        pagingEnabled={true}
        renderItem={({ item }) => (
          // 6. 每个item宽度设为屏幕宽度
          <View style={{ width: screenWidth, height: screenHeight }}>
            <ImageBackground
              source={{ uri: item.image?.variants?.original?.url || "" }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
              <BlurView
                intensity={20}
                tint="dark"
                style={StyleSheet.absoluteFill}
              >
                <View style={styles.contentContainer}>
                  <Pressable style={styles.imagelist} >
                    <Image
                      source={{
                        uri: item.image?.variants?.original?.url || "",
                      }}
                      style={{ flex: 1 }}
                      resizeMode="cover"
                    />
                  </Pressable>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingBottom: 5,
                      height: 35,
                      width: 327,
                      alignItems: "flex-end",
                      position: "relative",
                    }}
                  >
                    <Text style={styles.title}>{item.title || "无标题"}</Text>
                    {item.has_audio && (
                        <Pressable style={styles.voice}>
                          <VoiceIcon />
                          <Text style={{ color: "#FFFFFF", fontSize: 12 }}>
                            {item.audio_duration_ms || 0}'
                          </Text>
                        </Pressable>
                      )}

                    <Text style={styles.date}>{formatIsoDateToYMD(item.created_at)}</Text>
                  </View>
                  <View
                    style={{
                      height: 0,
                      width: 327,
                      borderColor: "rgba(253, 253, 253, 0.2)",
                      borderWidth: 1,
                      marginBottom: 24,
                      marginHorizontal: 24,
                    }}
                  ></View>

                  <View style={styles.copywritingWrapper}>
                    {isExpanded ? (
                      <ScrollView
                        style={styles.copywritingExpanded}
                        showsVerticalScrollIndicator={false}
                      >
                        <Text style={styles.copywritingText}>
                          {item.note || "暂无文案"}
                        </Text>

                        {item.note.length > 30 && (
                          <Pressable
                            style={styles.toggleButton}
                            onPress={() => setIsExpanded(!isExpanded)}
                          >
                            <Arrow />
                            <Text style={styles.toggleButtonText}>
                              {isExpanded ? "收起" : "展开"}
                            </Text>
                          </Pressable>
                        )}
                      </ScrollView>
                    ) : (
                      <Text
                        style={[
                          styles.copywritingText,
                          styles.copywritingCollapsed,
                        ]}
                        numberOfLines={3}
                      >
                        {item.note}
                      </Text>
                    )}
                  </View>
                </View>
              </BlurView>
            </ImageBackground>
          </View>
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#72B6FF",
    borderRadius: 8,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: screenHeight,
  },
  imageStyle: {
    opacity: 1,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  imagelist: {
    width: "100%",
    height: 301,
    marginTop: 243,
    marginBottom: 52,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: 500,
  },
  voice: {
    height: 24,
    width:72,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    marginLeft: 12,
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 5,
  },
  date: {
    position: "absolute",
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: 400,
    right: 9,
    bottom: 5,
  },
  copywritingWrapper: {
    width: 308,
    position: "relative",
  },
  copywritingCollapsed: {
    height: 60,
    lineHeight: 20,
    overflow: "hidden",
  },
  copywritingExpanded: {
    maxHeight: 200,
    width: "100%",
  },
  copywritingText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: 400,
  },
  toggleButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    right: 0,
    bottom: -20,
  },
  toggleButtonText: {
    fontSize: 12,
    color: "#72B6FF",
  },
});
