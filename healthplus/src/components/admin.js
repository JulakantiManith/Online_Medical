import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

function Admin() {
  const [activeView, setActiveView] = useState("users"); // 'users' or 'doctors'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users or doctors based on the active view
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const endpoint =
          activeView === "users"
            ? "http://localhost:8080/api/users"
            : "http://localhost:8080/api/doctor";
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeView]);

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => setActiveView("users")}>View Users</button>
        <button onClick={() => setActiveView("doctors")}>View Doctors</button>
      </div>
      <div className="admin-content">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div>
            <h3>{activeView === "users" ? "Users" : "Doctors"}</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  
                  {activeView === "users" && <th>Name</th>}
                  {activeView === "users" && <th>Email</th>}
                  {activeView === "doctors" && <th>Id</th>}
                  {activeView === "doctors" && <th>Password</th>}     
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                  
                    {activeView === "users" && <td>{item.name}</td>}

                    {activeView === "users" && <td>{item.email}</td>}
                    {activeView === "doctors" && <td>{item.doctorId}</td>}
                    {activeView === "doctors" && <td>{item.password}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
