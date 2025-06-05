import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from typing import List, Dict


class OzonoterapiaPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100, max_depth=10, random_state=42
        )
        self.scaler = StandardScaler()
        self.feature_names = [
            "edad",
            "sintomas_dolor",
            "tiempo_evolucion",
            "antecedentes_medicos",
            "nivel_actividad",
            "tratamientos_previos",
        ]

    def preprocess_data(self, data: Dict) -> np.ndarray:
        """Preprocesa los datos de entrada para el modelo"""
        features = []
        for feature in self.feature_names:
            features.append(data.get(feature, 0))
        return np.array(features).reshape(1, -1)

    def train(self, X: np.ndarray, y: np.ndarray):
        """Entrena el modelo con los datos proporcionados"""
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)

    def predict(self, data: Dict) -> Dict:
        """Realiza una predicción basada en los datos del paciente"""
        features = self.preprocess_data(data)
        features_scaled = self.scaler.transform(features)

        prediction = self.model.predict(features_scaled)[0]
        probability = self.model.predict_proba(features_scaled)[0]

        return {
            "recomendado": bool(prediction),
            "probabilidad": float(max(probability)),
            "explicacion": self._generate_explanation(data, prediction, probability),
        }

    def _generate_explanation(
        self, data: Dict, prediction: int, probability: np.ndarray
    ) -> str:
        """Genera una explicación de la predicción"""
        if prediction:
            return f"Basado en los síntomas y características del paciente, la ozonoterapia podría ser beneficiosa con una probabilidad del {probability[1]*100:.1f}%"
        else:
            return f"Basado en los síntomas y características del paciente, la ozonoterapia podría no ser la mejor opción en este caso (probabilidad: {probability[0]*100:.1f}%)"

    def save_model(self, path: str):
        """Guarda el modelo entrenado"""
        joblib.dump(
            {
                "model": self.model,
                "scaler": self.scaler,
                "feature_names": self.feature_names,
            },
            path,
        )

    def load_model(self, path: str):
        """Carga un modelo previamente entrenado"""
        saved_data = joblib.load(path)
        self.model = saved_data["model"]
        self.scaler = saved_data["scaler"]
        self.feature_names = saved_data["feature_names"]
