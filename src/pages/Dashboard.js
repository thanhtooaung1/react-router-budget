import React from "react";

// rrd import
import { useLoaderData } from "react-router";

//component
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

//helper functions import
import {
  createNewBudget,
  createNewExpense,
  fetchData,
  waait,
} from "../helpers";
import Intro from "../components/Intro";

//library
import { toast } from "react-toastify";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

//action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcom, ${values.userName}`);
    } catch {
      throw new Error("There was a problem with creating account!");
    }
  }

  if (_action === "createBudget") {
    try {
      createNewBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch {
      throw new Error("There was a problem with creating budget!");
    }
  }

  if (_action === "createExpense") {
    try {
      createNewExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.expenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} added!`);
    } catch {
      throw new Error("There was a problem with adding expense!");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    <div>
      <main>
        {userName ? (
          <div className="dashboard">
            <h1>
              Welcome back, <span className="accent">{userName}</span>
            </h1>
            <div className="grid-sm">
              {budgets && budgets.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                </div>
              ) : (
                <div className="gird-sm">
                  <p>Personal budgeting is the secret of finicial freedom.</p>
                  <p>Create a budget to get started!</p>
                  <AddBudgetForm />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Intro />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
