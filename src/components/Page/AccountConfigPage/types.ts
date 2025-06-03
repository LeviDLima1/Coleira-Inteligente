export interface UserData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    foto?: string;
}

export interface FormField {
    name: keyof UserData;
    label: string;
    placeholder: string;
    type: 'text' | 'email' | 'password' | 'numeric' | 'date';
    mask?: string;
    maxLength?: number;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
} 