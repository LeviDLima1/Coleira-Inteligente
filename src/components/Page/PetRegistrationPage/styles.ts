import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },
    formContainer: {
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    petImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: colors.purple[500],
        shadowColor: colors.gray[900],
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.gray[200],
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.purple[500],
        borderStyle: 'dashed',
        shadowColor: colors.gray[900],
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imagePlaceholderText: {
        color: colors.purple[500],
        fontSize: 16,
        textAlign: 'center'
    },
    input: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.gray[300],
        fontSize: 16,
        color: colors.gray[800],
        shadowColor: colors.gray[900],
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        ...Platform.select({
            ios: {
                paddingVertical: 12,
            }
        })
    },
    pickerContainer: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.gray[300],
        overflow: 'hidden',
        shadowColor: colors.gray[900],
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        ...Platform.select({
            ios: {
                height: 50,
                justifyContent: 'center',
                width: '100%',
            }
        })
    },
    picker: {
        height: Platform.OS === 'ios' ? 50 : 50,
        color: colors.gray[800],
        ...Platform.select({
            ios: {
                backgroundColor: colors.white,
            }
        })
    },
    button: {
        backgroundColor: colors.purple[500],
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: colors.gray[900],
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: colors.purple[400],
        opacity: 0.7,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: colors.purple[700],
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});
