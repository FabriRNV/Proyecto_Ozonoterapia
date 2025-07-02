import requests
import json


def test_health():
    """Prueba el endpoint de salud"""
    response = requests.get("http://localhost:8000/health")
    print("\n1. Prueba de salud:")
    print(f"Status: {response.status_code}")
    print(f"Respuesta: {response.json()}")
    print("-" * 50)


def test_prediction():
    """Prueba el endpoint de predicción con diferentes casos"""
    # Caso 1: Paciente con dolor articular y ozonoterapia intraarticular
    caso1 = {
        "edad": 60,
        "genero": "Femenino",
        "motivo": "Dolor articular",
        "tipo_tratamiento": "Ozonoterapia intraarticular",
        "dosis": "Alta",
        "resultados_observados": "Mejoría significativa",
    }
    # Caso 2: Paciente con dolor crónico y mejoría significativa
    caso2 = {
        "edad": 45,
        "genero": "Masculino",
        "motivo": "Dolor crónico",
        "tipo_tratamiento": "Ozonoterapia sistémica",
        "dosis": "Media",
        "resultados_observados": "Mejoría significativa",
    }
    # Caso 3: Paciente con inflamación y fisioterapia
    caso3 = {
        "edad": 35,
        "genero": "Femenino",
        "motivo": "Inflamación",
        "tipo_tratamiento": "Fisioterapia",
        "dosis": "Baja",
        "resultados_observados": "Sin cambios",
    }
    print("\n2. Prueba de predicciones:")
    for i, caso in enumerate([caso1, caso2, caso3], 1):
        print(f"\nCaso {i}:")
        response = requests.post("http://localhost:8000/predict", json=caso)
        print(f"Status: {response.status_code}")
        print(f"Respuesta: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    print("-" * 50)


def main():
    print("Iniciando pruebas del servicio de IA...")
    test_health()
    test_prediction()
    print("\nPruebas completadas!")


if __name__ == "__main__":
    main()
