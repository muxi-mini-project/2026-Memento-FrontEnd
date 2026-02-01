import { useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
export default function ChangeButton() {
  const [activeTab, setActiveTab] = useState('random');
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setActiveTab('random')}>
        <Text style={[styles.smallbutton, {
          backgroundColor: activeTab === 'random' ? '#EEEEEE' : '#ffffff',
          textAlign:'center',
        }
        ]}>随机</Text>
      </Pressable>
      <Pressable onPress={()=>setActiveTab('last')}>
        <Text style={[styles.smallbutton, { backgroundColor: activeTab === 'last' ? '#EEEEEE' : '#ffffff',textAlign:'center', }]}>最新</Text>
      </Pressable>
    </View>
  );
} const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 80,
    height: 30,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  smallbutton: {
    width: 36,
    height: 20,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: '#666666',
    borderRadius: 6,
  }
});