import React from 'react';

const EmployeeList = ({ employees }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Liste des Employés</h2>
        <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
          {employees.length} employés
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="glass-card rounded-2xl p-6 transform hover:scale-105 transition-all duration-200 hover:shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-primary-600 font-medium">{employee.position}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📧</span>
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500">Tâches assignées</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                  {employee.tasks?.length || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;