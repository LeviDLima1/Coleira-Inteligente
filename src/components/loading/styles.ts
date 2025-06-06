import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: '100%',
        width: '100%',
    },
    message: {
        marginTop: spacing.md,
        fontSize: 16,
        color: colors.gray[800],
    }
});