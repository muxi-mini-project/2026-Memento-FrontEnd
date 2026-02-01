import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import HaveIdea from '../assets/images/haveidea.svg';
import HaveLightIdea from '../assets/images/havelightIdea.svg'
import Heart from '../assets/images/heart.svg'
import HeartLight from '../assets/images/heartlight.svg'
import { useState } from 'react';
import { Post } from '@/app/api/interface';
const { width: screenWidth } = Dimensions.get('window');

  export function PostCard({post}:{post:Post} ) {
  const [hasInspiration, setHasInspiration] = useState(post.hasInspiration);
  const [hasEmpathy, setHasEmpathy] = useState(post.hasempathy);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const toggleInspiration = () => {
    setHasInspiration(!hasInspiration);
  };
  const toggleEmpathy = () => {
    setHasEmpathy(!hasEmpathy);
  };

  return (
    <View style={styles.postCard}>
      {/* 滑动展示区 */}
      <FlatList
        data={post.images}
        horizontal
        pagingEnabled
        keyExtractor={(img, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.postImage} />
        )}
        onScroll={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / screenWidth);
          setCurrentImageIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
      />
      {post.images.length > 1 && (
        <View style={styles.pageBadge}>
          <Text style={styles.pageBadgeText}>
            {currentImageIndex+1 }/{post.images.length}
          </Text>
        </View>
      )}
      {post.images.length > 1 && (
        <View style={styles.imageIndicatorContainer}>
          {post.images.map((_,index: number )=> (
            <View
              key={index}
              style={[
                styles.imageIndicator,
                currentImageIndex === index && styles.activeIndicator,
              ]}
            />
            
          ))}

        </View>
      )}

      {/* 文案 */}
      <Text style={styles.postCaption} numberOfLines={1}>
        {post.caption}
      </Text>

      <View style={styles.interactionRow}>
        <Pressable 
          style={styles.interactionButton}
          onPress={toggleInspiration}
        >
          {
            hasInspiration?<HaveIdea></HaveIdea>:<HaveLightIdea></HaveLightIdea>
          }
          <Text style={[
            styles.interactionText,
            hasInspiration ? { color: '#999999' } : {color:'#666666'} // 文字同步变色（可选）
          ]}>
            有启发
          </Text>
        </Pressable>

        {/* 有共鸣按钮：切换颜色 + 点击反馈 */}
        <Pressable 
          style={styles.interactionButton}
          onPress={toggleEmpathy}
        >
            {hasEmpathy?<Heart></Heart>:<HeartLight></HeartLight>}
          <Text style={[
            styles.interactionText,
            hasEmpathy ? { color: '#999999' } : {color:'#666666'} // 文字同步变色（可选）
          ]}>
            有共鸣
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative', // 关键：让页码角标基于卡片定位
  },
  postImage: {
    width: screenWidth - 32,
    height: 240,
    resizeMode: 'cover',
  },
  // 图片页码角标样式（右下角）
  pageBadge: {
    width:30,
    height:16,
    position: 'absolute',
    right: 12,
    bottom: 70, // 避开图片底部，和互动区错开
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pageBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  // 原有图片指示器样式
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  imageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  postCaption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  interactionRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 16,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  interactionText: {
    fontSize: 12,
    color: '#999',
  },
});

