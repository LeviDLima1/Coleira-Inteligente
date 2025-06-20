import { Stack } from 'expo-router';
import { colors } from '@/styles/colors';
import { AuthProvider } from '@/contexts/AuthContext';

import { 
    useFonts, 
    Jua_400Regular
} from "@expo-google-fonts/jua"

import { Loading } from '@/components/loading';

export default function Layout() {

    const [fontsLoaded] = useFonts({
        Jua_400Regular
    });

    if(!fontsLoaded) {
        return <Loading />
    }

    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.gray[100] }
                }}
            />
        </AuthProvider>
    );
}