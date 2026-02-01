import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  type PanResponderInstance,
  Image,
  Pressable,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

// 适配安卓 LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


interface CardData {
  id: string;
  imageUrl: string;
  name: string;
  desc: string;
  translateY: Animated.Value;
}

interface PanResponderMap {
  [key: string]: PanResponderInstance;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const cardWidth = screenWidth * 0.8;
const cardSpacing = 15;
const swipeThreshold = 80;
const swipeSpeedThreshold = 300;

export default function CardScrollScreen(): React.ReactElement {
  // 1. 卡片数据 + 每个卡片的动画值（提前存储，避免循环中创建 Hook）
  const [cardDataWithAnim, setCardDataWithAnim] = useState<CardData[]>(() => [
    { id: '1', imageUrl: 'https://picsum.photos/id/1/800/600', name: '旅行随拍', desc: '2024.05.12 · 大理', translateY: new Animated.Value(0) },
    { id: '2', imageUrl: 'https://picsum.photos/id/20/800/600', name: '美食记录', desc: '2024.04.30 · 成都', translateY: new Animated.Value(0) },
    { id: '3', imageUrl: 'https://picsum.photos/id/42/800/600', name: '日常碎片', desc: '2024.03.15 · 上海', translateY: new Animated.Value(0) },
  ]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // 2. 初始化每个卡片的 PanResponder（顶层作用域，不违反 Hook 规则）
  const panResponders = useRef<PanResponderMap>(
    cardDataWithAnim.reduce<PanResponderMap>((acc, card) => {
      acc[card.id] = PanResponder.create({
        onStartShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > Math.abs(gesture.dx),
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: (_, gesture) => {
          if (Math.abs(gesture.dy) > 10) {
            setIsSwiping(true);
            return true;
          }
          return false;
        },
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (_, gesture) => {
          if (gesture.dy < 0) {
            card.translateY.setValue(gesture.dy);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          setIsSwiping(false);
          const shouldDelete = Math.abs(gesture.dy) > swipeThreshold || Math.abs(gesture.vy) > swipeSpeedThreshold;
          
          if (shouldDelete) {
            Animated.timing(card.translateY, {
              toValue: -screenHeight,
              duration: 250,
              useNativeDriver: true,
            }).start(() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setCardDataWithAnim(prev => prev.filter(item => item.id !== card.id));
              if (activeIndex >= cardDataWithAnim.length - 1 && cardDataWithAnim.length > 1) {
                setActiveIndex(cardDataWithAnim.length - 2);
              }
            });
          } else {
            Animated.spring(card.translateY, {
              toValue: 0,
              bounciness: 8,
              speed: 12,
              useNativeDriver: true,
            }).start();
          }
        },
        onPanResponderTerminate: () => {
          setIsSwiping(false);
          Animated.spring(card.translateY, {
            toValue: 0,
            bounciness: 8,
            useNativeDriver: true,
          }).start();
        },
      });
      return acc;
    }, {} as Record<string, PanResponderInstance>)
  ).current;

  // 3. 新增卡片时，同步添加动画值和 PanResponder
  const handleAddCard = () => {
    Alert.prompt(
      '新增卡片',
      '输入卡片描述',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          onPress: (desc: any) => {
            if (desc) {
              const newCard = {
                id: `card_${Date.now()}`,
                imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`,
                name: '新发布',
                desc: desc,
                translateY: new Animated.Value(0),
              };
              // 为新卡片创建 PanResponder
              panResponders[newCard.id] = PanResponder.create({
                onStartShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > Math.abs(gesture.dx),
                onStartShouldSetPanResponderCapture: () => true,
                onMoveShouldSetPanResponder: (_, gesture) => {
                  if (Math.abs(gesture.dy) > 10) {
                    setIsSwiping(true);
                    return true;
                  }
                  return false;
                },
                onMoveShouldSetPanResponderCapture: () => true,
                onPanResponderMove: (_, gesture) => {
                  if (gesture.dy < 0) {
                    newCard.translateY.setValue(gesture.dy);
                  }
                },
                onPanResponderRelease: (_, gesture) => {
                  setIsSwiping(false);
                  const shouldDelete = Math.abs(gesture.dy) > swipeThreshold || Math.abs(gesture.vy) > swipeSpeedThreshold;
                  if (shouldDelete) {
                    Animated.timing(newCard.translateY, {
                      toValue: -screenHeight,
                      duration: 250,
                      useNativeDriver: true,
                    }).start(() => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setCardDataWithAnim(prev => prev.filter(item => item.id !== newCard.id));
                    });
                  } else {
                    Animated.spring(newCard.translateY, {
                      toValue: 0,
                      bounciness: 8,
                      speed: 12,
                      useNativeDriver: true,
                    }).start();
                  }
                },
                onPanResponderTerminate: () => {
                  setIsSwiping(false);
                  Animated.spring(newCard.translateY, {
                    toValue: 0,
                    bounciness: 8,
                    useNativeDriver: true,
                  }).start();
                },
              });
              // 更新卡片数据
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setCardDataWithAnim(prev => [...prev, newCard]);
              setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                  x: (cardDataWithAnim.length) * (cardWidth + cardSpacing),
                  animated: true,
                });
                setActiveIndex(cardDataWithAnim.length);
              }, 100);
            }
          },
        },
      ]
    );
  };

  // 4. 横向滚动事件
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isSwiping) return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth + cardSpacing));
    setActiveIndex(index);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isSwiping) return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth + cardSpacing));
    const targetOffset = index * (cardWidth + cardSpacing);
    scrollViewRef.current?.scrollTo({ x: targetOffset, animated: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的动态卡片</Text>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + cardSpacing}
        snapToAlignment="center"
        scrollEnabled={!isSwiping}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {cardDataWithAnim.map((card, index) => {
          // 炫酷动效
          const inputRange = [(index - 1) * (cardWidth + cardSpacing), index * (cardWidth + cardSpacing), (index + 1) * (cardWidth + cardSpacing)];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={card.id}
              style={[
                styles.cardWrapper,
                {
                  transform: [{ scale }, { translateY: card.translateY }],
                  opacity,
                },
              ]}
              {...panResponders[card.id].panHandlers}
            >
              <View
                style={[
                  styles.card,
                  activeIndex === index && {
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                    elevation: 8,
                  },
                ]}
              >
                <Image
                  source={{ uri: card.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Text style={styles.cardDesc}>{card.desc}</Text>
                </View>
              </View>
            </Animated.View>
          );
        })}

        {/* 加号卡片 */}
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              transform: [{ scale: scrollX.interpolate({
                inputRange: [(cardDataWithAnim.length - 1) * (cardWidth + cardSpacing), cardDataWithAnim.length * (cardWidth + cardSpacing), (cardDataWithAnim.length + 1) * (cardWidth + cardSpacing)],
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              }) }],
              opacity: scrollX.interpolate({
                inputRange: [(cardDataWithAnim.length - 1) * (cardWidth + cardSpacing), cardDataWithAnim.length * (cardWidth + cardSpacing), (cardDataWithAnim.length + 1) * (cardWidth + cardSpacing)],
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <Pressable style={styles.addCard} onPress={handleAddCard}>
            <Text style={styles.addCardText}>+</Text>
            <Text style={styles.addCardDesc}>发布新动态</Text>
          </Pressable>
        </Animated.View>
      </Animated.ScrollView>

      <Text style={styles.activeTip}>
        当前查看：{cardDataWithAnim[activeIndex]?.name || '新增卡片'}
      </Text>
      <Text style={styles.tipText}>按住卡片向上滑动可删除</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  scrollContainer: {
    paddingHorizontal: (screenWidth - cardWidth) / 2,
    paddingVertical: 10,
  },
  cardWrapper: {
    width: cardWidth,
    marginRight: cardSpacing,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '80%',
  },
  cardTextContainer: {
    padding: 12,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cardDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  addCard: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addCardText: {
    fontSize: 48,
    color: '#999',
    fontWeight: '300',
  },
  addCardDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  activeTip: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  tipText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});