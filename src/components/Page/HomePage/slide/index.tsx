import { FlatList, ViewToken } from "react-native";
import { View } from "react-native";
import { ImageSliderType } from "./data/SliderData";
import SliderItem from "./SliderItem";
import Animated, { 
    useAnimatedScrollHandler, 
    useSharedValue
} from "react-native-reanimated";
import { styles } from "./styles";
import Pagination from "./Pagination";
import { useRef, useState } from "react";

type Props = {
    itemList: ImageSliderType[];
}

export default function Slide({itemList}: Props) {
    const scrollX = useSharedValue(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [data, setData] = useState(itemList);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
        if(viewableItems[0]?.index !== undefined && viewableItems[0]?.index !== null) {
            setPaginationIndex(viewableItems[0].index % itemList.length);
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    const viewabilityConfigCallbackPairs = useRef([
        {viewabilityConfig, onViewableItemsChanged}
    ])

    return (
        <View style={styles.container}>
            <Animated.FlatList 
                data={data}
                renderItem={({item, index}) => (
                    <SliderItem item={item} index={index} scrollX={scrollX}/>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onEndReached={() => setData([...data, ...itemList])}
                onEndReachedThreshold={0.5}
            />
            <Pagination items={itemList} paginationIndex={paginationIndex} scrollX={scrollX}/>
        </View>
    )
}

