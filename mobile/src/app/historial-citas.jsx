import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getPacientes, getCitasByPaciente } from '../services/api';

export default function HistorialCitasScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteId, setPacienteId] = useState('');
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    getPacientes()
      .then(res => setPacientes(res.data))
      .catch(() => setPacientes([]));
  }, []);

  // Cargar citas cuando se seleccione un paciente
  useEffect(() => {
    if (pacienteId) {
      cargarCitas();
    }
  }, [pacienteId]);

  const cargarCitas = () => {
    if (!pacienteId) {
      setCitas([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    getCitasByPaciente(pacienteId)
      .then(res => setCitas(res.data))
      .catch((err) => {
        setCitas([]);
        console.log('Error al obtener citas:', err);
      })
      .finally(() => setLoading(false));
  };

  const renderCita = ({ item }) => (
    <View style={styles.citaCard}>
      <View style={styles.citaHeader}>
        <Text style={styles.citaFecha}>{item.fecha}</Text>
        <Text style={styles.citaHora}>{item.hora}</Text>
      </View>
      <Text style={styles.citaMotivo}>{item.motivo}</Text>
      {item.enfermedad && (
        <Text style={styles.citaEnfermedad}>Enfermedad: {item.enfermedad}</Text>
      )}
      {item.fuente && (
        <Text style={styles.citaFuente}>Fuente: {item.fuente}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Citas</Text>
      
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Seleccionar Paciente</Text>
        <Picker
          selectedValue={pacienteId}
          onValueChange={setPacienteId}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un paciente" value="" />
          {pacientes.map(p => (
            <Picker.Item key={p.id} label={p.nombre} value={p.id.toString()} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f4511e" />
          <Text style={styles.loadingText}>Cargando citas...</Text>
        </View>
      ) : (
        <FlatList
          data={citas}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCita}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {pacienteId ? 'No hay citas registradas para este paciente.' : 'Selecciona un paciente para ver su historial.'}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  selectorContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  listContainer: {
    paddingBottom: 20
  },
  citaCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  citaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  citaFecha: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4511e'
  },
  citaHora: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666'
  },
  citaMotivo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22
  },
  citaEnfermedad: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4
  },
  citaFuente: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24
  }
}); 