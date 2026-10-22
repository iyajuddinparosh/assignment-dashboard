document
  .getElementById("hospitalForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("patient").value.trim(),
      rate = +document.getElementById("cabin").value;
    const days = +document.getElementById("days").value,
      medicine = +document.getElementById("medicine").value,
      tests = +document.getElementById("tests").value;
    if (
      !name ||
      days < 1 ||
      !Number.isInteger(days) ||
      medicine < 0 ||
      tests < 0
    ) {
      alert("Please enter valid details.");
      return;
    }
    const cabin = rate * days,
      subtotal = cabin + medicine + tests,
      vat = subtotal * 0.1,
      total = subtotal + vat;
    const money = (n) =>
      "Tk " +
      n.toLocaleString("en-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    const out = document.getElementById("receipt");
    out.hidden = false;
    out.innerHTML = `<h2>Patient Bill Receipt</h2><p>Patient: <b>${escapeHTML(name)}</b></p><p>Cabin charge: ${money(cabin)}</p><p>Medicine cost: ${money(medicine)}</p><p>Test cost: ${money(tests)}</p><p>Subtotal: ${money(subtotal)}</p><p>VAT (10%): ${money(vat)}</p><h2>Grand Total: ${money(total)}</h2>`;
  });
function escapeHTML(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
