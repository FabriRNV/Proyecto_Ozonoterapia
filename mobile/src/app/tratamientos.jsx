import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { getPacientes, getDoctores, registrarTratamiento } from '../services/api';

export default function TratamientosScreen() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [pacienteId, setPacienteId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [loading, setLoading] = useState(false);

  // Estado para fechas
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [tipoTratamiento, setTipoTratamiento] = useState('');
  const [dosis, setDosis] = useState('');
  const [notasTratamiento, setNotasTratamiento] = useState('');
  const [resultadosObservados, setResultadosObservados] = useState('');
  const [registrando, setRegistrando] = useState(false);

  // Estados para mostrar los pickers
  const [showDateInicioPicker, setShowDateInicioPicker] = useState(false);
  const [showDateFinPicker, setShowDateFinPicker] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getPacientes().then(res => setPacientes(res.data)).catch(() => setPacientes([])),
      getDoctores().then(res => setDoctores(res.data)).catch(() => setDoctores([]))
    ]).finally(() => setLoading(false));
  }, []);

  const handleDateInicioChange = (event, selectedDate) => {
    setShowDateInicioPicker(false);
    if (selectedDate) {
      setFechaInicio(selectedDate);
    }
  };

  const handleDateFinChange = (event, selectedDate) => {
    setShowDateFinPicker(false);
    if (selectedDate) {
      setFechaFin(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const handleRegistrarTratamiento = async () => {
    if (!pacienteId || !doctorId || !tipoTratamiento) {
      Alert.alert('Error', 'Completa los campos obligatorios (Paciente, Doctor y Tipo de Tratamiento)');
      return;
    }
    setRegistrando(true);
    try {
      await registrarTratamiento({
        paciente_id: parseInt(pacienteId),
        doctor_id: parseInt(doctorId),
        tipo_tratamiento: tipoTratamiento,
        dosis: dosis || null,
        fecha_inicio: formatDate(fechaInicio),
        fecha_fin: formatDate(fechaFin),
        notas_tratamiento: notasTratamiento || null,
        resultados_observados: resultadosObservados || null,
      });
      Alert.alert('Éxito', 'Tratamiento registrado correctamente');
      setPacienteId('');
      setDoctorId('');
      setFechaInicio(new Date());
      setFechaFin(new Date());
      setTipoTratamiento('');
      setDosis('');
      setNotasTratamiento('');
      setResultadosObservados('');
    } catch (e) {
      Alert.alert('Error', 'No se pudo registrar el tratamiento');
    } finally {
      setRegistrando(false);
    }
  };

  const irAlHistorial = () => {
    router.push('/historial-tratamientos');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#43a047" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Nuevo Tratamiento</Text>
        <TouchableOpacity style={styles.historialButton} onPress={irAlHistorial}>
          <Text style={styles.historialButtonText}>Ver Historial</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Paciente *</Text>
          <Picker
            selectedValue={pacienteId}
            onValueChange={setPacienteId}
            style={styles.input}
          >
            <Picker.Item label="Selecciona un paciente" value="" />
            {pacientes.map(p => (
              <Picker.Item key={p.id} label={p.nombre} value={p.id.toString()} />
            ))}
          </Picker>

          <Text style={styles.label}>Doctor *</Text>
          <Picker
            selectedValue={doctorId}
            onValueChange={setDoctorId}
            style={styles.input}
          >
            <Picker.Item label="Selecciona un doctor" value="" />
            {doctores.map(d => (
              <Picker.Item key={d.id} label={`Dr. ${d.nombre}`} value={d.id.toString()} />
            ))}
          </Picker>

          <Text style={styles.label}>Tipo de Tratamiento *</Text>
          <TextInput
            style={styles.input}
            placeholder="Especifica el tipo de tratamiento"
            value={tipoTratamiento}
            onChangeText={setTipoTratamiento}
          />

          <Text style={styles.label}>Dosis</Text>
          <TextInput
            style={styles.input}
            placeholder="Especifica la dosis si aplica"
            value={dosis}
            onChangeText={setDosis}
          />

          <Text style={styles.label}>Fecha de Inicio *</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowDateInicioPicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(fechaInicio)}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Fecha de Fin</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowDateFinPicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(fechaFin)}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Notas del Tratamiento</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Agrega notas adicionales sobre el tratamiento"
            value={notasTratamiento}
            onChangeText={setNotasTratamiento}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Resultados Observados</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe los resultados observados"
            value={resultadosObservados}
            onChangeText={setResultadosObservados}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <TouchableOpacity 
            style={[styles.registerButton, registrando && styles.registerButtonDisabled]} 
            onPress={handleRegistrarTratamiento} 
            disabled={registrando}
          >
            <Text style={styles.registerButtonText}>
              {registrando ? "Registrando..." : "Registrar Tratamiento"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDateInicioPicker && (
        <DateTimePicker
          value={fechaInicio}
          mode="date"
          display="default"
          onChange={handleDateInicioChange}
        />
      )}

      {showDateFinPicker && (
        <DateTimePicker
          value={fechaFin}
          mode="date"
          display="default"
          onChange={handleDateFinChange}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1
  },
  historialButton: {
    backgroundColor: '#43a047',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8
  },
  historialButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9'
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333'
  },
  registerButton: {
    backgroundColor: '#43a047',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc'
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});