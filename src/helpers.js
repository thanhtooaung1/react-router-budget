//delay
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

//color
function generateColor() {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34}% 60% 35%`;
}

//fetch item
export function fetchData(key) {
  return JSON.parse(localStorage.getItem(key));
}

//delete item
export function deleteItem({ key }) {
  localStorage.removeItem(key);
}

//create budget
export function createNewBudget({ name, amount }) {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
}

//create expense
export function createNewExpense({ name, amount, budgetId }) {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
}
