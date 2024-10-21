import React from "react";

function Dashboard(props) {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={props?.handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
