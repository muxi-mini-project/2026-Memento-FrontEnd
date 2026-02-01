
import {  StyleSheet, View, Text, Pressable, Modal,Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import KeyCard from '@/components/keyCard';
import {LinearGradient}  from 'expo-linear-gradient'
import { handleOpenCamera, handleOpenGallery,Createway } from '../../components/createway';
import Drew from '../../assets/images/create.svg'
import Calendar from '../../assets/images/calendar.svg'
export default function TabTwoScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <SafeAreaProvider style={styles.container}>
      <LinearGradient   colors={['#94d1ff', '#c9def6', '#d4e7f8','#ffffff']}
      style={[styles.gradientBackground,styles.container]}>
        <View style={styles.dateIconContainer}>
          <View style={styles.dateIconRow}>
          <Calendar width={24} height={24} fill="#ffffff"></Calendar>
          <Text style={styles.dateText}>1月19号 星期几</Text>
          </View>
        </View>
          
      <View style={styles.title}>
        <Text style={styles.titletext}>今日关键词</Text>
        </View>
      {/* 关键词卡片 */}
      <View style={styles.keycard}>
        <KeyCard />
      </View>

      {/* 创作按钮 */}
      <Pressable style={styles.create} onPress={() => setModalVisible(true)}>
        <Drew  width={21} height={19} ></Drew>
        <Text style={styles.createText}>开始创作</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalMask} onPress={() => setModalVisible(false)}>
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View>
              <Text style={styles.modalTitle}>选择创作方式</Text>
            </View>
            <Createway></Createway>
          </Pressable>
        </Pressable>
      </Modal>
       </LinearGradient>
    </SafeAreaProvider>
   
  );
}

const styles = StyleSheet.create({
    gradientBackground: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dateIconContainer:{
    display:'flex',
    flexDirection:'row',
    height:88,
    width:"100%",
    backgroundColor:'#ffffff',
   alignItems:"flex-end",
   position:'absolute',
   top:0,
   paddingLeft:26,
  },
  dateIconRow:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:8,
    paddingBottom:12,
  },
  dateText:{
     fontSize:14,
     fontFamily:"思源黑体",
     fontWeight:'500',
     color:'#666666',
  },
  title: {
    marginBottom: 8,
  },
  titletext:{
    fontSize:18,
    fontFamily:"思源黑体",
    fontWeight:'500',
    color:'#ffffff',
    marginBottom:8,
    shadowColor: 'rgba(114, 182, 255, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  keycard: {
    marginBottom: 40,
  },
  create: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#72B6FF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
    width:327,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  createImage:{
  },
  // 弹窗遮罩
  modalMask: {
    flex: 1,
    backgroundColor: 'rgba(21, 24, 30, 0.2)',
    justifyContent: 'flex-end',
  },
  // 抽屉内容
  modalContent: {
    width: "100%",
    height: 351,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
    //提示提示
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  
});