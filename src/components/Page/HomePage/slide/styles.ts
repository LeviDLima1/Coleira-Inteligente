import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get('screen')

export const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        fontFamily: 'Jua_400Regular',
    },
    itemContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        gap: 20,
        width: width,
        fontFamily: 'Jua_400Regular',
    },
    image: {
        margin: 'auto',
        width: 330,
    }
});