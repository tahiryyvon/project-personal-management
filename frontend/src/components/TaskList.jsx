import React from 'react';

const TaskList = ({ tasks, onStatusChange }) => {
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status: newStatus })
      });
      onStatusChange && onStatusChange();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'DONE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Liste des Tâches</h2>
        <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
          {tasks.length} tâches
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="glass-card rounded-2xl p-6 transform hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-3">{task.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="mr-1">👤</span>
                    {task.employee ? task.employee.name : 'Non assigné'}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status === 'TODO' && 'À faire'}
                  {task.status === 'IN_PROGRESS' && 'En cours'}
                  {task.status === 'DONE' && 'Terminé'}
                </span>
                
                <select 
                  value={task.status} 
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="TODO">À faire</option>
                  <option value="IN_PROGRESS">En cours</option>
                  <option value="DONE">Terminé</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;