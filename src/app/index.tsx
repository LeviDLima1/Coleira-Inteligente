import { View } from "react-native";
import React, { useState } from "react";
import { Header } from "@/components/header";
import { Sliders } from "@/components/Page/HomePage/sliders"; 
import PetCard from "@/components/Page/HomePage/PetCard";
import NavigationMapButton from "@/components/Page/HomePage/navigationMapButton";
import SideBar from "@/components/Page/HomePage/SideBar";

export default function Home() {
    const [sideBarVisible, setSideBarVisible] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <Header onMenuPress={() => setSideBarVisible(true)} />
            <Sliders />
            <PetCard />
            <NavigationMapButton />
            <SideBar visible={sideBarVisible} onClose={() => setSideBarVisible(false)} />
        </View>
    );
}
