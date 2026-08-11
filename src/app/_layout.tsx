import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import SplashIntro from '../components/SplashIntro';
import FloatingAssistant from '../components/FloatingAssistant';
import AIChatBot from '../components/AIChatBot';

export default function Layout() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0a0a14',
          },
          headerTintColor: '#00ffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#030308',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="class9/index" options={{ title: 'Class 9' }} />
        <Stack.Screen name="class10/index" options={{ title: 'Class 10' }} />
        <Stack.Screen name="class9/atomic-structure" options={{ title: 'Atomic Structure' }} />
        <Stack.Screen name="class9/mole-concept" options={{ title: 'Mole Concept' }} />
        <Stack.Screen name="class9/atomic-models" options={{ title: 'Atomic Models' }} />
        <Stack.Screen name="class9/matter" options={{ title: 'Matter Classification' }} />
        <Stack.Screen name="class10/reactions" options={{ title: 'Chemical Reactions' }} />
        <Stack.Screen name="class10/acids-bases" options={{ title: 'Acids, Bases & Salts' }} />
        <Stack.Screen name="class10/metals" options={{ title: 'Metals & Non-Metals' }} />
        <Stack.Screen name="class10/carbon" options={{ title: 'Carbon Compounds' }} />
      </Stack>

      {/* Splash overlay — renders on top of everything, removes itself when done */}
      {showSplash && <SplashIntro onFinish={() => setShowSplash(false)} />}

      {/* Global Floating Formula Assistant (Bottom Right) */}
      <FloatingAssistant />

      {/* Global Realtime AI Chatbot (Top Right) */}
      <AIChatBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030308',
  },
});
