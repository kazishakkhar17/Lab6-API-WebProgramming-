// src/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ idStudent: '', name: '', email: '', department: '' });

  // Fetch all users from backend
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  // Add a new user
  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', newUser);
      setUsers([...users, response.data]);  // Update state with the new user
      setNewUser({ idStudent: '', name: '', email: '', department: '' });  // Clear the form
    } catch (err) {
      console.error('Error adding user', err);
    }
  };

  // Update a user
  const updateUser = async (idStudent) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${idStudent}`, newUser);
      setUsers(users.map(user => (user.idStudent === idStudent ? response.data : user)));
    } catch (err) {
      console.error('Error updating user', err);
    }
  };

  // Delete a user
  const deleteUser = async (idStudent) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${idStudent}`);
      setUsers(users.filter(user => user.idStudent !== idStudent));  // Remove the deleted user from the list
    } catch (err) {
      console.error('Error deleting user', err);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Effect to get users when component mounts
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      
      {/* Form to add/update user */}
      <input 
        type="text" 
        name="idStudent" 
        value={newUser.idStudent} 
        onChange={handleChange} 
        placeholder="ID Student" 
      />
      <input 
        type="text" 
        name="name" 
        value={newUser.name} 
        onChange={handleChange} 
        placeholder="Name" 
      />
      <input 
        type="email" 
        name="email" 
        value={newUser.email} 
        onChange={handleChange} 
        placeholder="Email" 
      />
      <input 
        type="text" 
        name="department" 
        value={newUser.department} 
        onChange={handleChange} 
        placeholder="Department" 
      />
      <button onClick={addUser}>Add User</button>

      {/* Display users */}
      <table>
        <thead>
          <tr>
            <th>ID Student</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.idStudent}>
              <td>{user.idStudent}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => updateUser(user.idStudent)}>Update</button>
                <button onClick={() => deleteUser(user.idStudent)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
