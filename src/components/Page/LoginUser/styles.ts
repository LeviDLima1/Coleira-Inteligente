import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    bg: {
      flex: 1,
      width: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    form: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: '#333',
      alignSelf: 'flex-start',
      marginBottom: 5,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#DDD',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#7B3FA0',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    registerLinkContainer: {
      marginTop: 10,
      marginBottom: 20,
    },
    registerLink: {
      color: '#7B3FA0',
      fontSize: 14,
    },
    buttonBack: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 1,
    },
    buttonBackText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });