import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';


export default function AppLayout() {

  return (
    <Tabs>
      <Tabs.Screen
        name="citas"
        options={{
          title: 'Citas',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial-citas"
        options={{
          title: 'Hist. Citas',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tratamientos"
        options={{
          title: 'Tratamientos',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="medkit" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial-tratamientos"
        options={{
          title: 'Hist. Trat.',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notificaciones"
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 