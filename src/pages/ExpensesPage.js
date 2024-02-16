import React from "react";

// rrd imports
import { useLoaderData } from "react-router";

//components
import Table from "../components/Table";

//helpers
import { fetchData } from "../helpers";

//loader
export function expensesLoader() {
  const expenses = fetchData("expenses") ?? [];
  return { expenses };
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h2>All Expenses</h2>
      <div className="grid-md">
        <h3>
          Recent Expeneses <small>(total {expenses.length})</small>
        </h3>
        <Table expenses={expenses} />
      </div>
    </div>
  );
};

export default ExpensesPage;
