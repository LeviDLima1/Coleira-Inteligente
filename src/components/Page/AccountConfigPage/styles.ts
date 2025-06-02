import { StyleSheet } from 'react-native';
import { colors } from '@/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    subContainer: {
        width: '90%',
        minHeight: '100%',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 'auto',
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.purple[700],
        marginBottom: 24,
        textAlign: 'center',
    },
    formGroup: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray[700],
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: colors.gray[100],
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.gray[900],
        borderWidth: 1,
        borderColor: colors.gray[300],
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    marginRight: {
        marginRight: 12,
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: colors.purple[700],
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
});
