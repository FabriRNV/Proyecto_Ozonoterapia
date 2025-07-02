import pandas as pd
from model import OzonoterapiaPredictor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from fpdf import FPDF
from datetime import datetime

REQUIRED_COLUMNS = [
    "edad",
    "genero",
    "motivo",
    "tipo_tratamiento",
    "dosis",
    "resultados_observados",
    "patologia",
]


class PDFReporte(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "Reporte de Métricas del Modelo de IA", 0, 1, "C")
        self.ln(2)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, f"Página {self.page_no()}", 0, 0, "C")


def main():
    # Lee los datos desde el archivo CSV
    df = pd.read_csv("Casos.csv")
    # Limpia los nombres de las columnas (quita espacios, minúsculas)
    df.columns = [c.strip().lower() for c in df.columns]
    print("Columnas leídas del CSV:", df.columns.tolist())
    print("Etiquetas únicas en patologia:", df["patologia"].unique())
    # Validar columnas requeridas
    missing = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing:
        print(
            f"ADVERTENCIA: Faltan las siguientes columnas requeridas en el CSV: {missing}"
        )
        return
    df = df.dropna(subset=["patologia"])
    df = df[df["patologia"].astype(str).str.strip() != ""]
    X = df.drop(columns=["patologia"]).to_dict(orient="records")
    y = df["patologia"].tolist()

    # Split en train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = OzonoterapiaPredictor()
    model.train(X_train, y_train)
    model.save_model("ozonoterapia_model.joblib")
    print("Modelo entrenado y guardado exitosamente")

    # Evaluación en test
    print("\n--- MÉTRICAS DEL MODELO EN TEST ---")
    y_pred = [model.predict(x)["patologia_predicha"] for x in X_test]
    acc = accuracy_score(y_test, y_pred)
    classif_report_dict = classification_report(
        y_test, y_pred, output_dict=True, zero_division=0
    )
    classif_report = classification_report(y_test, y_pred, zero_division=0)
    conf_matrix = confusion_matrix(y_test, y_pred)
    print(f"Accuracy: {acc:.3f}")
    print("\nClassification report:")
    print(classif_report)
    print("Matriz de confusión:")
    print(conf_matrix)

    # Guardar reporte en archivo de texto
    with open("reporte_modelo.txt", "w", encoding="utf-8") as f:
        f.write("--- MÉTRICAS DEL MODELO EN TEST ---\n")
        f.write(f"Accuracy: {acc:.3f}\n\n")
        f.write("Classification report:\n")
        f.write(classif_report + "\n")
        f.write("Matriz de confusión:\n")
        f.write(str(conf_matrix) + "\n")
        f.write("\nNotas sobre las métricas:\n")
        f.write("- Accuracy: Proporción de aciertos totales.\n")
        f.write(
            "- Precision: De las veces que el modelo predijo una clase, cuántas acertó.\n"
        )
        f.write(
            "- Recall: De los casos reales de una clase, cuántos detectó el modelo.\n"
        )
        f.write("- F1-score: Promedio armónico entre precision y recall.\n")
        f.write(
            "- Soporte: Cantidad de casos reales de cada clase en el set de test.\n"
        )
        f.write("- Matriz de confusión: Filas = reales, columnas = predichas.\n")

    # Guardar reporte en PDF con formato profesional
    pdf = PDFReporte()
    pdf.set_auto_page_break(auto=True, margin=20)
    # Portada
    pdf.add_page()
    pdf.set_font("Arial", "B", 18)
    pdf.ln(40)
    pdf.cell(0, 12, "Reporte de Métricas del Modelo de IA", 0, 1, "C")
    pdf.set_font("Arial", "", 12)
    pdf.ln(10)
    pdf.cell(
        0,
        10,
        f'Fecha de generación: {datetime.now().strftime("%d/%m/%Y %H:%M")}',
        0,
        1,
        "C",
    )
    pdf.ln(60)
    pdf.set_font("Arial", "I", 11)
    pdf.cell(
        0,
        10,
        "Este reporte ha sido generado automáticamente para fines académicos.",
        0,
        1,
        "C",
    )
    # Página de métricas
    pdf.add_page()
    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, "Métricas de Evaluación", 0, 1, "L")
    pdf.set_font("Arial", "", 12)
    pdf.ln(2)
    pdf.cell(0, 8, f"Accuracy: {acc:.3f}", 0, 1, "L")
    pdf.ln(4)
    # Classification report como tabla
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Classification report:", 0, 1, "L")
    pdf.set_font("Arial", "", 9)
    # Encabezados de la tabla
    headers = ["Clase", "Precision", "Recall", "F1-score", "Soporte"]
    col_widths = [50, 25, 25, 25, 25]
    for i, h in enumerate(headers):
        pdf.set_fill_color(220, 220, 220)
        pdf.cell(col_widths[i], 8, h, 1, 0, "C", 1)
    pdf.ln()
    # Filas de la tabla
    for clase, vals in classif_report_dict.items():
        if clase in ["accuracy", "macro avg", "weighted avg"]:
            continue
        pdf.set_fill_color(255, 255, 255)
        pdf.cell(col_widths[0], 8, str(clase)[:22], 1, 0, "L", 1)
        pdf.cell(col_widths[1], 8, f"{vals['precision']:.2f}", 1, 0, "C", 1)
        pdf.cell(col_widths[2], 8, f"{vals['recall']:.2f}", 1, 0, "C", 1)
        pdf.cell(col_widths[3], 8, f"{vals['f1-score']:.2f}", 1, 0, "C", 1)
        pdf.cell(col_widths[4], 8, f"{int(vals['support'])}", 1, 0, "C", 1)
        pdf.ln()
    # Macro avg y weighted avg
    for avg in ["macro avg", "weighted avg"]:
        vals = classif_report_dict[avg]
        pdf.set_fill_color(240, 240, 240)
        pdf.cell(col_widths[0], 8, avg, 1, 0, "L", 1)
        pdf.cell(col_widths[1], 8, f"{vals['precision']:.2f}", 1, 0, "C", 1)
        pdf.cell(col_widths[2], 8, f"{vals['recall']:.2f}", 1, 0, "C", 1)
        pdf.cell(col_widths[3], 8, f"{vals['f1-score']:.2f}", 1, 0, "C", 1)
        pdf.cell(col_widths[4], 8, f"{int(vals['support'])}", 1, 0, "C", 1)
        pdf.ln()
    pdf.ln(4)
    # Matriz de confusión como tabla
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Matriz de confusión:", 0, 1, "L")
    pdf.set_font("Arial", "", 9)
    clases = list(model.pipeline.classes_)

    # Generar siglas para cada clase
    def siglas(nombre):
        return "".join([w[0].upper() for w in nombre.split() if w[0].isalpha()])

    clase_siglas = {c: siglas(c) for c in clases}
    # Definir anchos: primera columna más ancha, las demás más angostas
    col_width_first = max(22, min(35, pdf.w / (len(clases) + 1) - 5))
    col_width_other = max(12, min(18, (pdf.w - col_width_first) / len(clases) - 2))
    pdf.set_fill_color(220, 220, 220)
    pdf.cell(col_width_first, 10, "", 1, 0, "C", 1)
    for c in clases:
        pdf.cell(col_width_other, 10, clase_siglas[c], 1, 0, "C", 1)
    pdf.ln()
    for i, row in enumerate(conf_matrix):
        pdf.set_fill_color(220, 220, 220)
        pdf.cell(col_width_first, 10, clase_siglas[clases[i]], 1, 0, "C", 1)
        pdf.set_fill_color(255, 255, 255)
        for val in row:
            pdf.cell(col_width_other, 10, str(val), 1, 0, "C", 1)
        pdf.ln()
    pdf.ln(2)
    # Leyenda de siglas
    pdf.set_font("Arial", "I", 8)
    leyenda = "Siglas de patologías: "
    leyenda += ",  ".join([f"{v}: {k}" for k, v in clase_siglas.items()])
    pdf.multi_cell(0, 6, leyenda)
    pdf.ln(4)
    pdf.set_font("Arial", "I", 10)
    pdf.multi_cell(
        0,
        7,
        (
            "Notas sobre las métricas:\n"
            "- Accuracy: Proporción de aciertos totales.\n"
            "- Precision: De las veces que el modelo predijo una clase, cuántas acertó.\n"
            "- Recall: De los casos reales de una clase, cuántos detectó el modelo.\n"
            "- F1-score: Promedio armónico entre precision y recall.\n"
            "- Soporte: Cantidad de casos reales de cada clase en el set de test.\n"
            "- Matriz de confusión: Filas = reales, columnas = predichas.\n"
        ),
    )
    try:
        pdf.output("reporte_modelo.pdf")
    except PermissionError:
        print(
            "\n[ADVERTENCIA] No se pudo guardar 'reporte_modelo.pdf'.\nCierra el archivo si está abierto en otro programa e inténtalo de nuevo."
        )


if __name__ == "__main__":
    main()
