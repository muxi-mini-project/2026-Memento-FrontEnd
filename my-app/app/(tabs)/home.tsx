
import {  StyleSheet,View } from 'react-native';
import SignIn from '../signin'
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient}  from 'expo-linear-gradient'
export default function HomeScreen() {
  return (
    <SafeAreaView>
      <LinearGradient colors={['#94d1ff', '#c9def6', '#d4e7f8','#ffffff']} style={[styles.container,styles.gradientBackground]}>
        <SignIn></SignIn>
        </LinearGradient>
      </SafeAreaView>

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
});
