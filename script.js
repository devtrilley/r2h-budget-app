// Tracker Items refers to the row holding all of our tracker info

// DOM MANIPULATION

// Tracker Inputs Display
const typeDisplay = document.querySelector(".type-display");

// Input Elements from Tracker-Inputs

// Input Buttons
const incomeBtn = document.querySelector(".income-btn");
const expenseBtn = document.querySelector(".expense-btn");
const addBtn = document.querySelector(".add-btn");

// Inputs
const dateInput = document.querySelector(".date-input");
const nameInput = document.querySelector(".name-input");
const amountInput = document.querySelector(".amount-input");
const descInput = document.querySelector(".desc-input");

// Balance Card Number Elements
const balanceDisplay = document.querySelector(".balance-display");
const totalIncomeDisplay = document.querySelector(".total-income-display");
const totalExpensesDisplay = document.querySelector(".total-expenses-display");

// Tracker Table Elements
const trackerTable = document.querySelector(".tracker-table");
const tableBody = document.querySelector(".table-body");

// Boolean determining if input is Income or and Expense
let typeIsIncome = true;

// Array holding all income tracker items
const incomeArray = [];

// Array holding all expense tracker items
const expenseArray = [];

// Both Income and Expenses Array
const trackerObjects = [
  // Temporarily commented out to work on number displays
  // {
  //   id: 1000000, // Placeholder ID
  //   type: "Expense",
  //   date: "11/26/2024",
  //   name: "Rent",
  //   amount: 900,
  //   description: "Fixed expense.",
  //   delete: '<button class="delete-btn" id="1000000">Delete</button>',
  // },
  // {
  //   id: 1000001, // Placeholder ID
  //   type: "Income",
  //   date: "11/23/2024",
  //   name: "Paycheck",
  //   amount: 1050,
  //   description: "Weekly EP pay.",
  //   delete: '<button class="delete-btn" id="1000001">Delete</button>',
  // },
];

// Generating the Table Rows as soon as the page loads, therefore no need for hard coded HTML
generateTableRows(trackerObjects);

incomeBtn.addEventListener("click", () => {
  if (typeIsIncome) {
    return;
  } else if (!typeIsIncome) {
    typeIsIncome = true;
    typeDisplay.textContent = `The current type is: Income`;
  }
});

expenseBtn.addEventListener("click", () => {
  if (!typeIsIncome) {
    return;
  } else if (typeIsIncome) {
    typeIsIncome = false;
    typeDisplay.textContent = `The current type is: Expense`;
  }
});

// id var in global scope, incremented each time addBtn is clicked. Each new number is assigned to the added trackerItems.id. This makes each object unique so we are able to target/delete them.
let idCounter = 1;

addBtn.addEventListener("click", () => {
  if (dateInput.value === "" || dateInput.value === null) {
    alert("Please enter a valid date.");
    return;
  }

  if (nameInput.value === "" || nameInput.value === null) {
    alert("Please enter a valid name.");
    return;
  }

  if (amountInput.value === "" || amountInput.value === null) {
    alert("Please enter a valid amount.");
    return;
  }

  if (descInput.value === "" || descInput.value === null) {
    alert("Please enter a valid description.");
    return;
  }

  let newObj = {
    // Ternary operator to figure out whether trackerItem is an income or expense
    id: idCounter, //ID for each object so we are able to delete them in grid
    // If typeIsIncome, then display so. Otherwise, it's expenses.
    type: typeIsIncome ? "Income" : "Expenses",
    date: dateInput.value,
    name: nameInput.value,
    // Makes expenses amount a negative number.
    amount: typeIsIncome
      ? Number(amountInput.value)
      : Number(amountInput.value * -1),
    description: descInput.value,
    delete: `<button class="delete-btn" id="${idCounter}">Delete</button>`,
  };

  trackerObjects.push(newObj);

  tableBody.innerHTML = "";

  generateTableRows(trackerObjects);

  idCounter++;

  if (typeIsIncome) {
    totalIncome += newObj.amount;
    incomeArray.push(newObj); // Push our newObj into incomeArray
  } else if (!typeIsIncome) {
    totalExpenses += newObj.amount;
    expenseArray.push(newObj); // Push our newObj into expenseArray
  }

  // We add these since expenses is a negative number
  balance = totalIncome + totalExpenses;
  balanceDisplay.innerHTML = balance;
  totalIncomeDisplay.innerHTML = totalIncome;
  totalExpensesDisplay.innerHTML = totalExpenses;
});

// forEach to generate/update HTML on our table
function generateTableRows(arrOfObjects) {
  tableBody.innerHTML = "";

  arrOfObjects.forEach((trackerItem) => {
    // Table row that will hold the <td> elements and be appended to our Table for each object in Tracker Objects
    let tableRow = document.createElement("tr");

    // Each "___Cell" is a <td> that will be appended in the tableRow above, which in turn will be append to our table, thus generating another row on the page.

    // Date cell and it's value change
    let dateCell = document.createElement("td");
    dateCell.innerHTML = trackerItem.date;

    // Name cell and it's value change
    let nameCell = document.createElement("td");
    nameCell.innerHTML = trackerItem.name;

    // Amount cell and it's value change
    let amountCell = document.createElement("td");
    amountCell.innerHTML = trackerItem.amount;

    // Description cell and it's value change
    let descriptionCell = document.createElement("td");
    descriptionCell.innerHTML = trackerItem.description;

    // Type cell and it's value change
    let typeCell = document.createElement("td");
    typeCell.innerHTML = trackerItem.type;

    // Delete cell and it's value change
    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = trackerItem.delete;

    // Appending each <td> to the tableRow (Our <tr>)
    tableRow.appendChild(dateCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(amountCell);
    tableRow.appendChild(descriptionCell);
    tableRow.appendChild(typeCell);
    tableRow.appendChild(deleteCell);

    // Appending the tableRow to our table, effectively generating a row
    tableBody.appendChild(tableRow);
  });
}

// Event Delegation in the <tbody> for Deletions
tableBody.addEventListener("click", (e) => {
  // If we clicked on a deleteBtn in our table
  if (e.target.matches(".delete-btn")) {
    // ID of the deleteBtn we clicked
    const deleteThisId = Number(e.target.id); //

    // Finding the index of trackerObjects that has an object with a matching ID to deleteThisId.
    const indexToDelete = trackerObjects.findIndex((object) => {
      if (object.id === deleteThisId) {
        return object.id;
      }
    });

    // -1 is returned if findIndex() can't find the ID, we relay this message
    if (indexToDelete === -1) {
      console.log("No matching object found");
    } else {
      const deleteThisAmount = trackerObjects[indexToDelete].amount;

      // If the given object's type is income
      if (trackerObjects[indexToDelete].type === "Income") {
        totalIncome -= deleteThisAmount;
        totalIncomeDisplay.innerHTML = totalIncome;
      } else {
        // Else, if the object's type is expense
        totalExpenses -= deleteThisAmount;
        totalExpensesDisplay.innerHTML = totalExpenses;
      }

      balance = totalIncome + totalExpenses;
      balanceDisplay.innerHTML = balance;

      // If there is a matching ID found, we delete the object with that index from the array with splice(), then generate the Table again.
      trackerObjects.splice(indexToDelete, 1);
      generateTableRows(trackerObjects);
    }
  }
});

// Income/Expense Variables & Dynamic Display
let totalIncome = 0;
let totalExpenses = 0;
let balance = totalIncome - totalExpenses;

balanceDisplay.innerHTML = balance;
totalIncomeDisplay.innerHTML = totalIncome;
totalExpensesDisplay.innerHTML = totalExpenses;
