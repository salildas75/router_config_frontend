import React from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard