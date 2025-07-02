import pandas as pd
from model import OzonoterapiaPredictor
from sklearn.model_selection import train_test_split
from collections import Counter


def main():
    # Lee los datos desde el archivo CSV
    df = pd.read_csv("Casos.csv")
    df.columns = [c.strip().lower() for c in df.columns]

    print("=== ANÁLISIS DE DISTRIBUCIÓN DE PATOLOGÍAS ===")
    print(f"Total de casos en CSV: {len(df)}")

    # Mostrar distribución completa
    patologias_count = Counter(df["patologia"])
    print("\n1. DISTRIBUCIÓN COMPLETA EN CSV:")
    for pat, count in patologias_count.most_common():
        print(f"   {pat}: {count} casos")

    # Preparar datos
    df = df.dropna(subset=["patologia"])
    df = df[df["patologia"].astype(str).str.strip() != ""]
    X = df.drop(columns=["patologia"]).to_dict(orient="records")
    y = df["patologia"].tolist()

    # Split con stratify
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Mostrar distribución en train
    train_count = Counter(y_train)
    print(f"\n2. DISTRIBUCIÓN EN TRAIN ({len(y_train)} casos):")
    for pat, count in train_count.most_common():
        print(f"   {pat}: {count} casos")

    # Mostrar distribución en test
    test_count = Counter(y_test)
    print(f"\n3. DISTRIBUCIÓN EN TEST ({len(y_test)} casos):")
    for pat, count in test_count.most_common():
        print(f"   {pat}: {count} casos")

    # Verificar que todas las patologías estén en train
    print(f"\n4. VERIFICACIÓN DE PATOLOGÍAS EN TRAIN:")
    patologias_esperadas = [
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

    for pat in patologias_esperadas:
        if pat in train_count:
            print(f"   ✓ {pat}: {train_count[pat]} casos en train")
        else:
            print(f"   ✗ {pat}: NO está en train")

    # Entrenar modelo y verificar clases
    print(f"\n5. ENTRENAMIENTO DEL MODELO:")
    model = OzonoterapiaPredictor()
    model.train(X_train, y_train)

    print(f"   Clases reconocidas por el modelo: {len(model.pipeline.classes_)}")
    print("   Clases:")
    for i, clase in enumerate(model.pipeline.classes_):
        print(f"     {i+1}. {clase}")

    # Verificar predicciones
    print(f"\n6. PRUEBA DE PREDICCIÓN:")
    y_pred = [model.predict(x)["patologia_predicha"] for x in X_test]
    pred_count = Counter(y_pred)
    print(f"   Patologías predichas en test:")
    for pat, count in pred_count.most_common():
        print(f"     {pat}: {count} predicciones")


if __name__ == "__main__":
    main()
