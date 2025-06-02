import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { router, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SideBar({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [slideAnim] = React.useState(new Animated.Value(width));
  const router = useRouter();

  const sideBarSections = [
    {
      title: "Serviços",
      items: [
        { icon: <Ionicons name="home-outline" size={22} color="#7B3FA0" />, label: "Início / Dashboard" },
        { icon: <Ionicons name="map-outline" size={22} color="#7B3FA0" />, label: "Mapa de Rastreamento" },
        { icon: <FontAwesome5 name="dog" size={22} color="#7B3FA0" />, label: "Meus Pets" },
        { icon: <Feather name="credit-card" size={22} color="#7B3FA0" />, label: "Meus Planos" },
        { icon: <MaterialIcons name="add-shopping-cart" size={22} color="#7B3FA0" />, label: "Contratar Plano" },
      ]
    },
    {
      title: "Funcionalidades",
      items: [
        { icon: <MaterialIcons name="center-focus-weak" size={22} color="#7B3FA0" />, label: "Área Segura" },
        { icon: <Ionicons name="time-outline" size={22} color="#7B3FA0" />, label: "Histórico de Localizações" },
        { icon: <MaterialIcons name="warning-amber" size={22} color="#7B3FA0" />, label: "Alertas de Fuga" },
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
            <View>
              <Text style={styles.topTitle}>Olá, PetTracker</Text>
              <Text style={styles.topSubtitle}>Já possui conta ou quer se cadastrar?</Text>
            </View>
            <TouchableOpacity style={styles.topButton} onPress={() => { router.push('/LoginUser'); onClose(); }}>
              <Text style={styles.topButtonText}>Entrar</Text>
            </TouchableOpacity>
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
