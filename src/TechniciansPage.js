import React from 'react';
import { 
  Plus
} from 'lucide-react';

// Sample technician data
const technicianData = [
  {
    firstName: 'Gladys',
    lastName: 'Hernandez',
    status: 'active',
    location: 'Tampa Area'
  },
  {
    firstName: 'Evonne',
    lastName: 'Daley',
    status: 'active',
    location: 'Orlando Area'
  },
  {
    firstName: 'Brittney',
    lastName: 'Gomez',
    status: 'active',
    location: 'Orlando Area'
  },
  {
    firstName: 'Silvia',
    lastName: 'Cruz',
    status: 'active',
    location: 'Jacksonville Area'
  },
  {
    firstName: 'Yuleidy',
    lastName: 'Varona',
    status: 'active',
    location: 'West Palm Beach - Treasure Coast Area'
  },
  {
    firstName: 'Kori',
    lastName: 'Seiler Mcclellan',
    status: 'active',
    location: 'Orlando Area'
  },
  {
    firstName: 'Jade',
    lastName: 'Pignaud',
    status: 'active',
    location: 'Jacksonville Area'
  },
  {
    firstName: 'Demi',
    lastName: 'West',
    status: 'active',
    location: 'Tampa Area'
  },
  {
    firstName: 'Monica',
    lastName: 'Angulo',
    status: 'active',
    location: 'West Palm Beach - Treasure Coast Area'
  },
  {
    firstName: 'Elizabeth',
    lastName: 'Fernandes',
    status: 'active',
    location: 'Fort Myers - Cape Coral Area'
  },
  {
    firstName: 'Julissa',
    lastName: 'Sealy',
    status: 'active',
    location: 'Tampa Area'
  },
  {
    firstName: 'Amber',
    lastName: 'Reed',
    status: 'active',
    location: 'Jacksonville Area'
  }
];

function TechniciansPage() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">TECHNICIANS</h1>
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition-colors">
          Show Inactive
        </button>
      </div>

      {/* Technicians Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {technicianData.map((technician, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{technician.firstName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{technician.lastName}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(technician.status)}`}>
                      {technician.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{technician.location}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-gray-400 hover:text-gray-600">👁️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default TechniciansPage; 