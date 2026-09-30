const form = document.getElementById("healthForm");
const message = document.getElementById("message");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  const response = await fetch("/api/records", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  });

  const result = await response.json();
  message.textContent = result.message || result.error;
  message.style.color = response.ok ? "green" : "crimson";

  if (response.ok) {
    form.reset();
    loadRecords();
  }
});

async function loadRecords() {
  const response = await fetch("/api/records");
  const data = await response.json();

  if (!data.length) {
    document.getElementById("dashboard").innerHTML = "";
    document.getElementById("records").innerHTML = "<p>No records yet.</p>";
    return;
  }

  const latest = data[0];
  const bmi = Number(latest.weight_kg) /
    Math.pow(Number(latest.height_cm) / 100, 2);

  document.getElementById("dashboard").innerHTML = `
    <div class="metrics">
      <div class="metric">BMI<strong>${bmi.toFixed(1)}</strong></div>
      <div class="metric">Blood Pressure<strong>${latest.systolic}/${latest.diastolic}</strong></div>
      <div class="metric">Heart Rate<strong>${latest.heart_rate} BPM</strong></div>
    </div>
    <p><strong>BMI category:</strong> ${bmiCategory(bmi)}</p>
    <p><strong>BP category:</strong> ${bpCategory(latest.systolic, latest.diastolic)}</p>
  `;

  document.getElementById("records").innerHTML = data.map(renderRecord).join("");
}

function renderRecord(r) {
  return `
    <article class="record">
      <h3>${escapeHtml(r.full_name)}</h3>
      <div>
        <span class="tag">Age: ${r.age}</span>
        <span class="tag">BMI: ${(
          Number(r.weight_kg) /
          Math.pow(Number(r.height_cm)/100,2)
        ).toFixed(1)}</span>
        <span class="tag">BP: ${r.systolic}/${r.diastolic}</span>
        <span class="tag">HR: ${r.heart_rate} BPM</span>
      </div>
      <p>${escapeHtml(r.notes || "No notes")}</p>
      <small>${new Date(r.created_at).toLocaleString()}</small><br>
      <button class="delete" onclick="deleteRecord(${r.id})">Delete</button>
    </article>
  `;
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obesity range";
}

function bpCategory(sys, dia) {
  if (sys < 120 && dia < 80) return "Normal";
  if (sys < 130 && dia < 80) return "Elevated";
  if (sys < 140 || dia < 90) return "High blood pressure - Stage 1";
  if (sys < 180 || dia < 120) return "High blood pressure - Stage 2";
  return "Very high reading";
}

async function deleteRecord(id) {
  if (!confirm("Delete this record?")) return;
  await fetch(`/api/records/${id}`, {method:"DELETE"});
  loadRecords();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

loadRecords();
