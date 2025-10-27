import React, { useState } from 'react';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    onEmployeeAdded();
    setFormData({ name: '', email: '', position: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Poste"
        value={formData.position}
        onChange={(e) => setFormData({...formData, position: e.target.value})}
        required
      />
      <button type="submit">Ajouter Employé</button>
    </form>
  );
};

export default EmployeeForm;