// helper functions
function inputToSetOutput(inputID, outputID) {
  const input = document.getElementById(inputID);
  const output = document.getElementById(outputID);
  if (input.value != "") {
    output.textContent = input.value;
  }
}

function checkInputField(func) {
  func();
  setInterval(func, 500);
}

function contactDetails() {
  inputToSetOutput("emailInput", "email");
  inputToSetOutput("emailInput", "payment-details");
  inputToSetOutput("phoneInput", "phone");
}

function invoiceNumber() {
  const numberInput = document.getElementById("invoice-number-input").value;
  const numberOutput = document.getElementById("invoice-number");
  const numberPadding = ("00000" + numberInput).slice(-5);
  numberOutput.textContent = numberPadding;
}

function clientDetails() {
  inputToSetOutput("company-name-input", "company-name");
  inputToSetOutput("client-name-input", "client-name");
  inputToSetOutput("client-email-input", "client-email");
  inputToSetOutput("client-location-input", "client-location");
}

function currentDate() {
  const date = document.getElementById("date");
  const currentDate = new Date();

  date.textContent =
    currentDate.getFullYear() +
    "/" +
    ("0" + currentDate.getMonth()).slice(-2) +
    "/" +
    currentDate.getDate();
}

function calculateTotal() {
  const items = document.querySelectorAll(".item-total");
  const cost = document.getElementById("cost-value");
  const paidInput = document.getElementById("paid-amount");
  const paid = document.getElementById("paid-value");
  const tax = document.getElementById("tax-value");
  const total = document.getElementById("total-value");
  const taxed = document.getElementById("taxed");

  let itemsCost = 0;

  items.forEach((item) => {
    const value = parseFloat(item.textContent);
    if (!isNaN(value)) {
      itemsCost += value;
    }
  });

  const taxAmount = taxed.checked ? itemsCost * 0.13 : 0;
  const paidAmount = parseFloat(paidInput.value || 0).toFixed(2);

  tax.textContent = taxAmount.toFixed(2);
  cost.textContent = itemsCost.toFixed(2);
  paid.textContent = paidAmount;
  total.textContent = "$" + (itemsCost + taxAmount - paidAmount).toFixed(2);
}

function parseToArray(csvInput) {
  const lineSplitCSV = csvInput.split("\n");
  return lineSplitCSV.map((line) => line.split(","));
}

function calcItemTotal(itemQty, itemCost) {
  return parseFloat(itemQty) * parseFloat(itemCost);
}

function itemUpdate() {
  const itemDescInput = document.getElementById("item-desc").value;
  const itemQtyInput = document.getElementById("item-qty").value;
  const itemRateInput = document.getElementById("item-rate").value;
  const itemList = document.getElementById("item-list");

  if (!itemDescInput || !itemQtyInput || !itemRateInput) return;
  const item = [itemDescInput, itemQtyInput, itemRateInput];
  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  const itemDesc = document.createElement("p");
  itemDesc.classList.add("item-desc");
  itemDesc.textContent = item[0];

  const itemQty = document.createElement("p");
  itemQty.classList.add("item-qty");
  itemQty.textContent = item[1];

  const itemCost = document.createElement("p");
  itemCost.classList.add("item-cost");
  itemCost.textContent = item[2];

  const itemTotal = document.createElement("h5");
  itemTotal.classList.add("item-total");

  itemTotal.textContent = calcItemTotal(item[1], item[2]).toFixed(2);

  itemDiv.appendChild(itemDesc);
  itemDiv.appendChild(itemQty);
  itemDiv.appendChild(itemCost);
  itemDiv.appendChild(itemTotal);
  itemList.appendChild(itemDiv);

  // Clear input after adding
  document.getElementById("item-desc").value = "";
  document.getElementById("item-qty").value = "";
  document.getElementById("item-rate").value = "";

  document.getElementById("item-desc").focus();
}

document.getElementById("item-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page refresh
  itemUpdate();
});

checkInputField(contactDetails);
checkInputField(invoiceNumber);
checkInputField(calculateTotal);
checkInputField(clientDetails);
currentDate();

function savePDF() {
  window.print();
}
