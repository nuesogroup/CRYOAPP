from pathlib import Path
import pandas as pd
import json

EXCEL_PATH = Path("data/CALC_CRIO_Rev25.11.xlsm")
SHEET_NAME = "B36_19"   # cambia aquí si tu hoja se llama distinto

def clean(v):
    if pd.isna(v):
        return None
    return str(v).strip()

def is_number(x):
    try:
        float(x)
        return True
    except:
        return False

def main():
    print("Leyendo hoja:", SHEET_NAME)
    sheet = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=None)

    # 1) Buscar fila de cabeceras (donde aparezcan DN, Shedule No, Plain End Weight Mass (kg/m), texto)
    header_idx = None
    header_row = None

    for i, row in sheet.iterrows():
        row_str = [clean(x) for x in row]
        if "DN" in row_str and any(v and "Shedule" in v for v in row_str):
            header_idx = i
            header_row = row_str
            break

    if header_idx is None:
        raise RuntimeError("No se ha encontrado la fila de cabeceras")

    # 2) Localizar columnas por NOMBRE
    # DN
    col_dn = header_row.index("DN")

    # Schedule (Shedule No)
    col_schedule = None
    for idx, val in enumerate(header_row):
        if val and "Shedule" in val and "No" in val:
            col_schedule = idx
            break
    if col_schedule is None:
        raise RuntimeError("No se ha encontrado la columna Shedule No.")

    # kg/m
    col_kg = None
    for idx, val in enumerate(header_row):
        if val and "Plain End Weight Mass (kg/m" in val:
            col_kg = idx
            break
    if col_kg is None:
        raise RuntimeError("No se ha encontrado la columna Plain End Weight Mass (kg/m)")

    # NPS para la WEB: columna "texto" (1/8, 1/4, etc.)
    col_nps_text = None
    for idx, val in enumerate(header_row):
        if val and val.lower() == "texto":
            col_nps_text = idx
            break
    if col_nps_text is None:
        raise RuntimeError("No se ha encontrado la columna 'texto' para NPS")

    print(
        "Columnas detectadas -> NPS(texto):", col_nps_text,
        "DN:", col_dn,
        "Schedule:", col_schedule,
        "kg/m:", col_kg
    )

    # 3) Recorrer filas de datos
    data = sheet.iloc[header_idx + 1 :]

    dim_rows = []

    for _, row in data.iterrows():
        nps      = clean(row[col_nps_text])   # <- '1/8', '1/4', etc.
        dn       = clean(row[col_dn])
        schedule = clean(row[col_schedule])
        kg       = row[col_kg]

        if not nps or not dn or not schedule:
            continue
        if pd.isna(kg) or not is_number(kg):
            continue

        dim_rows.append({
            "nps": nps,
            "dn": dn,
            "schedule": schedule,
            "kgPerM": float(kg),
        })

    output_js = "const dimData = " + json.dumps(dim_rows, indent=2) + ";\n"
    output_path = Path("data/dimData.js")
    output_path.write_text(output_js, encoding="utf-8")

    print(f"✔ Generado {output_path} con {len(dim_rows)} filas válidas.")

if __name__ == "__main__":
    main()
