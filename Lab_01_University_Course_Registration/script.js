"use strict";
const FEE_PER_CREDIT = 3610,
  DISCOUNT_RATE = 10;
function money(n) {
  return (
    "Tk " +
    Number(n || 0).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
function escapeHTML(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
// onblur: check ID when the Student ID field loses focus.
function validateStudentId() {
  const id = document.getElementById("studentId").value.trim(),
    msg = document.getElementById("idMessage");
  const ok = /^\d{10}$/.test(id);
  msg.textContent = ok
    ? "Student ID looks valid."
    : "Student ID must contain exactly 10 digits.";
  msg.style.color = ok ? "#147d58" : "#b42318";
  return ok;
}
// onchange: update total credits and fee preview when a checkbox changes.
function updateCredits() {
  const selected = [
    ...document.querySelectorAll('input[name="course"]:checked'),
  ];
  const credits = selected.reduce((s, c) => s + Number(c.dataset.credit), 0);
  const tuition = credits * FEE_PER_CREDIT,
    discount = credits > 12 ? (tuition * DISCOUNT_RATE) / 100 : 0;
  document.getElementById("totalCredits").textContent = credits;
  document.getElementById("previewTuition").textContent = money(tuition);
  document.getElementById("previewDiscount").textContent = money(discount);
  document.getElementById("previewFinal").textContent = money(
    tuition - discount,
  );
  document.getElementById("discountHint").textContent =
    credits > 12
      ? "10% discount applied because credits exceed 12."
      : "Select more than 12 credits to qualify for a 10% discount.";
}
// onclick: validate and display the summary without refreshing the page.
function registerCourses() {
  const name = document.getElementById("studentName").value.trim(),
    id = document.getElementById("studentId").value.trim(),
    selected = [...document.querySelectorAll('input[name="course"]:checked')],
    msg = document.getElementById("formMessage"),
    summary = document.getElementById("summary");
  if (!name) {
    msg.textContent = "Please enter the student name.";
    document.getElementById("studentName").focus();
    return;
  }
  if (!validateStudentId()) {
    msg.textContent = "Please correct the Student ID before registering.";
    document.getElementById("studentId").focus();
    return;
  }
  if (!selected.length) {
    msg.textContent = "Please select at least one course.";
    return;
  }
  msg.textContent = "";
  const credits = selected.reduce((s, c) => s + Number(c.dataset.credit), 0),
    tuition = credits * FEE_PER_CREDIT,
    discount = credits > 12 ? (tuition * DISCOUNT_RATE) / 100 : 0;
  summary.innerHTML = `<h2>Registration successful</h2><p><strong>Student:</strong> ${escapeHTML(name)}</p><p><strong>Student ID:</strong> ${escapeHTML(id)}</p><h3>Selected courses</h3><ul>${selected.map((c) => `<li>${escapeHTML(c.value)} — ${c.dataset.credit} credits</li>`).join("")}</ul><p><strong>Total credits:</strong> ${credits}</p><p><strong>Tuition fee:</strong> ${money(tuition)}</p><p><strong>Discount:</strong> ${money(discount)} ${credits > 12 ? "(10%)" : "(not eligible)"}</p><p><strong>Final payment:</strong> ${money(tuition - discount)}</p>`;
  summary.hidden = false;
}
updateCredits();
