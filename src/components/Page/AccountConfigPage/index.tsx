import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Header } from "../../header";
import { useState } from "react";

export default function AccountConfigPage() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSalvar = () => {
        // Implementar lógica de salvamento
        console.log(formData);
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Configuração de Conta</Text>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.nome}
                            onChangeText={(value) => handleChange("nome", value)}
                            placeholder="Digite seu nome completo"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.email}
                            onChangeText={(value) => handleChange("email", value)}
                            placeholder="Digite seu e-mail"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.senha}
                            onChangeText={(value) => handleChange("senha", value)}
                            placeholder="Digite sua senha"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Telefone</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.telefone}
                            onChangeText={(value) => handleChange("telefone", value)}
                            placeholder="Digite seu telefone"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>CEP</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.cep}
                            onChangeText={(value) => handleChange("cep", value)}
                            placeholder="Digite seu CEP"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Rua</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.rua}
                            onChangeText={(value) => handleChange("rua", value)}
                            placeholder="Digite sua rua"
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.formGroup, styles.flex1, styles.marginRight]}>
                            <Text style={styles.label}>Número</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.numero}
                                onChangeText={(value) => handleChange("numero", value)}
                                placeholder="Nº"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={[styles.formGroup, styles.flex2]}>
                            <Text style={styles.label}>Complemento</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.complemento}
                                onChangeText={(value) => handleChange("complemento", value)}
                                placeholder="Apto, Bloco, etc"
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Bairro</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.bairro}
                            onChangeText={(value) => handleChange("bairro", value)}
                            placeholder="Digite seu bairro"
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.formGroup, styles.flex2, styles.marginRight]}>
                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.cidade}
                                onChangeText={(value) => handleChange("cidade", value)}
                                placeholder="Digite sua cidade"
                            />
                        </View>

                        <View style={[styles.formGroup, styles.flex1]}>
                            <Text style={styles.label}>Estado</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.estado}
                                onChangeText={(value) => handleChange("estado", value)}
                                placeholder="UF"
                                maxLength={2}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
