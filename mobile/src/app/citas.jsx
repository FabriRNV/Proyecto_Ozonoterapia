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
import { getPacientes, getDoctores, registrarCita } from '../services/api';

export default function CitasScreen() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [pacienteId, setPacienteId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [loading, setLoading] = useState(false);

  // Estado para fecha y hora
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [motivo, setMotivo] = useState('');
  const [enfermedad, setEnfermedad] = useState('');
  const [fuente, setFuente] = useState('');
  const [registrando, setRegistrando] = useState(false);

  // Estados para mostrar los pickers
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getPacientes().then(res => setPacientes(res.data)).catch(() => setPacientes([])),
      getDoctores().then(res => setDoctores(res.data)).catch(() => setDoctores([]))
    ]).finally(() => setLoading(false));
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5); // HH:MM
  };

  const handleRegistrarCita = async () => {
    if (!pacienteId || !doctorId || !motivo) {
      Alert.alert('Error', 'Completa los campos obligatorios (Paciente, Doctor y Motivo)');
      return;
    }
    setRegistrando(true);
    try {
      await registrarCita({
        paciente_id: parseInt(pacienteId),
        doctor_id: parseInt(doctorId),
        fecha: formatDate(fecha),
        hora: formatTime(hora),
        motivo,
        enfermedad: enfermedad || null,
        fuente: fuente || null,
      });
      Alert.alert('Éxito', 'Cita registrada correctamente');
      setPacienteId('');
      setDoctorId('');
      setFecha(new Date());
      setHora(new Date());
      setMotivo('');
      setEnfermedad('');
      setFuente('');
    } catch (e) {
      Alert.alert('Error', 'No se pudo registrar la cita');
    } finally {
      setRegistrando(false);
    }
  };

  const irAlHistorial = () => {
    router.push('/historial-citas');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
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
        <Text style={styles.title}>Registrar Nueva Cita</Text>
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

          <Text style={styles.label}>Fecha *</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(fecha)}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Hora *</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatTime(hora)}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Motivo de la cita *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el motivo de la cita"
            value={motivo}
            onChangeText={setMotivo}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Enfermedad</Text>
          <TextInput
            style={styles.input}
            placeholder="Especifica la enfermedad si aplica"
            value={enfermedad}
            onChangeText={setEnfermedad}
          />

          <Text style={styles.label}>Fuente</Text>
          <TextInput
            style={styles.input}
            placeholder="Especifica la fuente de la cita"
            value={fuente}
            onChangeText={setFuente}
          />
          
          <TouchableOpacity 
            style={[styles.registerButton, registrando && styles.registerButtonDisabled]} 
            onPress={handleRegistrarCita} 
            disabled={registrando}
          >
            <Text style={styles.registerButtonText}>
              {registrando ? "Registrando..." : "Registrar Cita"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={handleTimeChange}
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
    backgroundColor: '#f4511e',
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
    backgroundColor: '#f4511e',
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