import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import SplashIntro from '../components/SplashIntro';
import FloatingAssistant from '../components/FloatingAssistant';
import AIChatBot from '../components/AIChatBot';
import { ThemeProvider, useAppTheme } from '../context/ThemeContext';

function RootLayoutNav() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'dark' ? "light" : "dark"} />
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
        <Stack.Screen name="class9/chemical-formulas" options={{ title: 'Chemical Formulas' }} />
        <Stack.Screen name="class10/periodic-table" options={{ title: 'Periodic Table' }} />
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

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030308',
  },
});
