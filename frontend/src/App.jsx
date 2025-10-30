import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import TaskList from './components/TaskList';
import EmployeeForm from './components/EmployeeForm';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard';

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', current: activeView === 'dashboard' },
    { id: 'employees', name: 'Employés', icon: '👥', current: activeView === 'employees' },
    { id: 'tasks', name: 'Tâches', icon: '✅', current: activeView === 'tasks' },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">🏢 TeamFlow</h1>
              <p className="text-sm text-gray-500">Gestion d'équipe</p>
            </div>
            <nav className="px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all ${
                    item.current
                      ? 'bg-primary-100 text-primary-600 shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-1 min-h-0 bg-white/80 backdrop-blur-lg border-r border-gray-200/50">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">🏢 TeamFlow</h1>
              <p className="text-sm text-gray-500">Gestion d'équipe</p>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all ${
                    item.current
                      ? 'bg-primary-100 text-primary-600 shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <button
                  className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="text-2xl">☰</span>
                </button>
                <h2 className="ml-4 text-2xl font-semibold text-gray-900 capitalize">
                  {navigation.find(item => item.id === activeView)?.name}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AD
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            {activeView === 'dashboard' && (
              <Dashboard employees={employees} tasks={tasks} />
            )}
            {activeView === 'employees' && (
              <div className="space-y-6">
                <EmployeeForm onEmployeeAdded={fetchEmployees} />
                <EmployeeList employees={employees} />
              </div>
            )}
            {activeView === 'tasks' && (
              <div className="space-y-6">
                <TaskForm employees={employees} onTaskAdded={fetchTasks} />
                <TaskList tasks={tasks} onStatusChange={fetchTasks} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;