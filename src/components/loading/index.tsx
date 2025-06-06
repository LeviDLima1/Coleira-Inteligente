import { ActivityIndicator, View, Text } from 'react-native';
import { styles } from './styles';
import { colors } from '@/styles/theme';

export function Loading({ message = 'Carregando...' }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={colors.purple[500]} size="large" />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

