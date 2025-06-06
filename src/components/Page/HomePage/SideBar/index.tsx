import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, ScrollView, StyleSheet, Image, AccessibilityRole } from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { router, useRouter } from 'expo-router';
import { useAuth } from '../../../../contexts/AuthContext';

const { width } = Dimensions.get('window');

// Definindo a interface para os itens do menu lateral
interface SideBarItemData {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  accessibilityRole?: AccessibilityRole;
}

export default function SideBar({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [slideAnim] = React.useState(new Animated.Value(width));
  const router = useRouter();
  const { user, signOut } = useAuth();

  // Tipando explicitamente a estrutura sideBarSections
  const sideBarSections: { title: string; items: SideBarItemData[] }[] = [
    {
      title: "Serviços",
      items: [
        { icon: <Ionicons name="home-outline" size={22} color="#7B3FA0" />, label: "Início / Dashboard", onPress: () => { router.push("/"); onClose(); }, accessibilityRole: 'button' },
        // Corrigindo erro de tipagem da rota /MapPage com cast any
        { icon: <Ionicons name="map-outline" size={22} color="#7B3FA0" />, label: "Mapa de Rastreamento", onPress: () => { router.push("/MapPage" as any); onClose(); }, accessibilityRole: 'button' },
        { icon: <FontAwesome5 name="dog" size={22} color="#7B3FA0" />, label: "Meus Pets", accessibilityRole: 'button' },
        { icon: <Feather name="credit-card" size={22} color="#7B3FA0" />, label: "Meus Planos", accessibilityRole: 'button' },
        { icon: <MaterialIcons name="add-shopping-cart" size={22} color="#7B3FA0" />, label: "Contratar Plano", accessibilityRole: 'button' },
      ]
    },
    {
      title: "Funcionalidades",
      items: [
        { icon: <MaterialIcons name="center-focus-weak" size={22} color="#7B3FA0" />, label: "Área Segura", accessibilityRole: 'button' },
        { icon: <Ionicons name="time-outline" size={22} color="#7B3FA0" />, label: "Histórico de Localizações", accessibilityRole: 'button' },
        { icon: <MaterialIcons name="warning-amber" size={22} color="#7B3FA0" />, label: "Alertas de Fuga", accessibilityRole: 'button' },
      ]
    },
    {
      title: "Comunidade / Colaboração",
      items: [
        { icon: <FontAwesome5 name="search-location" size={22} color="#7B3FA0" />, label: "Pets Perdidos Próximos", accessibilityRole: 'button' },
        { icon: <FontAwesome5 name="search" size={22} color="#7B3FA0" />, label: "Encontrei um Pet", accessibilityRole: 'button' },
        { icon: <FontAwesome name="comments-o" size={22} color="#7B3FA0" />, label: "Comunidade / Fórum", accessibilityRole: 'button' },
      ]
    },
    {
      title: "Conta & Suporte",
      items: [
        { icon: <Ionicons name="person-outline" size={22} color="#7B3FA0" />, label: "Minha Conta", onPress: () => { router.push("/AccountConfigPage"); onClose(); }, accessibilityRole: 'button' },
        { icon: <Ionicons name="notifications-outline" size={22} color="#7B3FA0" />, label: "Notificações", accessibilityRole: 'button' },
        { icon: <Feather name="phone-call" size={22} color="#7B3FA0" />, label: "Suporte / Ajuda", accessibilityRole: 'button' },
      ]
    }
  ];

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
      router.push('/LoginUser');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFillObject, { zIndex: 100 }]}> 
      {/* Overlay escuro */}
      <TouchableOpacity
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 101 }]}
        onPress={onClose}
        activeOpacity={1}
        accessibilityLabel="Fechar menu lateral"
        accessibilityRole="button"
      />
      {/* SideBar alinhado à direita */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            transform: [
              {
                translateX: slideAnim,
              },
            ],
            zIndex: 102,
          },
        ]}
      >
        <ScrollView>
          {/* Top Card */}
          <View style={styles.topCard}>
            {user ? (
              <View style={styles.userInfo}>
                <Image
                  source={user.photo ? { uri: user.photo } : require('../../../../assets/Decoration-Paw.png')}
                  style={styles.userPhoto}
                />
                <View style={styles.userTextContainer}>
                  <Text style={styles.welcomeText}>Bem-vindo(a),</Text>
                  <Text style={styles.userName}>{user.name}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.logoutButton}
                  onPress={handleLogout}
                  accessibilityLabel="Sair da conta"
                  accessibilityRole="button"
                >
                  <Ionicons name="log-out-outline" size={24} color="#7B3FA0" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View>
                  <Text style={styles.topTitle}>Olá, PetTracker</Text>
                  <Text style={styles.topSubtitle}>Já possui conta ou quer se cadastrar?</Text>
                </View>
                <TouchableOpacity 
                  style={styles.topButton}
                  onPress={() => { router.push('/LoginUser'); onClose(); }}
                  accessibilityLabel="Ir para a página de login ou cadastro"
                  accessibilityRole="button"
                >
                  <Text style={styles.topButtonText}>Entrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Renderização dinâmica das seções e itens */}
          {sideBarSections.map((section) => (
            <React.Fragment key={section.title}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <SideBarItem 
                  key={item.label} 
                  icon={item.icon} 
                  label={item.label} 
                  onPress={item.onPress}
                  accessibilityLabel={item.label}
                  // Passando accessibilityRole explicitamente
                  accessibilityRole={item.accessibilityRole}
                />
              ))}
            </React.Fragment>
          ))}
        </ScrollView>
        {/* Botão de fechar */}
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Fechar menu lateral"
          accessibilityRole="button"
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Mantendo a definição original do SideBarItem
function SideBarItem({ icon, label, onPress, accessibilityLabel, accessibilityRole }: 
  { icon: React.ReactNode, label: string, onPress?: () => void, accessibilityLabel?: string, accessibilityRole?: AccessibilityRole }) {
  return (
    <TouchableOpacity 
      style={styles.itemRow}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole={accessibilityRole || "button"} 
    >
      {icon}
      <Text style={styles.itemLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
