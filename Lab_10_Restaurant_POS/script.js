const menuItems = [
  ["Burger", 250],
  ["Pizza", 800],
  ["Fried Rice", 350],
  ["Coffee", 120],
  ["Soft Drink", 50],
];
let order = {};
const money = (n) =>
  "Tk " +
  n.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
document.getElementById("menu").innerHTML = menuItems
  .map(
    ([n, p]) =>
      `<article class="product"><b>${n}</b><span>${money(p)}</span><button onclick="addItem('${n}')">Add item</button></article>`,
  )
  .join("");
function addItem(n) {
  order[n] = (order[n] || 0) + 1;
  render();
}
function removeItem(n) {
  delete order[n];
  render();
}
function changeQuantity(n, v) {
  order[n] = Math.max(0, Math.floor(+v || 0));
  if (!order[n]) delete order[n];
  render();
}
function totals() {
  const subtotal = Object.entries(order).reduce(
      (s, [n, q]) => s + q * menuItems.find((i) => i[0] === n)[1],
      0,
    ),
    vat = subtotal * 0.15,
    service = subtotal * 0.05;
  return { subtotal, vat, service, total: subtotal + vat + service };
}
function render() {
  document.getElementById("order").innerHTML =
    Object.entries(order)
      .map(([n, q]) => {
        const p = menuItems.find((i) => i[0] === n)[1];
        return `<tr><td>${n}</td><td>${money(p)}</td><td><input type="number" min="0" value="${q}" onchange="changeQuantity('${n}',this.value)"></td><td>${money(p * q)}</td><td><button class="secondary" onclick="removeItem('${n}')">Remove</button></td></tr>`;
      })
      .join("") || '<tr><td colspan="5">Order is empty.</td></tr>';
  const t = totals();
  document.getElementById("totals").innerHTML =
    `<p>Subtotal: ${money(t.subtotal)}</p><p>VAT (15%): ${money(t.vat)}</p><p>Service charge (5%): ${money(t.service)}</p><h2>Grand Total: ${money(t.total)}</h2>`;
}
function makeInvoice() {
  if (!Object.keys(order).length) {
    alert("Add at least one item.");
    return;
  }
  const out = document.getElementById("invoice");
  out.hidden = false;
  out.innerHTML = `<h2>Restaurant Invoice</h2><p>Date: ${new Date().toLocaleString()}</p>${document.getElementById("order").innerHTML}${document.getElementById("totals").innerHTML}<button onclick="window.print()">Print Invoice</button>`;
}
function clearOrder() {
  order = {};
  document.getElementById("invoice").hidden = true;
  render();
}
render();
