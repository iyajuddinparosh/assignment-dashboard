const catalog = [
  ["Laptop", 50000],
  ["Mouse", 1000],
  ["Keyboard", 2500],
  ["Monitor", 15000],
];
let cart = {},
  discountRate = 0;
const money = (n) =>
  "Tk " +
  n.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
document.getElementById("products").innerHTML = catalog
  .map(
    ([n, p]) =>
      `<article class="product"><b>${n}</b><span>${money(p)}</span><button onclick="add('${n}')">Add to cart</button></article>`,
  )
  .join("");
function add(n) {
  cart[n] = (cart[n] || 0) + 1;
  render();
}
function removeItem(n) {
  delete cart[n];
  render();
}
function changeQty(n, v) {
  cart[n] = Math.max(0, Math.floor(Number(v) || 0));
  if (!cart[n]) delete cart[n];
  render();
}
function applyCoupon() {
  const code = document.getElementById("coupon").value.trim().toUpperCase();
  discountRate = code === "SAVE10" ? 0.1 : 0;
  document.getElementById("couponMessage").textContent = discountRate
    ? "SAVE10 applied: 10% discount."
    : code
      ? "Invalid coupon."
      : "Enter coupon SAVE10.";
  render();
}
function totals() {
  const subtotal = Object.entries(cart).reduce(
      (s, [n, q]) => s + q * catalog.find((p) => p[0] === n)[1],
      0,
    ),
    discount = subtotal * discountRate,
    base = subtotal - discount,
    vat =
      (base * Math.max(0, +document.getElementById("vatRate").value || 0)) /
      100;
  return { subtotal, discount, vat, total: base + vat };
}
function render() {
  document.getElementById("cart").innerHTML =
    Object.entries(cart)
      .map(([n, q]) => {
        const p = catalog.find((x) => x[0] === n)[1];
        return `<tr><td>${n}</td><td>${money(p)}</td><td><input type="number" min="0" value="${q}" onchange="changeQty('${n}',this.value)"></td><td>${money(p * q)}</td><td><button class="secondary" onclick="removeItem('${n}')">Remove</button></td></tr>`;
      })
      .join("") || '<tr><td colspan="5">Cart is empty.</td></tr>';
  const t = totals();
  document.getElementById("totals").innerHTML =
    `<p>Subtotal: ${money(t.subtotal)}</p><p>Discount: −${money(t.discount)}</p><p>VAT: ${money(t.vat)}</p><h2>Total: ${money(t.total)}</h2>`;
}
function generateInvoice() {
  if (!Object.keys(cart).length) {
    alert("Add products first.");
    return;
  }
  const t = totals(),
    out = document.getElementById("invoice");
  out.hidden = false;
  out.innerHTML = `<h2>Shopping Invoice</h2><p>Date: ${new Date().toLocaleString()}</p>${document.getElementById("totals").innerHTML}`;
}
document.getElementById("vatRate").addEventListener("input", render);
render();
