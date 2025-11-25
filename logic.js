// 1. REFERENCIAS A ELEMENTOS DEL DOM
const pricesTableBody = document.querySelector("#pricesTable tbody");
const monthSelect = document.getElementById("monthSelect");
const summaryOutput = document.getElementById("summaryOutput");
const currentKgsLabelEl = document.getElementById("currentKgsLabel");

// Selects de datos de tubo
const npsSelect = document.getElementById("npsSelect");
const dnSelect = document.getElementById("dnSelect");
const standardSelect = document.getElementById("standardSelect");
const materialSelect = document.getElementById("materialSelect");

// Ejemplo de inputs numéricos
const peKgMtInput = document.getElementById("peKgMt");
const metersInput = document.getElementById("meters");

// 2. FUNCIONES AUXILIARES
function toNumber(v) {
  return parseFloat(v || "0") || 0;
}

function formatCurrency(v) {
  const n = toNumber(v);
  return n.toFixed(2).replace(".", ",") + " €";
}

/**
 * Rellena un <select> con un array de valores.
 * Equivale a usar un rango con nombre en Excel.
 */
function fillSelect(selectEl, values) {
  if (!selectEl || !values) return;
  selectEl.innerHTML = "";
  values.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectEl.appendChild(opt);
  });
}

// 3. FUNCIONES DE DIBUJO (tabla y gráfica) usando priceData
function renderTable(activeMonthLabel) {
  if (!pricesTableBody) return;

  pricesTableBody.innerHTML = "";
  priceData.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.monthLabel === activeMonthLabel) tr.classList.add("active-row");
    tr.innerHTML = `
      <td>${row.monthLabel}</td>
      <td>${formatCurrency(row.mill)}</td>
      <td>${formatCurrency(row.distributor)}</td>
      <td>${formatCurrency(row.asia)}</td>
      <td>${formatCurrency(row.euAsia)}</td>
    `;
    pricesTableBody.appendChild(tr);
  });
}

function initChart() {
  const canvas = document.getElementById("priceChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const labels = priceData.map((r) => r.monthLabel);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "ACERIA UE", data: priceData.map((r) => r.mill) },
        { label: "DISTRIBUIDOR UE", data: priceData.map((r) => r.distributor) },
        { label: "ASIA", data: priceData.map((r) => r.asia) },
        { label: "DISTR EU-ASIA", data: priceData.map((r) => r.euAsia) },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (v) => v.toFixed(2) + " €",
          },
        },
      },
    },
  });
}

/**
 * Rellena el select de meses con los datos de priceData.
 */
function initMonths() {
  if (!monthSelect) return;
  fillSelect(
    monthSelect,
    priceData.map((r) => r.monthLabel)
  );
}

/**
 * Inicializa la lógica de selección de los desplegables,
 * imitando el comportamiento de la hoja RANGOS del Excel.
 */
function initDropdowns() {
  if (typeof ranges === "undefined") {
    console.warn("ranges.js no está cargado");
    return;
  }

  // 1) Rellenar listas básicas desde RANGOS (equivalente a usar rangos con nombre)
  if (npsSelect) fillSelect(npsSelect, ranges.NPS);
  if (dnSelect) fillSelect(dnSelect, ranges.DN);
  if (standardSelect) fillSelect(standardSelect, ranges.Standard);
  if (materialSelect) fillSelect(materialSelect, ranges.Material);

  // 2) Sincronizar NPS <-> DN por posición (como las filas NPS y DN en la hoja RANGOS)
  if (npsSelect && dnSelect && ranges.NPS && ranges.DN) {
    // Al inicio: fijamos ambos al primer valor
    if (ranges.NPS.length > 0 && ranges.DN.length > 0) {
      npsSelect.value = ranges.NPS[0];
      dnSelect.value = ranges.DN[0];
    }

    // Cuando cambia NPS, actualizamos DN al mismo índice
    npsSelect.addEventListener("change", () => {
      const idx = ranges.NPS.indexOf(npsSelect.value);
      if (idx !== -1 && ranges.DN[idx]) {
        dnSelect.value = ranges.DN[idx];
      }
    });

    // Cuando cambia DN, actualizamos NPS al mismo índice
    dnSelect.addEventListener("change", () => {
      const idx = ranges.DN.indexOf(dnSelect.value);
      if (idx !== -1 && ranges.NPS[idx]) {
        npsSelect.value = ranges.NPS[idx];
      }
    });
  }

  // 3) (Opcional futuro) Podremos añadir aquí lógica extra:
  //    - Standard -> filtrar Material
  //    - Material -> familia (Ferritic, Duplex, Austenitic)
  //    - etc., copiando las reglas del Excel.
}

// 4. AQUÍ IRÁN LAS FÓRMULAS QUE VAMOS A IMPORTAR DE EXCEL
function recalculateAll() {
  // Ejemplo: KGS = peKgMt * meters  (equivalente a L11 = F37 * F39)
  const peKgMt = toNumber(peKgMtInput?.value);
  const meters = toNumber(metersInput?.value);
  const kgs = peKgMt * meters;

  if (currentKgsLabelEl) {
    currentKgsLabelEl.textContent = kgs.toFixed(2);
  }

  // ⬇️ debajo de esto iremos añadiendo TODAS las fórmulas nuevas
  // ...
}

// 5. INICIALIZACIÓN GENERAL
function init() {
  // 1) Meses y tabla de precios
  initMonths();
  const activeMonth =
    (monthSelect && monthSelect.value) || priceData[0]?.monthLabel;
  if (activeMonth && monthSelect) {
    monthSelect.value = activeMonth;
    renderTable(activeMonth);
  }

  // 2) Gráfica
  initChart();

  // 3) Desplegables tipo Excel (RANGOS)
  initDropdowns();

  // 4) Cálculos
  recalculateAll();

  // === LISTENERS ===
  if (monthSelect) {
    monthSelect.addEventListener("change", (e) => {
      renderTable(e.target.value);
    });
  }

  [peKgMtInput, metersInput].forEach((el) => {
    if (el) el.addEventListener("input", recalculateAll);
  });

  const saveBtn = document.getElementById("saveButton");
  const clearBtn = document.getElementById("clearButton");

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      alert("TODO: lógica de 'Grabar línea'.");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      alert("TODO: lógica de 'Borrar líneas'.");
    });
  }
}

init();
