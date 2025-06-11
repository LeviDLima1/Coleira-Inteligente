import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Header } from '@/components/header';
import SideBar from '@/components/Page/HomePage/SideBar';
import MeusPetsPage from '@/components/Page/MeusPetsPage';

export default function MeusPetsScreen() {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => (
            <Header
              onMenuPress={() => setSidebarVisible(true)}
            />
          ),
        }}
      />
      <MeusPetsPage />
      <SideBar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
    </View>
  );
} 