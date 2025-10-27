import React, { useState } from 'react';

const TaskForm = ({ employees, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    employeeId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
        employeeId: parseInt(formData.employeeId)
      };

      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(taskData)
      });
      
      onTaskAdded();
      setFormData({ 
        title: '', 
        description: '', 
        dueDate: '', 
        employeeId: '' 
      });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Créer une Tâche</h3>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Titre de la tâche"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '8px', width: '200px' }}
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '8px', width: '200px', height: '60px' }}
        />
      </div>
      <div>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '8px', width: '200px' }}
        />
      </div>
      <div>
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
          style={{ margin: '5px', padding: '8px', width: '200px' }}
        >
          <option value="">Sélectionner un employé</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} - {employee.position}
            </option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        style={{ 
          margin: '5px', 
          padding: '8px 15px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Créer Tâche
      </button>
    </form>
  );
};

export default TaskForm;