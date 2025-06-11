import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Animated, { 
    FadeInDown, 
    FadeInUp, 
    useAnimatedStyle, 
    withSpring,
    withSequence,
    withDelay,
    useSharedValue
} from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './styles';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import { colors } from '../../../styles/colors';

const dogBreeds = [
    { label: 'Labrador', value: 'Labrador' },
    { label: 'Golden Retriever', value: 'Golden Retriever' },
    { label: 'Bulldog', value: 'Bulldog' },
    { label: 'Poodle', value: 'Poodle' },
    { label: 'Beagle', value: 'Beagle' },
    { label: 'Outro', value: 'Outro' }
];

const catBreeds = [
    { label: 'Siamês', value: 'Siamês' },
    { label: 'Persa', value: 'Persa' },
    { label: 'Maine Coon', value: 'Maine Coon' },
    { label: 'Sphynx', value: 'Sphynx' },
    { label: 'Ragdoll', value: 'Ragdoll' },
    { label: 'Outro', value: 'Outro' }
];

const petTypes = [
    { label: 'Cachorro', value: 'dog' },
    { label: 'Gato', value: 'cat' }
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function PetRegistrationPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [petImage, setPetImage] = useState<string | null>(null);
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [breed, setBreed] = useState('');
    const [otherBreed, setOtherBreed] = useState('');
    const [age, setAge] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Valores animados
    const scale = useSharedValue(1);
    const rotate = useSharedValue(0);

    const pickImage = async () => {
        try {
            console.log('Iniciando seleção de imagem...');
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            console.log('Resultado da seleção de imagem:', result);

            if (!result.canceled) {
                setPetImage(result.assets[0].uri);
                console.log('Imagem selecionada:', result.assets[0].uri);
                scale.value = withSequence(
                    withSpring(1.1),
                    withSpring(1)
                );
                rotate.value = withSequence(
                    withSpring(5),
                    withSpring(0)
                );
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
            Alert.alert('Erro', 'Não foi possível selecionar a imagem');
        }
    };

    const handleSubmit = async () => {
        if (!petName || !petType || !breed || !age) {
            console.log('Validação falhou:', { petName, petType, breed, age });
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            setIsLoading(true);
            console.log('Iniciando cadastro do pet...');

            const petData = {
                nome: petName,
                tipo: petType,
                raca: breed === 'Outro' ? otherBreed : breed,
                idade: parseInt(age),
                foto: petImage
            };

            console.log('Dados do pet preparados:', petData);
            console.log('Enviando requisição para:', api.defaults.baseURL + '/pets');

            const response = await api.post('/pets', petData);

            console.log('Resposta do servidor:', {
                status: response.status,
                data: response.data
            });

            if (response.status === 201) {
                console.log('Pet cadastrado com sucesso!');
                Alert.alert(
                    'Sucesso',
                    'Pet cadastrado com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.push('/')
                        }
                    ]
                );
            }
        } catch (error: any) {
            console.error('Erro detalhado ao cadastrar pet:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });
            
            Alert.alert(
                'Erro',
                error.response?.data?.message || 'Não foi possível cadastrar o pet. Tente novamente.'
            );
        } finally {
            setIsLoading(false);
            console.log('Processo de cadastro finalizado');
        }
    };

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { rotate: `${rotate.value}deg` }
            ]
        };
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <AnimatedTouchableOpacity 
                    style={[styles.imageContainer, imageAnimatedStyle]} 
                    onPress={pickImage}
                >
                    {petImage ? (
                        <Image source={{ uri: petImage }} style={styles.petImage} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>Adicionar Foto (Opcional)</Text>
                        </View>
                    )}
                </AnimatedTouchableOpacity>

                <Animated.View entering={FadeInUp.delay(200).springify()}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do Pet"
                        value={petName}
                        onChangeText={setPetName}
                    />
                </Animated.View>

                {/* Picker Tipo de Pet */}
                <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.pickerContainer}> {/* Mantendo Animated.View e pickerContainer */}
                   {/* Mantendo uma View simples ao redor do picker */}
                   <View>
                        <RNPickerSelect
                            onValueChange={(value) => {
                                setPetType(value);
                                setBreed('');
                            }}
                            items={petTypes}
                            placeholder={{ label: 'Selecione o tipo', value: null, color: colors.gray[400] }}
                            value={petType}
                            style={simplePickerSelectStyles} // Usando estilos simplificados
                            useNativeAndroidPickerStyle={false} 
                        />
                   </View>
                </Animated.View>

                {/* Picker Raça */}
                {petType !== '' && (
                    <Animated.View entering={FadeInUp.delay(600).springify()} style={styles.pickerContainer}> {/* Mantendo Animated.View e pickerContainer */}
                         {/* Mantendo uma View simples ao redor do picker */}
                        <View>
                            <RNPickerSelect
                                onValueChange={(value) => setBreed(value)}
                                items={petType === 'dog' ? dogBreeds : catBreeds}
                                placeholder={{ label: 'Selecione a raça', value: null, color: colors.gray[400] }}
                                value={breed}
                                style={simplePickerSelectStyles} // Usando estilos simplificados
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </Animated.View>
                )}

                {breed === 'Outro' && (
                    <Animated.View entering={FadeInUp.delay(800).springify()}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a raça"
                            value={otherBreed}
                            onChangeText={setOtherBreed}
                        />
                    </Animated.View>
                )}

                <Animated.View entering={FadeInUp.delay(1000).springify()}>
                    <TextInput
                        style={styles.input}
                        placeholder="Idade do Pet"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(1200).springify()}>
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]} 
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.buttonText}>Cadastrar Pet</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ScrollView>
    );
}

// Estilos para o react-native-picker-select
const simplePickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: colors.gray[800],
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: colors.gray[800],
        paddingRight: 30,
    },
    placeholder: {
        color: colors.gray[400],
    }
};

