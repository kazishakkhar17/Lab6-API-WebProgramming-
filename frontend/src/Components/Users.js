import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    idStudent: '',
    name: '',
    email: '',
    password: '',
    age: '',
    cgpa: '',
    department: '',
    date: new Date().toISOString()
  });

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
      setUsers([...users, response.data]);
      setNewUser({ idStudent: '', name: '', email: '', password: '', age: '', cgpa: '', department: '', date: new Date().toISOString() });
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
      setUsers(users.filter(user => user.idStudent !== idStudent));
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
      <input type="text" name="idStudent" value={newUser.idStudent} onChange={handleChange} placeholder="ID Student" />
      <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Password" />
      <input type="number" name="age" value={newUser.age} onChange={handleChange} placeholder="Age" />
      <input type="number" step="0.01" name="cgpa" value={newUser.cgpa} onChange={handleChange} placeholder="CGPA" />
      <input type="text" name="department" value={newUser.department} onChange={handleChange} placeholder="Department" />
      <button onClick={addUser}>Add User</button>

      <table>
        <thead>
          <tr>
            <th>ID Student</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>CGPA</th>
            <th>Department</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.idStudent}>
              <td>{user.idStudent}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.cgpa}</td>
              <td>{user.department}</td>
              <td>{new Date(user.date).toLocaleString()}</td>
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
