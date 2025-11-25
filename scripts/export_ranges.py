from pathlib import Path
import pandas as pd
import json

# === CONFIGURACIÓN ===
EXCEL_PATH = Path("data/CALC_CRIO_Rev25.11.xlsm")
SHEET_NAME = "RANGOS"
OUTPUT_PATH = Path("data/ranges.js")


def clean(value):
    """Convierte valores a texto limpio."""
    if pd.isna(value):
        return None
    return str(value).strip()


def extract_vertical_range(df, col_index, start_row):
    """
    Extrae una lista vertical desde una columna empezando en start_row
    hasta que encuentra una celda vacía.
    """
    values = []
    row = start_row

    while row < len(df):
        val = clean(df.iloc[row, col_index])
        if val is None or val == "":
            break
        values.append(val)
        row += 1

    return values


def main():
    # 1. Leer la hoja completa SIN cabeceras (como priceData) 
    sheet = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=None)

    ranges = {}

    # 2. Buscar columnas con títulos de rangos
    #    Regla: la celda que contiene el nombre del rango NUNCA está vacía.
    #           Las celdas debajo son los valores.
    for row in range(len(sheet)):
        for col in range(len(sheet.columns)):

            cell_value = clean(sheet.iloc[row, col])
            if cell_value is None or cell_value == "":
                continue

            # Filtrar nombres válidos: sin espacios y alfanuméricos
            if not cell_value.replace("_", "").isalnum():
                continue

            # Extraer lista vertical debajo del nombre
            values = extract_vertical_range(sheet, col, row + 1)

            if len(values) > 0:
                ranges[cell_value] = values

    # 3. Guardar en formato JS como priceData.js
    output_js = "const ranges = " + json.dumps(ranges, indent=2) + ";\n"
    OUTPUT_PATH.write_text(output_js, encoding="utf-8")

    print(f"Generado {OUTPUT_PATH} con {len(ranges)} listas.")


if __name__ == "__main__":
    main()
