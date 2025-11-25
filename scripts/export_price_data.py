from pathlib import Path
import pandas as pd
from datetime import datetime
import json

# Ruta al Excel dentro del repo
EXCEL_PATH = Path("data/CALC_CRIO_Rev25.11.xlsm")

# Leemos la hoja de la calculadora SIN cabeceras
sheet = pd.read_excel(EXCEL_PATH, sheet_name="01-CALCULADORAv06.00", header=None)

# Nos quedamos con las columnas donde está la tabla de precios:
# col 9 = fecha, col 10 = ACERIA UE, col 11 = DISTRIBUIDOR UE,
# col 12 = ASIA, col 13 = DISTR EU-ASIA, col 14 = índice de mes
tbl = sheet[[9, 10, 11, 12, 13, 14]]

# Filtramos solo las filas que tienen una fecha real
def is_datetime(x):
    return isinstance(x, (pd.Timestamp, datetime))

mask = tbl[9].apply(is_datetime)
tbl = tbl[mask]

records = []
for _, row in tbl.iterrows():
    d = row[9]
    records.append({
        "monthLabel": d.strftime("%b-%y"), 
        "date": d.date().isoformat(),
        "mill": float(row[10]),
        "distributor": float(row[11]),
        "asia": float(row[12]),
        "euAsia": float(row[13]),
        "monthIndex": int(row[14]),
    })

# Guardar JS
output_js = "const priceData = " + json.dumps(records, indent=2) + ";\n"

output_path = Path("data/priceData.js")
output_path.write_text(output_js, encoding="utf-8")

print(f"Generado {output_path} con {len(records)} filas.")
