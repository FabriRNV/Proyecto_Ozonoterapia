import pandas as pd


def agregar_caso_csv(
    edad,
    genero,
    motivo,
    tipo_tratamiento,
    dosis,
    resultados_observados,
    patologia,
    archivo_csv="Casos.csv",
):
    # Crea un diccionario con los datos
    nuevo_caso = {
        "edad": edad,
        "genero": genero,
        "motivo": motivo,
        "tipo_tratamiento": tipo_tratamiento,
        "dosis": dosis,
        "resultados_observados": resultados_observados,
        "patologia": patologia,
    }
    # Lee el CSV existente
    try:
        df = pd.read_csv(archivo_csv)
    except FileNotFoundError:
        # Si no existe, crea uno nuevo con el caso
        df = pd.DataFrame(columns=nuevo_caso.keys())
    # Agrega el nuevo caso
    df = pd.concat([df, pd.DataFrame([nuevo_caso])], ignore_index=True)
    # Guarda el CSV actualizado
    df.to_csv(archivo_csv, index=False)
    print("Caso agregado correctamente.")


# Ejemplo de uso:
if __name__ == "__main__":
    agregar_caso_csv(
        edad=50,
        genero="Femenino",
        motivo="Dolor articular",
        tipo_tratamiento="Ozonoterapia intraarticular",
        dosis="Media",
        resultados_observados="Mejoría leve",
        patologia="Gonartrosis leve, sin deformidad",
    )
