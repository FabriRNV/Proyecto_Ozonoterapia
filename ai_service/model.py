import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from typing import List, Dict

# Lista de patologías (enfermedades)
PATOLOGIAS = [
    "Gonartrosis leve, sin deformidad",
    "Condropatía femoropatelar",
    "Tendinopatía rotuliana",
    "Síndrome subacromial",
    "Tendinopatía manguito",
    "Artropatía hombro",
    "Hernias y protrusiones discales cervical y lumbar",
    "Contracturas musculares cervical y lumbar",
    "Dolor crónico en la fibromialgia",
]


class OzonoterapiaPredictor:
    def __init__(self):
        # Definir las features y su tipo
        self.feature_names = [
            "edad",  # numérico
            "genero",  # categórico
            "motivo",  # categórico
            "tipo_tratamiento",  # categórico
            "dosis",  # categórico
            "resultados_observados",  # categórico
        ]
        self.categorical_features = [
            "genero",
            "motivo",
            "tipo_tratamiento",
            "dosis",
            "resultados_observados",
        ]
        self.numerical_features = ["edad"]

        # Pipeline de preprocesamiento y modelo
        self.preprocessor = ColumnTransformer(
            [
                ("num", StandardScaler(), self.numerical_features),
                (
                    "cat",
                    OneHotEncoder(handle_unknown="ignore"),
                    self.categorical_features,
                ),
            ]
        )
        self.model = RandomForestClassifier(
            n_estimators=100, max_depth=10, random_state=42
        )
        self.pipeline = Pipeline(
            [
                ("preprocessor", self.preprocessor),
                ("classifier", self.model),
            ]
        )
        self.patologias = PATOLOGIAS

    def _normalize_dict(self, data: Dict) -> Dict:
        # Normaliza las claves a minúsculas y quita espacios
        return {k.strip().lower(): v for k, v in data.items()}

    def preprocess_data(self, data: Dict) -> Dict:
        # Si data es un array o lista, conviértelo a dict usando self.feature_names
        if isinstance(data, (list, np.ndarray)):
            data = {f: v for f, v in zip(self.feature_names, data)}
        data = self._normalize_dict(data)
        processed = {}
        for f in self.feature_names:
            val = data.get(f, "")
            if f == "edad":
                try:
                    val = int(val)
                except Exception:
                    val = 0
            processed[f] = val
        return processed

    def train(self, X: List[Dict], y: List[str]):
        # X: lista de dicts, y: lista de patologías
        X_proc = [self.preprocess_data(x) for x in X]
        import pandas as pd

        X_df = pd.DataFrame(X_proc)
        self.pipeline.fit(X_df, y)

    def predict(self, data: Dict) -> Dict:
        # data: dict con los features
        import pandas as pd

        X_df = pd.DataFrame([self.preprocess_data(data)])
        probs = self.pipeline.predict_proba(X_df)[0]
        idx_max = np.argmax(probs)
        patologia_pred = self.pipeline.classes_[idx_max]
        # Ranking de probabilidades
        ranking = [
            {"patologia": pat, "probabilidad": float(prob)}
            for pat, prob in zip(self.pipeline.classes_, probs)
        ]
        ranking = sorted(ranking, key=lambda x: x["probabilidad"], reverse=True)
        return {
            "patologia_predicha": patologia_pred,
            "probabilidad": float(probs[idx_max]),
            "ranking": ranking,
        }

    def save_model(self, path: str):
        joblib.dump(self.pipeline, path)

    def load_model(self, path: str):
        self.pipeline = joblib.load(path)
