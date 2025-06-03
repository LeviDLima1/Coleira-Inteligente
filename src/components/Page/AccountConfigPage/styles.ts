import { StyleSheet } from 'react-native';
import { colors } from '@/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F5F5F5',
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
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#7B3FA0',
        fontFamily: 'Jua_400Regular',
    },
    profileHeader: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E0E0E0',
        resizeMode: 'contain',
        padding: 20,
    },
    changePhotoButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTabs: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#7B3FA0',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Jua_400Regular',
    },
    activeTabText: {
        color: '#FFF',
    },
    section: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    formGroup: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontFamily: 'Jua_400Regular',
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Jua_400Regular',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16,
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    marginRight: {
        marginRight: 8,
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: '#7B3FA0',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#B39CD0',
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Jua_400Regular',
    },
});
