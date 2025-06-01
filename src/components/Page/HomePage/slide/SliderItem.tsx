import { Image, Dimensions } from "react-native";
import { styles } from "./styles";
import { ImageSliderType } from "./data/SliderData";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

const {width} = Dimensions.get('screen');

type Props = {
    item: ImageSliderType;
    index: number;
    scrollX: SharedValue<number>;
}

export default function SliderItem({item, index, scrollX}: Props) {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.25, 0, width * 0.25],
                        Extrapolation.CLAMP
                    )
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.6, 1, 0.6],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
    })

    return (
        <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
            <Image source={item.image} style={styles.image} />            
        </Animated.View>
    )
}

