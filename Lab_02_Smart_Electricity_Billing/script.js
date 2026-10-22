function calculateBill() {
  const units = Number(document.getElementById("units").value),
    out = document.getElementById("bill");
  if (!Number.isInteger(units) || units < 0) {
    out.innerHTML = '<p class="error">Enter a non-negative whole number.</p>';
    return;
  }
  let remaining = units,
    energy = 0,
    rows = "";
  [
    [100, 5, "First 100 units"],
    [100, 7, "101–200 units"],
    [100, 9, "201–300 units"],
    [Infinity, 12, "Above 300 units"],
  ].forEach(([limit, rate, label]) => {
    const used = Math.min(remaining, limit);
    if (used > 0) {
      const cost = used * rate;
      energy += cost;
      rows += `<p>${label}: ${used} × Tk ${rate} = <b>${money(cost)}</b></p>`;
      remaining -= used;
    }
  });
  const vat = energy * 0.15,
    service = 100,
    total = energy + vat + service;
  out.innerHTML = `<h2>Electricity Bill</h2>${rows}<hr><p>Energy charge: ${money(energy)}</p><p>VAT (15%): ${money(vat)}</p><p>Service charge: ${money(service)}</p><h2>Total payable: ${money(total)}</h2>${units > 300 ? '<p class="warning">Warning: usage exceeds 300 units.</p>' : ""}`;
}
function money(n) {
  return (
    "Tk " +
    n.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
calculateBill();
