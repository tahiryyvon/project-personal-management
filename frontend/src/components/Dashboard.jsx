import React from 'react';

const Dashboard = ({ employees, tasks }) => {
  const stats = [
    {
      name: 'Total Employés',
      value: employees.length,
      icon: '👥',
      color: 'bg-blue-500',
    },
    {
      name: 'Total Tâches',
      value: tasks.length,
      icon: '✅',
      color: 'bg-green-500',
    },
    {
      name: 'Tâches En Cours',
      value: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      icon: '🔄',
      color: 'bg-yellow-500',
    },
    {
      name: 'Tâches Terminées',
      value: tasks.filter(t => t.status === 'DONE').length,
      icon: '🎯',
      color: 'bg-purple-500',
    },
  ];

  const recentEmployees = employees.slice(-3).reverse();
  const recentTasks = tasks.slice(-3).reverse();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h2>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="glass-card rounded-2xl p-6 transform hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employés Récents</h3>
          <div className="space-y-4">
            {recentEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{employee.name}</h4>
                  <p className="text-sm text-gray-500">{employee.position}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {employee.tasks?.length || 0} tâches
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tâches Récentes</h3>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-xs text-gray-500">
                        {task.employee ? `👤 ${task.employee.name}` : 'Non assigné'}
                      </span>
                      <span className="text-xs text-gray-500">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === 'DONE' ? 'bg-green-100 text-green-800' :
                    task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;