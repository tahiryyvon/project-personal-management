import React, { useState, useEffect } from 'react';

// URLs pour Vercel API Routes
const API_BASE_URL = '/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState('employees');

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Erreur employés:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur tâches:', error);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      fetchEmployees();
    } catch (error) {
      console.error('Erreur ajout employé:', error);
    }
  };

  const addTask = async (taskData) => {
    try {
      await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      fetchTasks();
    } catch (error) {
      console.error('Erreur ajout tâche:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🏢 Gestion Personnel</h1>
      
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveView('employees')}>Employés</button>
        <button onClick={() => setActiveView('tasks')}>Tâches</button>
      </nav>

      {activeView === 'employees' && (
        <div>
          <h2>Ajouter Employé</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            addEmployee({
              name: formData.get('name'),
              email: formData.get('email'),
              position: formData.get('position')
            });
            e.target.reset();
          }}>
            <input name="name" placeholder="Nom" required />
            <input name="email" placeholder="Email" type="email" required />
            <input name="position" placeholder="Poste" required />
            <button type="submit">Ajouter</button>
          </form>

          <h2>Employés</h2>
          {employees.map(emp => (
            <div key={emp.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{emp.name}</h3>
              <p>Email: {emp.email}</p>
              <p>Poste: {emp.position}</p>
            </div>
          ))}
        </div>
      )}

      {activeView === 'tasks' && (
        <div>
          <h2>Ajouter Tâche</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            addTask({
              title: formData.get('title'),
              description: formData.get('description'),
              dueDate: formData.get('dueDate'),
              employeeId: parseInt(formData.get('employeeId'))
            });
            e.target.reset();
          }}>
            <input name="title" placeholder="Titre" required />
            <textarea name="description" placeholder="Description" required />
            <input name="dueDate" type="date" required />
            <select name="employeeId" required>
              <option value="">Sélectionner un employé</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            <button type="submit">Ajouter</button>
          </form>

          <h2>Tâches</h2>
          {tasks.map(task => (
            <div key={task.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Assigné à: {task.employee_name || 'Non assigné'}</p>
              <p>Échéance: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Statut: {task.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;