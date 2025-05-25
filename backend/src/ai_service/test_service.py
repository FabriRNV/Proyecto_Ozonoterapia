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
    # Caso 1: Paciente con alta probabilidad de beneficio
    caso1 = {
        "edad": 45,
        "sintomas_dolor": 8,
        "tiempo_evolucion": 12,
        "antecedentes_medicos": 1,
        "nivel_actividad": 3,
        "tratamientos_previos": 2,
    }

    # Caso 2: Paciente con baja probabilidad de beneficio
    caso2 = {
        "edad": 30,
        "sintomas_dolor": 3,
        "tiempo_evolucion": 2,
        "antecedentes_medicos": 4,
        "nivel_actividad": 8,
        "tratamientos_previos": 5,
    }

    print("\n2. Prueba de predicciones:")

    print("\nCaso 1 - Paciente con alta probabilidad:")
    response1 = requests.post("http://localhost:8000/predict", json=caso1)
    print(f"Status: {response1.status_code}")
    print(f"Respuesta: {json.dumps(response1.json(), indent=2, ensure_ascii=False)}")

    print("\nCaso 2 - Paciente con baja probabilidad:")
    response2 = requests.post("http://localhost:8000/predict", json=caso2)
    print(f"Status: {response2.status_code}")
    print(f"Respuesta: {json.dumps(response2.json(), indent=2, ensure_ascii=False)}")
    print("-" * 50)


def main():
    print("Iniciando pruebas del servicio de IA...")
    test_health()
    test_prediction()
    print("\nPruebas completadas!")


if __name__ == "__main__":
    main()
