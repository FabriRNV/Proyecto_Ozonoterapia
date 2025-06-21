import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getPacientes, getTratamientosByPaciente } from '../services/api';

export default function HistorialTratamientosScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteId, setPacienteId] = useState('');
  const [tratamientos, setTratamientos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    getPacientes()
      .then(res => setPacientes(res.data))
      .catch(() => setPacientes([]));
  }, []);

  // Cargar tratamientos cuando se seleccione un paciente
  useEffect(() => {
    if (pacienteId) {
      cargarTratamientos();
    }
  }, [pacienteId]);

  const cargarTratamientos = () => {
    if (!pacienteId) {
      setTratamientos([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    getTratamientosByPaciente(pacienteId)
      .then(res => setTratamientos(res.data))
      .catch((err) => {
        setTratamientos([]);
        console.log('Error al obtener tratamientos:', err);
      })
      .finally(() => setLoading(false));
  };

  const renderTratamiento = ({ item }) => {
    // Lógica para determinar el estado
    let estado = 'En curso';
    if (item.fecha_fin) {
      const hoy = new Date();
      const fechaFin = new Date(item.fecha_fin);
      // Normalizar solo la fecha (sin hora)
      hoy.setHours(0,0,0,0);
      fechaFin.setHours(0,0,0,0);
      if (fechaFin <= hoy) {
        estado = 'Completado';
      }
    }
    return (
      <View style={styles.tratamientoCard}>
        <View style={styles.tratamientoHeader}>
          <Text style={styles.tratamientoTipo}>{item.tipo_tratamiento}</Text>
          <Text style={[styles.tratamientoEstado, estado === 'En curso' ? styles.estadoEnCurso : styles.estadoCompletado]}>
            {estado}
          </Text>
        </View>
        
        <View style={styles.tratamientoInfo}>
          <Text style={styles.tratamientoDetalle}>
            <Text style={styles.label}>Dosis:</Text> {item.dosis || 'N/A'}
          </Text>
          <Text style={styles.tratamientoDetalle}>
            <Text style={styles.label}>Inicio:</Text> {item.fecha_inicio}
          </Text>
          {item.fecha_fin && (
            <Text style={styles.tratamientoDetalle}>
              <Text style={styles.label}>Fin:</Text> {item.fecha_fin}
            </Text>
          )}
        </View>

        {item.notas_tratamiento && (
          <Text style={styles.tratamientoNotas}>
            <Text style={styles.label}>Notas:</Text> {item.notas_tratamiento}
          </Text>
        )}
        
        {item.resultados_observados && (
          <Text style={styles.tratamientoResultados}>
            <Text style={styles.label}>Resultados:</Text> {item.resultados_observados}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Tratamientos</Text>
      
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
          <ActivityIndicator size="large" color="#43a047" />
          <Text style={styles.loadingText}>Cargando tratamientos...</Text>
        </View>
      ) : (
        <FlatList
          data={tratamientos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTratamiento}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {pacienteId ? 'No hay tratamientos registrados para este paciente.' : 'Selecciona un paciente para ver su historial.'}
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
  tratamientoCard: {
    backgroundColor: '#c8f0f7',
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
    borderLeftWidth: 4,
    borderLeftColor: '#001666'
  },
  tratamientoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#001666'
  },
  tratamientoTipo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001666'
  },
  tratamientoEstado: {
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: '#c8e6c9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#43a047',
    overflow: 'hidden',
  },
  estadoEnCurso: {
    backgroundColor: '#ffe0b2',
    color: '#ef6c00',
  },
  estadoCompletado: {
    backgroundColor: '#c8e6c9',
    color: '#43a047',
  },
  tratamientoInfo: {
    marginBottom: 10
  },
  tratamientoDetalle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 22
  },
  tratamientoNotas: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 20
  },
  tratamientoResultados: {
    fontSize: 14,
    color: '#0076b5',
    fontWeight: '500',
    lineHeight: 20
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