import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { router, useRouter } from 'expo-router';
import { useAuth } from '../../../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function SideBar({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [slideAnim] = React.useState(new Animated.Value(width));
  const router = useRouter();
  const { user, signOut } = useAuth();

  const sideBarSections = [
    {
      title: "Serviços",
      items: [
        { 
          icon: <Ionicons name="home-outline" size={22} color="#7B3FA0" />, 
          label: "Início / Dashboard",
          onPress: () => {
            router.push('/');
            onClose();
          }
        },
        { 
          icon: <Ionicons name="map-outline" size={22} color="#7B3FA0" />, 
          label: "Mapa de Rastreamento",
          onPress: () => {
            router.push('/map');
            onClose();
          }
        },
        { 
          icon: <FontAwesome5 name="dog" size={22} color="#7B3FA0" />, 
          label: "Meus Pets",
          onPress: () => {
            router.push('/MeusPets');
            onClose();
          }
        },
        { 
          icon: <Feather name="credit-card" size={22} color="#7B3FA0" />, 
          label: "Meus Planos",
          onPress: () => {
            // Implementar navegação para Meus Planos
            onClose();
          }
        },
        { 
          icon: <MaterialIcons name="add-shopping-cart" size={22} color="#7B3FA0" />, 
          label: "Contratar Plano",
          onPress: () => {
            // Implementar navegação para Contratar Plano
            onClose();
          }
        },
      ]
    },
    {
      title: "Funcionalidades",
      items: [
        { 
          icon: <MaterialIcons name="center-focus-weak" size={22} color="#7B3FA0" />, 
          label: "Área Segura",
          onPress: () => {
            // Implementar navegação para Área Segura
            onClose();
          }
        },
        { 
          icon: <Ionicons name="time-outline" size={22} color="#7B3FA0" />, 
          label: "Histórico de Localizações",
          onPress: () => {
            // Implementar navegação para Histórico
            onClose();
          }
        },
        { 
          icon: <MaterialIcons name="warning-amber" size={22} color="#7B3FA0" />, 
          label: "Alertas de Fuga",
          onPress: () => {
            // Implementar navegação para Alertas
            onClose();
          }
        },
      ]
    },
    {
      title: "Comunidade / Colaboração",
      items: [
        { icon: <FontAwesome5 name="search-location" size={22} color="#7B3FA0" />, label: "Pets Perdidos Próximos" },
        { icon: <FontAwesome5 name="search" size={22} color="#7B3FA0" />, label: "Encontrei um Pet" },
        { icon: <FontAwesome name="comments-o" size={22} color="#7B3FA0" />, label: "Comunidade / Fórum" },
      ]
    },
    {
      title: "Conta & Suporte",
      items: [
        { icon: <Ionicons name="person-outline" size={22} color="#7B3FA0" />, label: "Minha Conta", onPress: () => { router.push("/AccountConfigPage"); onClose(); } },
        { icon: <Ionicons name="notifications-outline" size={22} color="#7B3FA0" />, label: "Notificações" },
        { icon: <Feather name="phone-call" size={22} color="#7B3FA0" />, label: "Suporte / Ajuda" },
      ]
    }
  ];

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: width,
        useNativeDriver: true,
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
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={24} color="#7B3FA0" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View>
                  <Text style={styles.topTitle}>Olá, PetTracker</Text>
                  <Text style={styles.topSubtitle}>Já possui conta ou quer se cadastrar?</Text>
                </View>
                <TouchableOpacity style={styles.topButton} onPress={() => { router.push('/LoginUser'); onClose(); }}>
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
                />
              ))}
            </React.Fragment>
          ))}
        </ScrollView>
        {/* Botão de fechar */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function SideBarItem({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.itemRow} onPress={onPress}>
      {icon}
      <Text style={styles.itemLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
