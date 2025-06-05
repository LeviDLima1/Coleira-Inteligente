import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16, // Padding interno do card
        width: '100%', // Para ser usado dentro da ScrollView com gap
        marginTop: 40, 
        elevation: 4, // Sombra para Android
    },
    slideContainer: { // Estilo para a ScrollView que envolve os cards
        // paddingHorizontal e gap definidos no componente
    },
    petInfoRow: { // Contêiner para a imagem e texto do pet
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12, // Espaço entre a info do pet e a linha de ícones
    },
    avatarContainer: { // Contêiner para a imagem redonda
        width: 64, // Tamanho do círculo
        height: 64,
        borderRadius: 32, // Metade do tamanho para ser redondo
        marginRight: 16,
        backgroundColor: colors.white, // Fundo branco
        overflow: 'hidden', // Corta a imagem no formato do contêiner
        borderWidth: 2, // Adiciona uma borda fina
        borderColor: colors.purple[400], // Cor da borda
    },
    avatar: { // A imagem do pet
        width: '100%', // Preenche o contêiner
        height: '100%',
    },
    petTextContainer: { // Contêiner para o nome e status
      flex: 1, // Ocupa o espaço restante na linha
      justifyContent: 'center', // Centraliza verticalmente
    },
    nome: { // Nome do pet
        fontSize: 20,
        fontWeight: 'bold', // Nome em negrito
        color: colors.purple[800], // Cor do tema
        marginBottom: 4, // Espaço entre nome e status
    },
    status: { // Status da coleira/pet
        fontSize: 14,
        color: colors.green[600], // Cor verde para status positivo
    },
    iconsRow: { // Contêiner para os botões de ícone
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribui os ícones
        paddingTop: 12, // Espaço acima da linha separadora
        borderTopWidth: 1,
        borderTopColor: colors.gray[200], // Cor da linha separadora
    },
    iconButton: { // Estilo base dos botões de ícone
        backgroundColor: 'transparent', // Fundo transparente
        borderRadius: 24, // Metade do tamanho para ser redondo
        width: 48, // Tamanho do botão
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Estilos para o estado vazio do card (mantidos)
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.purple[400],
        borderStyle: 'dashed',
    },
    emptyText: {
        fontSize: 16,
        color: colors.purple[600],
        marginBottom: 16,
        textAlign: 'center',
    },
    cadastroButton: {
        backgroundColor: colors.purple[600],
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        shadowColor: colors.purple[600],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 2,
    },
    cadastroButtonText: {
        color: colors.white,
        fontSize: 16,
    },
});