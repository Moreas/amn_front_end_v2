import React from 'react';
import { 
  Calendar, 
  Users, 
  Wrench, 
  User, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for charts
const moodData = [
  { date: 'May 12', mood: 2 },
  { date: 'May 15', mood: 1 },
  { date: 'May 18', mood: 2 },
  { date: 'May 21', mood: 3 },
  { date: 'May 24', mood: 2 },
  { date: 'May 27', mood: 1 },
  { date: 'May 30', mood: 2 },
  { date: 'Jun 2', mood: 3 },
  { date: 'Jun 5', mood: 2 },
  { date: 'Jun 8', mood: 1 },
  { date: 'Jun 11', mood: 2 },
  { date: 'Jun 14', mood: 3 },
  { date: 'Jun 17', mood: 2 },
  { date: 'Jun 20', mood: 1 },
  { date: 'Jun 23', mood: 2 },
  { date: 'Jun 26', mood: 3 },
  { date: 'Jun 29', mood: 2 },
  { date: 'Jul 2', mood: 1 },
  { date: 'Jul 5', mood: 2 },
  { date: 'Jul 8', mood: 3 },
  { date: 'Jul 11', mood: 2 },
  { date: 'Jul 14', mood: 1 },
  { date: 'Jul 17', mood: 2 },
  { date: 'Jul 20', mood: 3 },
  { date: 'Jul 23', mood: 2 },
  { date: 'Jul 26', mood: 1 },
  { date: 'Jul 29', mood: 2 },
  { date: 'Jul 31', mood: 3 }
];

const energyData = [
  { date: 'May 19', energy: 3 },
  { date: 'May 22', energy: 4 },
  { date: 'May 25', energy: 3 },
  { date: 'May 28', energy: 2 },
  { date: 'May 31', energy: 3 },
  { date: 'Jun 3', energy: 4 },
  { date: 'Jun 6', energy: 3 },
  { date: 'Jun 9', energy: 2 },
  { date: 'Jun 12', energy: 3 },
  { date: 'Jun 15', energy: 4 },
  { date: 'Jun 18', energy: 3 },
  { date: 'Jun 21', energy: 2 },
  { date: 'Jun 24', energy: 3 },
  { date: 'Jun 27', energy: 4 },
  { date: 'Jun 30', energy: 3 },
  { date: 'Jul 3', energy: 2 },
  { date: 'Jul 6', energy: 3 },
  { date: 'Jul 9', energy: 4 },
  { date: 'Jul 12', energy: 3 },
  { date: 'Jul 15', energy: 2 },
  { date: 'Jul 18', energy: 3 },
  { date: 'Jul 21', energy: 4 },
  { date: 'Jul 24', energy: 3 },
  { date: 'Jul 27', energy: 2 },
  { date: 'Jul 30', energy: 3 }
];

// Sample appointment data
const appointments = [
  { name: 'Sarah Johnson - Manicure & Pedicure', time: '10:00 AM', status: 'active' },
  { name: 'Maria Rodriguez - Gel Nails', time: '11:30 AM', status: 'active' },
  { name: 'Jennifer Smith - Acrylic Set', time: '2:00 PM', status: 'active' },
  { name: 'Lisa Chen - Nail Art Design', time: '3:30 PM', status: 'paused' },
  { name: 'Amanda Wilson - French Manicure', time: '5:00 PM', status: 'paused' },
  { name: 'Rachel Brown - Gel Extension', time: '6:30 PM', status: 'completed' },
  { name: 'Jessica Davis - Regular Manicure', time: '9:00 AM', status: 'completed' },
  { name: 'Nicole Taylor - Pedicure', time: '10:30 AM', status: 'completed' },
  { name: 'Emily White - Acrylic Fill', time: '1:00 PM', status: 'active' },
  { name: 'Ashley Garcia - Gel Polish Change', time: '4:00 PM', status: 'active' },
  { name: 'Michelle Lee - Nail Repair', time: '7:00 PM', status: 'paused' },
  { name: 'Stephanie Kim - Full Set', time: '8:30 PM', status: 'active' }
];

function Dashboard() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">DASHBOARD</h1>
      </div>

      {/* Greeting and Summary Section */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Good morning, Jade</h2>
          <span className="ml-2 text-2xl">👋</span>
        </div>
        <p className="text-gray-500 mb-6">Thursday, July 31, 2025</p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { number: '12', label: 'Today\'s Appointments', icon: Calendar, color: 'red' },
            { number: '8', label: 'New Leads', icon: Users, color: 'red' },
            { number: '5', label: 'Active Technicians', icon: Wrench, color: 'red' },
            { number: '156', label: 'Total Clients', icon: User, color: 'red' },
            { number: '3', label: 'Pending Requests', icon: HelpCircle, color: 'red' }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{card.number}</p>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </div>
                <card.icon className={`w-8 h-8 text-${card.color}-800`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Appointments Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Appointments (Last 30 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="mood" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Revenue (Last 30 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="energy" stroke="#eab308" fill="#eab308" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Appointments List Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Top Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer">
                <span className="text-gray-700">All Statuses</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="cursor-pointer hover:text-gray-700">Client</span>
              <span className="cursor-pointer hover:text-gray-700">Time</span>
              <span className="cursor-pointer hover:text-gray-700">Status</span>
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <h4 className="font-medium text-gray-800 mb-1">{appointment.name}</h4>
                <p className="text-sm text-gray-500">{appointment.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default Dashboard; 