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
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Créer une Tâche</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la tâche
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Titre de la tâche"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date d'échéance
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Description de la tâche..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assigner à
          </label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
          className="btn-primary"
        >
          <span className="flex items-center justify-center">
            <span className="mr-2">✅</span>
            Créer Tâche
          </span>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;