function calculateTotal() {
  const items = document.querySelectorAll(".item-total");
  const cost = document.getElementById("cost-value");
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
  const paidAmount = parseFloat(paid.textContent) || 0;

  tax.textContent = taxAmount.toFixed(2);
  cost.textContent = itemsCost.toFixed(2);
  total.textContent = (itemsCost + taxAmount - paidAmount).toFixed(2);
}

function parseToArray(csvInput) {
  const lineSplitCSV = csvInput.split("\n");
  return lineSplitCSV.map((line) => line.split(","));
}

function calcItemTotal(itemQty, itemCost) {
  return parseFloat(itemQty) * parseFloat(itemCost);
}

function itemUpdate() {
  const itemsInput = document.getElementById("items-input").value;
  const itemList = document.getElementById("item-list");

  const parsed = parseToArray(itemsInput);
  parsed.forEach((item) => {
    if (item.length < 3) return; // skip incomplete rows

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

    itemTotal.textContent = calcItemTotal(item[1], item[2]);

    itemDiv.appendChild(itemDesc);
    itemDiv.appendChild(itemQty);
    itemDiv.appendChild(itemCost);
    itemDiv.appendChild(itemTotal);
    itemList.appendChild(itemDiv);
  });

  // Clear input after adding
  document.getElementById("items-input").value = "";
}

document.getElementById("item-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page refresh
  itemUpdate();
});

// Set interval once
calculateTotal();
setInterval(calculateTotal, 1000);
