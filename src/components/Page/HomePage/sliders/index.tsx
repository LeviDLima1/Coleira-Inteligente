import { View } from "react-native";
import Slide from "../slide";
import { ImageSlider } from "../slide/data/SliderData";
import SlideBalls from "../slideBalls";

export function Sliders() {
    return (
        <View>
            <Slide itemList={ImageSlider}/>
            <SlideBalls />
        </View>
    );
}
