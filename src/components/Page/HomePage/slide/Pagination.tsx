import { View, Text, Dimensions } from "react-native";
import { ImageSliderType } from "./data/SliderData";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";

type Props = {
    items: ImageSliderType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
}

const {width} = Dimensions.get('screen');

export default function Pagination({items, paginationIndex, scrollX}: Props) {
    return (
        <View style={styles.container}>
            {items.map((_,index) => {
                const pgAnimationStyle = useAnimatedStyle(() => {
                    const dotWidth = interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [8, 20, 8],
                        Extrapolation.CLAMP
                    );

                    return {
                        width: dotWidth
                    }
                })
                return (
                    <Animated.View key={index} 
                    style={[
                        styles.dot , 
                        pgAnimationStyle,
                        {backgroundColor: paginationIndex === index ? '#642B7E' : '#aaa'}]} />
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Jua_400Regular',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 10,
        marginHorizontal: 3,
        backgroundColor: '#aaa',
        fontFamily: 'Jua_400Regular',
    }
})
