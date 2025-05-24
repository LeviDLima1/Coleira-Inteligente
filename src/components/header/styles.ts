import { StyleSheet } from 'react-native';
import { colors } from '@/styles/theme';
import { fontFamily } from '@/styles/theme';
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 30,
        backgroundColor: colors.purple[500],
    },
    logo: {
        width: 55,
        height: 70,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 15,
        marginBottom: 20,
        fontFamily: fontFamily.Jua,
    },
    bars: {
        marginRight: 20,
    }
});
