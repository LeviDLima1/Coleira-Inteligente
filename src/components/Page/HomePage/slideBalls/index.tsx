import { View, Text } from "react-native";
import { styles } from "./styles";


export default function SlideBalls() {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.ball}></View>
                <View style={styles.ball}></View>
                <View style={styles.ball}></View>
                <View style={styles.ball}></View>
            </View>
        </View>
    )
}
        