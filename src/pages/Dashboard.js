import React from "react";

// rrd import
import { useLoaderData } from "react-router";

//helper functions import
import { fetchData } from "../helpers";

export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <main>
        <p>{userName}</p>
        Dashboard
      </main>
    </div>
  );
};

export default Dashboard;
