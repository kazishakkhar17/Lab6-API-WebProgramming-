import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('There was an error fetching the users!', error));
  }, []);

  return (
    <div>
      <h2>User Management</h2>

      {/* Users table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idStudent}>
              <td>{user.idStudent}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
