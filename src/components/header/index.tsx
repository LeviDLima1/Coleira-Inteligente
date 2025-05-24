import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import logo from '../../assets/logo.png';
import { SvgXml } from 'react-native-svg';

// Conteúdo do SVG como string
const bars3Icon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export function Header({ onMenuPress }: { onMenuPress?: () => void }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.text}>PetTrack</Text>
            </View>
            <TouchableOpacity onPress={onMenuPress}>
                <SvgXml xml={bars3Icon} width={24} height={24} style={styles.bars} />
            </TouchableOpacity>
        </View>
    );
}

