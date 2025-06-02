import { useState } from 'react';
import { Header } from '@/components/header';
import { Sliders } from '@/components/Page/HomePage/sliders';
import NavigationMapButton from '@/components/Page/HomePage/navigationMapButton';
import { View } from 'react-native';
import PetCard from '@/components/Page/HomePage/PetCard';
import SideBar from '@/components/Page/HomePage/SideBar';

export default function HomeScreen() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const handleOpenSideBar = () => {
    setIsSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setIsSideBarVisible(false);
  };

  return (
    <View>
      <Header onMenuPress={handleOpenSideBar} />
      <Sliders />
      <PetCard />
      <NavigationMapButton />
      <SideBar visible={isSideBarVisible} onClose={handleCloseSideBar} />
    </View>
  );
} 