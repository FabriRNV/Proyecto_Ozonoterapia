import numpy as np
import pandas as pd
from model import OzonoterapiaPredictor
import joblib


def generate_sample_data(n_samples=1000):
    """Genera datos de muestra para entrenamiento"""
    np.random.seed(42)

    data = {
        "edad": np.random.randint(18, 80, n_samples),
        "sintomas_dolor": np.random.randint(1, 11, n_samples),
        "tiempo_evolucion": np.random.randint(1, 60, n_samples),
        "antecedentes_medicos": np.random.randint(0, 5, n_samples),
        "nivel_actividad": np.random.randint(1, 11, n_samples),
        "tratamientos_previos": np.random.randint(0, 10, n_samples),
    }

    # Crear etiquetas basadas en reglas simples
    # Estas reglas son solo para demostración y deberían ser reemplazadas
    # con datos reales y reglas médicas apropiadas
    labels = []
    for i in range(n_samples):
        score = 0
        # Mayor edad -> más probable
        score += data["edad"][i] / 80
        # Mayor dolor -> más probable
        score += data["sintomas_dolor"][i] / 10
        # Mayor tiempo de evolución -> más probable
        score += data["tiempo_evolucion"][i] / 60
        # Menos antecedentes -> más probable
        score += (5 - data["antecedentes_medicos"][i]) / 5
        # Menor nivel de actividad -> más probable
        score += (11 - data["nivel_actividad"][i]) / 10
        # Menos tratamientos previos -> más probable
        score += (10 - data["tratamientos_previos"][i]) / 10

        # Normalizar score
        score = score / 6

        # Asignar etiqueta
        labels.append(1 if score > 0.5 else 0)

    return pd.DataFrame(data), np.array(labels)


def main():
    # Generar datos de muestra
    X, y = generate_sample_data()

    # Crear y entrenar el modelo
    model = OzonoterapiaPredictor()
    model.train(X.values, y)

    # Guardar el modelo
    model.save_model("ozonoterapia_model.joblib")
    print("Modelo entrenado y guardado exitosamente")


if __name__ == "__main__":
    main()
