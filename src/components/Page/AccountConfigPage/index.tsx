import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { Header } from "../../header";
import { useState, useEffect } from "react";
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { mask, unMask } from 'remask';
import { UserData, FormField } from './types';
import { personalFields, addressFields } from './formFields';
import { converterDataParaFormatoDB, validateForm } from './utils';
import SideBar from '../HomePage/SideBar';

export default function AccountConfigPage() {
    const { user, signIn } = useAuth();
    const [formData, setFormData] = useState<UserData>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        cpf: "",
        dataNascimento: "",
        telefone: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        foto: ""
    });

    const [originalData, setOriginalData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState<'pessoal' | 'endereco'>('pessoal');
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);

    useEffect(() => {
        const buscarDadosUsuario = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/users/${user?.id}`);
                const userData = response.data;
                
                setOriginalData(userData);
                setFormData(prev => ({
                    ...prev,
                    ...userData,
                    nome: userData.name || userData.nome || "",
                    confirmarSenha: ""
                }));
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                setFormData(prev => ({
                    ...prev,
                    nome: user?.name || "",
                    email: user?.email || "",
                    foto: user?.photo || ""
                }));
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.id) {
            buscarDadosUsuario();
        }
    }, [user]);

    const handleChange = (field: keyof UserData, value: string) => {
        let maskedValue = value;

        const fieldConfig = [...personalFields, ...addressFields].find(f => f.name === field);
        if (fieldConfig?.mask) {
            maskedValue = mask(unMask(value), [fieldConfig.mask]);
        }

        setFormData(prev => ({
            ...prev,
            [field]: maskedValue
        }));

        if (field === 'cep' && unMask(value).length === 8) {
            buscarCep(unMask(value));
        }
    };

    const buscarCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setFormData(prev => ({
                    ...prev,
                    rua: data.logradouro || prev.rua,
                    bairro: data.bairro || prev.bairro,
                    cidade: data.localidade || prev.cidade,
                    estado: data.uf || prev.estado
                }));
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const handleSalvar = async () => {
        if (!validateForm(formData)) {
            Alert.alert(
                "Campos Obrigatórios",
                "Por favor, preencha todos os campos obrigatórios antes de salvar."
            );
            return;
        }

        try {
            setIsSaving(true);
            const dadosParaEnviar = Object.entries(formData).reduce<Partial<UserData>>((acc, [key, value]) => {
                if (value && value.toString().trim() !== "" && key !== 'confirmarSenha') {
                    if (key === 'cpf') {
                        acc[key as keyof UserData] = unMask(value);
                    } else if (key === 'telefone') {
                        acc[key as keyof UserData] = unMask(value);
                    } else if (key === 'cep') {
                        acc[key as keyof UserData] = unMask(value);
                    } else if (key === 'dataNascimento') {
                        acc[key as keyof UserData] = converterDataParaFormatoDB(value);
                    } else if (key === 'nome') {
                        acc['name' as keyof UserData] = value;
                    } else {
                        acc[key as keyof UserData] = value;
                    }
                }
                return acc;
            }, {});

            console.log('Dados a serem enviados:', dadosParaEnviar);
            const response = await api.put(`/users/${user?.id}`, dadosParaEnviar);
            console.log('Resposta da API:', response.data);
            
            setOriginalData(formData);
            
            if (user) {
                await signIn({
                    ...user,
                    name: formData.nome,
                    photo: formData.foto
                });
            }
            
            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        } catch (error: any) {
            console.error("Erro ao salvar dados:", error);
            console.error("Detalhes do erro:", error.response?.data);
            const mensagem = error.response?.data?.error || "Não foi possível salvar os dados. Tente novamente.";
            Alert.alert("Erro", mensagem);
        } finally {
            setIsSaving(false);
        }
    };

    const renderFormField = (field: FormField) => {
        if (!field) return null;
        
        return (
            <View key={field.name} style={styles.formGroup}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                    style={styles.input}
                    value={formData[field.name]}
                    onChangeText={(value) => handleChange(field.name, value)}
                    placeholder={field.placeholder}
                    keyboardType={field.keyboardType}
                    maxLength={field.maxLength}
                    secureTextEntry={field.secureTextEntry}
                />
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header onMenuPress={() => setIsSideBarVisible(true)} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7B3FA0" />
                    <Text style={styles.loadingText}>Carregando dados...</Text>
                </View>
                <SideBar visible={isSideBarVisible} onClose={() => setIsSideBarVisible(false)} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header onMenuPress={() => setIsSideBarVisible(true)} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.subContainer}>
                    <View style={styles.profileHeader}>
                        <Image
                            source={formData.foto ? { uri: formData.foto } : require('../../../assets/Decoration-Paw.png')}
                            style={styles.profilePhoto}
                        />
                        <TouchableOpacity style={styles.changePhotoButton}>
                            <Ionicons name="camera" size={24} color="#7B3FA0" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionTabs}>
                        <TouchableOpacity 
                            style={[styles.tab, activeSection === 'pessoal' && styles.activeTab]}
                            onPress={() => setActiveSection('pessoal')}
                        >
                            <Text style={[styles.tabText, activeSection === 'pessoal' && styles.activeTabText]}>
                                Dados Pessoais
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tab, activeSection === 'endereco' && styles.activeTab]}
                            onPress={() => setActiveSection('endereco')}
                        >
                            <Text style={[styles.tabText, activeSection === 'endereco' && styles.activeTabText]}>
                                Endereço
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        {activeSection === 'pessoal' ? (
                            personalFields.map(renderFormField)
                        ) : (
                            <>
                                {addressFields.slice(0, 2).map(renderFormField)}
                                <View style={styles.row}>
                                    <View style={[styles.formGroup, styles.flex1, styles.marginRight]}>
                                        {renderFormField(addressFields[2])}
                                    </View>
                                    <View style={[styles.formGroup, styles.flex2]}>
                                        {renderFormField(addressFields[3])}
                                    </View>
                                </View>
                                {addressFields.slice(4, 6).map(renderFormField)}
                                <View style={styles.row}>
                                    <View style={[styles.formGroup, styles.flex2, styles.marginRight]}>
                                        {renderFormField(addressFields[6])}
                                    </View>
                                    <View style={[styles.formGroup, styles.flex1]}>
                                        {renderFormField(addressFields[7])}
                                    </View>
                                </View>
                            </>
                        )}
                    </View>

                    <TouchableOpacity 
                        style={[styles.button, isSaving && styles.buttonDisabled]} 
                        onPress={handleSalvar}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Salvar Alterações</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <SideBar visible={isSideBarVisible} onClose={() => setIsSideBarVisible(false)} />
        </View>
    );
}
