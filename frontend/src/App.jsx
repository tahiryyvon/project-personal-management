import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import TaskList from './components/TaskList';
import EmployeeForm from './components/EmployeeForm';
import TaskForm from './components/TaskForm';

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
      const response = await fetch('http://localhost:3000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Erreur chargement employés:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur chargement tâches:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        🏢 Système de Gestion Personnel
      </h1>
      
      <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setActiveView('employees')}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: activeView === 'employees' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          👥 Employés
        </button>
        <button 
          onClick={() => setActiveView('tasks')}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: activeView === 'tasks' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ✅ Tâches
        </button>
      </nav>

      {activeView === 'employees' && (
        <div>
          <EmployeeForm onEmployeeAdded={fetchEmployees} />
          <EmployeeList employees={employees} />
        </div>
      )}

      {activeView === 'tasks' && (
        <div>
          <TaskForm employees={employees} onTaskAdded={fetchTasks} />
          <TaskList tasks={tasks} onStatusChange={fetchTasks} />
        </div>
      )}
    </div>
  );
}

export default App;