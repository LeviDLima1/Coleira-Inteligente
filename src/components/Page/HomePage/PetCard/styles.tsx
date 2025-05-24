import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
        marginTop: 25,
        marginHorizontal: 'auto',
        fontFamily: 'Jua_400Regular',
      },
      verMais: {
        position: 'absolute',
        top: 10,
        right: 20,
        color: '#7B3FA0',
        fontSize: 16,
        fontFamily: 'Jua_400Regular',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      avatarContainer: {
        borderWidth: 4,
        borderColor: '#B39DDB',
        borderRadius: 50,
        padding: 2,
        marginRight: 15,
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      nome: {
        fontSize: 18,
        color: '#7B3FA0',
        fontFamily: 'Jua_400Regular',
      },
      status: {
        color: '#2E7D32',
        fontSize: 14,
        fontFamily: 'Jua_400Regular',
      },
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
})