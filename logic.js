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
const scheduleSelect = document.getElementById("scheduleSelect");

// Inputs numéricos
const peKgMtInput = document.getElementById("peKgMt");
const metersInput = document.getElementById("meters");
const totalKgsInput = document.getElementById("totalKgs"); // ⬅️ nuevo campo

// 2. FUNCIONES AUXILIARES
function toNumber(v) {
  return parseFloat(v || "0") || 0;
}

function formatCurrency(v) {
  const n = toNumber(v);
  return n.toFixed(2).replace(".", ",") + " €";
}

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

// 3. TABLA Y GRÁFICA DE PRECIOS
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
              `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (v) => v.toFixed(2) + " €"
          }
        }
      }
    }
  });
}

function initMonths() {
  if (!monthSelect) return;
  fillSelect(
    monthSelect,
    priceData.map((r) => r.monthLabel)
  );
}

// === DIMENSIONES (B36.19): EQUIVALENTE A F37 EN EXCEL ===
//
// dimData viene de data/dimData.js y tiene este formato:
// const dimData = [
//   { nps: "1/8", dn: "6", schedule: "10S", kgPerM: 0.2827504 },
//   ...
// ];

// Busca kg/mt en dimData usando NPS, DN y Schedule
function lookupKgPerMeter(nps, dn, schedule) {
  if (!Array.isArray(dimData)) return null;

  const row = dimData.find(
    (r) => r.nps === nps && r.dn === dn && r.schedule === schedule
  );

  return row ? row.kgPerM : null;
}

// Actualiza el campo Peso (kg/mt) según NPS, DN y Schedule
function updatePlainEndWeight() {
  if (!npsSelect || !dnSelect || !scheduleSelect || !peKgMtInput) return;
  const nps = npsSelect.value;
  const dn = dnSelect.value;
  const schedule = scheduleSelect.value;

  const kgPerMeter = lookupKgPerMeter(nps, dn, schedule);

  if (kgPerMeter != null) {
    peKgMtInput.value = kgPerMeter.toFixed(3); // como F37
  } else {
    peKgMtInput.value = "";
  }
}

// === RANGOS / DESPLEGABLES (RANGOS!NPS, DN, Standard, etc.) ===
function initDropdowns() {
  if (typeof ranges === "undefined") {
    console.warn("ranges.js no está cargado");
    return;
  }

  if (npsSelect) fillSelect(npsSelect, ranges.NPS);
  if (dnSelect) fillSelect(dnSelect, ranges.DN);
  if (standardSelect) fillSelect(standardSelect, ranges.Standard);
  if (materialSelect) fillSelect(materialSelect, ranges.Material);
  if (scheduleSelect) fillSelect(scheduleSelect, ranges["Shedule_No."]);

  // Sincronizar NPS <-> DN por índice, como en RANGOS
  if (npsSelect && dnSelect && ranges.NPS && ranges.DN) {
    if (ranges.NPS.length > 0 && ranges.DN.length > 0) {
      npsSelect.value = ranges.NPS[0];
      dnSelect.value = ranges.DN[0];
    }

    npsSelect.addEventListener("change", () => {
      const idx = ranges.NPS.indexOf(npsSelect.value);
      if (idx !== -1 && ranges.DN[idx]) {
        dnSelect.value = ranges.DN[idx];
      }
      updatePlainEndWeight();
      recalculateAll();
    });

    dnSelect.addEventListener("change", () => {
      const idx = ranges.DN.indexOf(dnSelect.value);
      if (idx !== -1 && ranges.NPS[idx]) {
        npsSelect.value = ranges.NPS[idx];
      }
      updatePlainEndWeight();
      recalculateAll();
    });
  }

  if (scheduleSelect) {
    scheduleSelect.addEventListener("change", () => {
      updatePlainEndWeight();
      recalculateAll();
    });
  }
}

// 4. FORMULAS PRINCIPALES
function recalculateAll() {
  // L11 = F37 * F39  → Kgs totales = kg/mt * metros
  const peKgMt = toNumber(peKgMtInput?.value);
  const meters = toNumber(metersInput?.value);
  const kgs = peKgMt * meters;

  if (currentKgsLabelEl) {
    currentKgsLabelEl.textContent = kgs.toFixed(2);
  }

  if (totalKgsInput) {
    totalKgsInput.value = kgs.toFixed(2); // ⬅️ muestra Kg totales en el input
  }

  // Aquí añadiremos más fórmulas (coste €/m, coste total, etc.)
}

// 5. INICIALIZACIÓN GENERAL
function init() {
  // Meses y tabla
  initMonths();
  const activeMonth =
    (monthSelect && monthSelect.value) || priceData[0]?.monthLabel;
  if (activeMonth && monthSelect) {
    monthSelect.value = activeMonth;
    renderTable(activeMonth);
  }

  // Gráfica
  initChart();

  // Desplegables (RANGOS)
  initDropdowns();

  // Peso inicial según valores por defecto
  updatePlainEndWeight();

  // Cálculos
  recalculateAll();

  // Listeners generales
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
