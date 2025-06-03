import { FormField } from './types';

export const personalFields: FormField[] = [
    {
        name: 'nome',
        label: 'Nome Completo',
        placeholder: 'Digite seu nome completo',
        type: 'text',
    },
    {
        name: 'email',
        label: 'E-mail',
        placeholder: 'Digite seu e-mail',
        type: 'email',
        keyboardType: 'email-address',
    },
    {
        name: 'cpf',
        label: 'CPF',
        placeholder: 'Digite seu CPF',
        type: 'numeric',
        mask: '999.999.999-99',
        maxLength: 14,
        keyboardType: 'numeric',
    },
    {
        name: 'dataNascimento',
        label: 'Data de Nascimento',
        placeholder: 'DD/MM/AAAA',
        type: 'date',
        mask: '99/99/9999',
        maxLength: 10,
    },
    {
        name: 'telefone',
        label: 'Telefone',
        placeholder: 'Digite seu telefone',
        type: 'numeric',
        mask: '(99) 99999-9999',
        maxLength: 15,
        keyboardType: 'numeric',
    },
    {
        name: 'senha',
        label: 'Nova Senha',
        placeholder: 'Digite sua nova senha',
        type: 'password',
        secureTextEntry: true,
    },
    {
        name: 'confirmarSenha',
        label: 'Confirmar Nova Senha',
        placeholder: 'Confirme sua nova senha',
        type: 'password',
        secureTextEntry: true,
    },
];

export const addressFields: FormField[] = [
    {
        name: 'cep',
        label: 'CEP',
        placeholder: 'Digite seu CEP',
        type: 'numeric',
        mask: '99999-999',
        maxLength: 9,
        keyboardType: 'numeric',
    },
    {
        name: 'rua',
        label: 'Rua',
        placeholder: 'Digite sua rua',
        type: 'text',
    },
    {
        name: 'numero',
        label: 'Número',
        placeholder: 'Nº',
        type: 'numeric',
        keyboardType: 'numeric',
    },
    {
        name: 'complemento',
        label: 'Complemento',
        placeholder: 'Apto, Bloco, etc',
        type: 'text',
    },
    {
        name: 'bairro',
        label: 'Bairro',
        placeholder: 'Digite seu bairro',
        type: 'text',
    },
    {
        name: 'cidade',
        label: 'Cidade',
        placeholder: 'Digite sua cidade',
        type: 'text',
    },
    {
        name: 'estado',
        label: 'Estado',
        placeholder: 'UF',
        type: 'text',
        maxLength: 2,
    },
]; 