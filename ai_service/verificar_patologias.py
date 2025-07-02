import pandas as pd
from collections import Counter

# Leer el CSV
df = pd.read_csv("Casos.csv")

# Contar las patologías
patologias_count = Counter(df["patologia"])

print("Distribución de patologías en el CSV:")
print("=" * 50)
for patologia, count in patologias_count.most_common():
    print(f"{patologia}: {count} casos")

print(f"\nTotal de casos: {len(df)}")
print(f"Patologías únicas: {len(patologias_count)}")

# Verificar que todas las patologías esperadas estén presentes
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

print(f"\nPatologías esperadas: {len(patologias_esperadas)}")
print("Patologías faltantes:")
for pat in patologias_esperadas:
    if pat not in patologias_count:
        print(f"  - {pat}")
    else:
        print(f"  ✓ {pat} ({patologias_count[pat]} casos)")
