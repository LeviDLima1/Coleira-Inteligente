import { ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { colors } from '@/styles/theme';

export function Loading() {
    return (
        <ActivityIndicator color={colors.purple[500]} style={styles.container}/>
    );
}

