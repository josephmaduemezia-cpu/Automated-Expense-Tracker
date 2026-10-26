let data = JSON.parse(localStorage.getItem("expenseData")) || { expenses: [], budget: 0 };

function save() {
    localStorage.setItem("expenseData", JSON.stringify(data));
}

function addExpense() {
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    if (!amount || !category) return;
    data.expenses.push({ amount, category });
    save();
    displayExpenses();
    displaySummary();
}

function setBudget() {
    let budget = parseFloat(document.getElementById("budget").value);
    if (!budget) return;
    data.budget = budget;
    save();
    displaySummary();
}

function deleteExpense(index) {
    data.expenses.splice(index, 1);
    save();
    displayExpenses();
    displaySummary();
}

function displayExpenses() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";
    data.expenses.forEach((e, i) => {
        let item = document.createElement("li");
        item.innerHTML = `£${e.amount} - ${e.category} <button onclick="deleteExpense(${i})">X</button>`;
        list.appendChild(item);
    });
}

function displaySummary() {
    let total = data.expenses.reduce((t, e) => t + e.amount, 0);
    document.getElementById("total").innerText = "Total Spending: £" + total;
    document.getElementById("budgetDisplay").innerText = "Budget: £" + data.budget;
    document.getElementById("alert").innerText = total > data.budget && data.budget > 0 ? "You exceeded your budget" : "";
}

displayExpenses();
displaySummary();
