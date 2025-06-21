import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getNotificaciones } from '../services/api';

export default function ProfileScreen() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotificaciones()
      .then(res => setNotificaciones(res.data))
      .catch(() => setNotificaciones([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones Recientes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <FlatList
          data={notificaciones}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.notificacionCard}>
              <Text style={styles.notificacionMensaje}>{item.mensaje}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No tienes notificaciones.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  notificacionCard: { backgroundColor: '#e3f2fd', padding: 12, borderRadius: 8, marginBottom: 8 },
  notificacionMensaje: { color: '#1565c0' },
  empty: { color: '#888', textAlign: 'center', marginTop: 20 }
});