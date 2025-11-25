// 1. REFERENCIAS A ELEMENTOS DEL DOM
const pricesTableBody = document.querySelector("#pricesTable tbody");
const monthSelect = document.getElementById("monthSelect");
const summaryOutput = document.getElementById("summaryOutput");
const currentKgsLabelEl = document.getElementById("currentKgsLabel");

// Ejemplo de inputs
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

// 3. FUNCIONES DE DIBUJO (tabla y gráfica) usando priceData
function renderTable(activeMonthLabel) {
  pricesTableBody.innerHTML = "";
  priceData.forEach(row => {
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
  const ctx = document.getElementById("priceChart").getContext("2d");
  const labels = priceData.map(r => r.monthLabel);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "ACERIA UE", data: priceData.map(r => r.mill) },
        { label: "DISTRIBUIDOR UE", data: priceData.map(r => r.distributor) },
        { label: "ASIA", data: priceData.map(r => r.asia) },
        { label: "DISTR EU-ASIA", data: priceData.map(r => r.euAsia) },
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
            label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        y: {
          ticks: { callback: v => v.toFixed(2) + " €" }
        }
      }
    }
  });
}

// 4. AQUÍ IRÁN LAS FÓRMULAS QUE VAMOS A IMPORTAR DE EXCEL
function recalculateAll() {
  // Ejemplo: KGS = peKgMt * meters
  const peKgMt = toNumber(peKgMtInput.value);
  const meters = toNumber(metersInput.value);
  const kgs = peKgMt * meters;
  currentKgsLabelEl.textContent = kgs.toFixed(2);

  // ⬇️ debajo de esto iremos añadiendo TODAS las fórmulas nuevas
  // ...
}

// 5. INICIALIZACIÓN
function init() {
  const activeMonth = monthSelect.value || priceData[0]?.monthLabel;
  if (activeMonth) {
    monthSelect.value = activeMonth;
    renderTable(activeMonth);
  }
  initChart();
  recalculateAll();

  monthSelect.addEventListener("change", (e) => {
    renderTable(e.target.value);
  });

  [peKgMtInput, metersInput].forEach(el =>
    el.addEventListener("input", recalculateAll)
  );

  document.getElementById("saveButton").addEventListener("click", () => {
    alert("TODO: lógica de 'Grabar línea'.");
  });

  document.getElementById("clearButton").addEventListener("click", () => {
    alert("TODO: lógica de 'Borrar líneas'.");
  });
}

init();
