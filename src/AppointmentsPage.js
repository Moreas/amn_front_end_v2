import React from 'react';
import { 
  Search, 
  Plus,
  ChevronDown
} from 'lucide-react';

// Sample appointment data for table
const appointmentData = [
  {
    client: 'Jennifer Rowes For Cathy Jenkins',
    technician: 'Silvia',
    date: '2025-07-28',
    type: 'ALF',
    discount: '-',
    expectedRevenue: '$70.00',
    expectedProfit: '$35.00',
    paid: true,
    amountPaid: '$70.00',
    expectedMatch: true,
    tip: '$0.00',
    technicianPayout: '$35.00',
    hasReview: false
  },
  {
    client: 'Maria Rodriguez',
    technician: 'Amber',
    date: '2025-07-29',
    type: 'Home',
    discount: '-',
    expectedRevenue: '$150.00',
    expectedProfit: '$55.00',
    paid: true,
    amountPaid: '$150.00',
    expectedMatch: true,
    tip: '$30.00',
    technicianPayout: '$95.00',
    hasReview: false
  },
  {
    client: 'Sarah Johnson',
    technician: 'Jade',
    date: '2025-07-30',
    type: 'ALF',
    discount: '-',
    expectedRevenue: '$85.00',
    expectedProfit: '$40.00',
    paid: false,
    amountPaid: '-',
    expectedMatch: false,
    tip: '$0.00',
    technicianPayout: '$45.00',
    hasReview: true
  },
  {
    client: 'Lisa Chen',
    technician: 'Elizabeth',
    date: '2025-07-31',
    type: 'Home',
    discount: '-',
    expectedRevenue: '$120.00',
    expectedProfit: '$50.00',
    paid: true,
    amountPaid: '$120.00',
    expectedMatch: true,
    tip: '$20.00',
    technicianPayout: '$70.00',
    hasReview: false
  },
  {
    client: 'Amanda Wilson',
    technician: 'Julissa',
    date: '2025-08-01',
    type: 'ALF',
    discount: '-',
    expectedRevenue: '$95.00',
    expectedProfit: '$45.00',
    paid: false,
    amountPaid: '-',
    expectedMatch: false,
    tip: '$0.00',
    technicianPayout: '$50.00',
    hasReview: false
  },
  {
    client: 'Rachel Brown',
    technician: 'Kori',
    date: '2025-08-02',
    type: 'Home',
    discount: '-',
    expectedRevenue: '$180.00',
    expectedProfit: '$70.00',
    paid: true,
    amountPaid: '$180.00',
    expectedMatch: true,
    tip: '$25.00',
    technicianPayout: '$105.00',
    hasReview: true
  },
  {
    client: 'Jessica Davis',
    technician: 'Monica',
    date: '2025-07-28',
    type: 'ALF',
    discount: '-',
    expectedRevenue: '$65.00',
    expectedProfit: '$30.00',
    paid: true,
    amountPaid: '$65.00',
    expectedMatch: true,
    tip: '$15.00',
    technicianPayout: '$35.00',
    hasReview: false
  },
  {
    client: 'Nicole Taylor',
    technician: 'Yuleidy',
    date: '2025-07-29',
    type: 'Home',
    discount: '-',
    expectedRevenue: '$140.00',
    expectedProfit: '$60.00',
    paid: false,
    amountPaid: '-',
    expectedMatch: false,
    tip: '$0.00',
    technicianPayout: '$80.00',
    hasReview: false
  }
];

function AppointmentsPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">APPOINTMENTS</h1>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Year Month Week Date</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800">
            <option>31</option>
            <option>30</option>
            <option>29</option>
          </select>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Area</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800">
            <option>Select Service Area</option>
            <option>Downtown</option>
            <option>Uptown</option>
            <option>Westside</option>
          </select>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Technician</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800">
            <option>Select Technician</option>
            <option>Silvia</option>
            <option>Amber</option>
            <option>Jade</option>
            <option>Elizabeth</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Profit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Match</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician Payout</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Has Review</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentData.map((appointment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.client}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.technician}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.discount}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.expectedRevenue}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.expectedProfit}</td>
                  <td className="px-4 py-3 text-sm">
                    {appointment.paid ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.amountPaid}</td>
                  <td className="px-4 py-3 text-sm">
                    {appointment.expectedMatch ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.tip}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{appointment.technicianPayout}</td>
                  <td className="px-4 py-3 text-sm">
                    {appointment.hasReview ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
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

export default AppointmentsPage; 