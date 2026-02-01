import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { PostCard } from '@/components/postcard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Arrowback from '../assets/images/arrow-back.svg';

import ChangeButton from '@/components/changebutton';
const { width: screenWidth } = Dimensions.get('window');

// 模拟数据
const postData = [
  {
    id: '1',
    images: [
      'https://picsum.photos/200/300',
      'https://picsum.photos/800/600',
      'https://picsum.photos/300/700',
    ],
    caption: '文案文案文案文案文案文案文案文案文案文案...',
    hasInspiration: true,
    hasempathy: false,
  },
  {
    id: '2',
    images: ['https://picsum.photos/id/1025/800/600'],
    caption: '文案文案文案文案',
    hasInspiration: false,
    hasempathy: true,
  },
   {
    id: '3',
    images: ['https://picsum.photos/id/1025/800/600'],
    caption: '文案文案文案文案',
    hasInspiration: false,
    hasempathy: true,
  },
];
export default function KeywordTodayScreen() {
  const navigation = useNavigation();
    const handleGoBack = () => {
    navigation.goBack();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, 
    });
  }, []);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* 头部导航栏 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>今日关键词</Text>
          <Text style={styles.keywordText}>安静</Text>
          <Text style={styles.keywordEnglish}>quiet</Text>
          <Pressable style={styles.buttonGroup} onPress={handleGoBack}>
            <Arrowback></Arrowback>
          </Pressable>
          <Pressable style={styles.changebutton}>
            <ChangeButton></ChangeButton>
          </Pressable>
        </View>
        {/* 帖子 */}
        <FlatList
          data={postData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          style={styles.postList}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 179,
    backgroundColor:'#FBFBFD00',
    position: 'relative',
    paddingTop:50,
    gap:11,
  },
    buttonGroup: {
    position: 'absolute',
    width:36,
    height:36,
    borderRadius:18,
    backgroundColor:'#FFFFFF',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    left: 24,
    top: 56,

  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
  },
  keywordText: {
    fontSize: 36,
    fontWeight: '400',
    color: '#333',
    marginBottom: 8,
  },
  keywordEnglish: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 16,
  },
  changebutton:{
    position:'absolute',
    top:134,
    right:34,
  },
  postList: {
    paddingHorizontal: 16,
  },
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
  },
  postImage: {
    width: screenWidth - 32,
    height: 240,
    resizeMode: 'cover',
  },
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
  avatarButton: {
    position: 'absolute',
    right: 12,
    bottom: 60,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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