import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('${API_BASE_URL}/employees', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });
      
      onEmployeeAdded();
      setFormData({ name: '', email: '', position: '' });
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
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Ajouter un Employé</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="john@entreprise.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poste
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Développeur"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary"
        >
          <span className="flex items-center justify-center">
            <span className="mr-2">➕</span>
            Ajouter Employé
          </span>
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;