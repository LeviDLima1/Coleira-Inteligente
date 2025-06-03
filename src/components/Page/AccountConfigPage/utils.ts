import { UserData } from './types';

export const converterDataParaFormatoDB = (data: string): string => {
    if (!data) return '';
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
};

export const validateForm = (formData: UserData): boolean => {
    const requiredFields: (keyof UserData)[] = ['nome', 'email', 'cpf', 'dataNascimento', 'telefone', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
        return false;
    }

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
        return false;
    }

    return true;
}; 