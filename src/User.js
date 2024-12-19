import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const User = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        localStorage.setItem("users", JSON.stringify(result));
      } catch (error) {
        let collecation = localStorage.getItem("users");
        setData(JSON.parse(collecation));
        setMode("offline");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {mode === "offline" ? (
          <div class="alert alert-warning" role="alert">
            offline modes
          </div>
        ) : null}
      </div>
      <h1>user page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
