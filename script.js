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

// Error Messages for Form Validation
const dateErrorMessage = document.querySelector(".date-error-message");
const nameErrorMessage = document.querySelector(".name-error-message");
const amountErrorMessage = document.querySelector(".amount-error-message");
const descErrorMessage = document.querySelector(".desc-error-message");

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
  {
    id: 1000000, // Placeholder ID
    type: "Expense",
    date: "11/26/2024",
    name: "Rent",
    amount: 900,
    description: "Fixed expense.",
    delete: '<button class="btn delete-btn" id="1000000">Delete</button>',
  },
  {
    id: 1000001, // Placeholder ID
    type: "Income",
    date: "11/23/2024",
    name: "Paycheck",
    amount: 1050,
    description: "Weekly EP pay.",
    delete: '<button class="btn delete-btn" id="1000001">Delete</button>',
  },
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
  // Booleans checking if inputs are valid
  let isDateValid = false;
  let isNameValid = false;
  let isAmountValid = false;
  let isDescValid = false;

  if (dateInput.value === "" || dateInput.value === null) {
    dateErrorMessage.innerHTML = "Please enter a valid date.";
    isDateValid = false; // If the value is invalid, then the boolean matches
  } else {
    dateErrorMessage.innerHTML = "";
    isDateValid = true; // If the value is valid/acceptable, the boolean turns true
  }

  if (nameInput.value === "" || nameInput.value === null) {
    nameErrorMessage.innerHTML = "Please enter a valid name.";
    isNameValid = false; // If the value is invalid, then the boolean matches
  } else {
    nameErrorMessage.innerHTML = "";
    isNameValid = true; // If the value is valid/acceptable, the boolean turns true
  }

  if (amountInput.value === "" || amountInput.value === null) {
    amountErrorMessage.innerHTML = "Please enter a valid amount.";
    isAmountValid = false; // If the value is invalid, then the boolean matches
  } else {
    amountErrorMessage.innerHTML = "";
    isAmountValid = true; // If the value is valid/acceptable, the boolean turns true
  }

  if (descInput.value === "" || descInput.value === null) {
    descErrorMessage.innerHTML = "Please enter a valid description.";
    isDescValid = false; // If the value is invalid, then the boolean matches
  } else {
    descErrorMessage.innerHTML = "";
    isDescValid = true; // If the value is valid/acceptable, the boolean turns true
  }

  // If any of the booleans are invalid, stop the function, keeping up from appending a new tracker item
  if (!isDateValid || !isNameValid || !isAmountValid || !isDescValid) {
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
    delete: `<button class="btn delete-btn" id="${idCounter}">Delete</button>`,
  };

  trackerObjects.push(newObj);

  tableBody.innerHTML = "";

  generateTableRows(trackerObjects);

  idCounter++;

  if (typeIsIncome) {
    budgetManager.addIncome(newObj.amount);
    incomeArray.push(newObj); // Push our newObj into incomeArray
  } else if (!typeIsIncome) {
    budgetManager.addExpense(newObj.amount);
    expenseArray.push(newObj); // Push our newObj into expenseArray
  }

  // We add these since expenses is a negative number
  balanceDisplay.innerHTML = budgetManager.calcBalance();
  totalIncomeDisplay.innerHTML = budgetManager.totalIncome;
  totalExpensesDisplay.innerHTML = budgetManager.totalExpenses;
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

// DELETE BUTTONS EVENT LISTENERS
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
      const deleteThisTrackerItem = trackerObjects[indexToDelete]; // Object we want to delete at this specific index.
      const deleteThisAmount = trackerObjects[indexToDelete].amount;

      // If the given object's type is income
      if (deleteThisTrackerItem.type === "Income") {
        budgetManager.addIncome(-deleteThisTrackerItem.amount);
        totalIncomeDisplay.innerHTML = budgetManager.totalIncome;
      } else {
        // Else, if the object's type is expense
        budgetManager.addExpense(-deleteThisTrackerItem.amount); // Putting a negative here will be "minus and negative", therefore we're adding, which is removing the negative number added by the expense.
        totalExpensesDisplay.innerHTML = budgetManager.totalExpenses;
      }

      balanceDisplay.innerHTML = budgetManager.calcBalance();

      // If there is a matching ID found, we delete the object with that index from the array with splice(), then generate the Table again.
      trackerObjects.splice(indexToDelete, 1);
      generateTableRows(trackerObjects);
    }
  }
});

// Income/Expense Variables & Dynamic Display
// ** CHECK IF YOU SHOULD DELETE THESE **
let totalIncome = 0;
let totalExpenses = 0;
let balance = totalIncome - totalExpenses;

balanceDisplay.innerHTML = balance;
totalIncomeDisplay.innerHTML = totalIncome;
totalExpensesDisplay.innerHTML = totalExpenses;

// acceptedKeys Array to iterate over. All keys we'll allow someone to type in our amount input
const acceptedKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "c",
  "C",
  "v",
  "V",
  "a",
  "A",
  "Ctrl",
];

// FORM VALIDATION
// Ensures user can't type anything but accepted keys (numbers & backspace) in this input
amountInput.addEventListener("keydown", (e) => {
  // If the released key isn't a number
  if (!acceptedKeys.includes(e.key)) {
    e.preventDefault(); // Won't allow key to be pressed
  }
});

// BUDGET CLASS to replace global variables
class Budget {
  constructor() {
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }

  addIncome(amount) {
    this.totalIncome += amount;
  }

  addExpense(amount) {
    this.totalExpenses += amount;
  }

  calcBalance() {
    return this.totalIncome + this.totalExpenses;
  }
}

const budgetManager = new Budget();
