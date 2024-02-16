import React from "react";

// rrd import
import { useLoaderData } from "react-router";

//component
import AddBudgetForm from "../components/AddBudgetForm";

//helper functions import
import { createNewBudget, fetchData, waait } from "../helpers";
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
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                </div>
              </div>
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
