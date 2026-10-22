document.getElementById("payrollForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim(),
    basic = +document.getElementById("salary").value,
    hours = +document.getElementById("hours").value;
  if (!name || basic < 0 || hours < 0) {
    alert("Enter valid payroll details.");
    return;
  }
  const house = basic * 0.2,
    medical = basic * 0.1,
    transport = basic * 0.05,
    overtime = hours * 500,
    gross = basic + house + medical + transport + overtime;
  const rate = gross > 100000 ? 0.15 : gross > 50000 ? 0.1 : 0,
    tax = gross * rate,
    net = gross - tax,
    money = (n) =>
      "Tk " +
      n.toLocaleString("en-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  const out = document.getElementById("payslip");
  out.hidden = false;
  out.innerHTML = `<h2>Payslip: ${escapeHTML(name)}</h2><p>Basic salary: ${money(basic)}</p><p>House rent (20%): ${money(house)}</p><p>Medical (10%): ${money(medical)}</p><p>Transport (5%): ${money(transport)}</p><p>Overtime: ${money(overtime)}</p><p>Gross salary: ${money(gross)}</p><p>Tax (${rate * 100}%): ${money(tax)}</p><h2>Net salary: ${money(net)}</h2><button onclick="window.print()">Print Payslip</button>`;
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
