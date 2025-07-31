import React, { useState } from 'react';
import { 
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Star,
  MapPin,
  Clock,
  Target,
  Award,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Sample metrics data
const revenueData = [
  { month: 'Jan', revenue: 18500, appointments: 156, clients: 89 },
  { month: 'Feb', revenue: 19200, appointments: 162, clients: 94 },
  { month: 'Mar', revenue: 20100, appointments: 168, clients: 98 },
  { month: 'Apr', revenue: 21800, appointments: 175, clients: 102 },
  { month: 'May', revenue: 22400, appointments: 181, clients: 108 },
  { month: 'Jun', revenue: 23100, appointments: 188, clients: 115 },
  { month: 'Jul', revenue: 24500, appointments: 195, clients: 122 },
  { month: 'Aug', revenue: 25200, appointments: 202, clients: 128 }
];

const serviceData = [
  { name: 'ALF Services', value: 45, color: '#dc2626' },
  { name: 'Luxe Services', value: 25, color: '#eab308' },
  { name: 'Bridal Services', value: 15, color: '#8b5cf6' },
  { name: 'Corporate Events', value: 10, color: '#06b6d4' },
  { name: 'Individual Clients', value: 5, color: '#10b981' }
];

const locationData = [
  { location: 'Tampa Area', revenue: 8500, clients: 45, growth: 12 },
  { location: 'Orlando Area', revenue: 7200, clients: 38, growth: 8 },
  { location: 'Miami Area', revenue: 6800, clients: 32, growth: 15 },
  { location: 'Jacksonville Area', revenue: 5200, clients: 28, growth: 5 },
  { location: 'West Palm Beach', revenue: 4800, clients: 25, growth: 10 }
];

const technicianPerformance = [
  { name: 'Silvia Cruz', revenue: 4200, appointments: 35, rating: 4.8, efficiency: 95 },
  { name: 'Amber Reed', revenue: 3800, appointments: 32, rating: 4.6, efficiency: 92 },
  { name: 'Jade Smith', revenue: 4500, appointments: 38, rating: 4.9, efficiency: 98 },
  { name: 'Elizabeth Fernandes', revenue: 3200, appointments: 28, rating: 4.3, efficiency: 88 },
  { name: 'Tia Johnson', revenue: 3900, appointments: 33, rating: 4.7, efficiency: 94 }
];

function MetricsPage() {
  const [timeRange, setTimeRange] = useState('month');

  // Calculate summary statistics
  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const appointmentGrowth = ((currentMonth.appointments - previousMonth.appointments) / previousMonth.appointments * 100).toFixed(1);
  const clientGrowth = ((currentMonth.clients - previousMonth.clients) / previousMonth.clients * 100).toFixed(1);

  const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0);
  const totalAppointments = revenueData.reduce((sum, month) => sum + month.appointments, 0);
  const averageRevenuePerAppointment = (totalRevenue / totalAppointments).toFixed(0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getGrowthIcon = (growth) => {
    if (parseFloat(growth) > 0) {
      return <ArrowUp className="w-4 h-4 text-green-600" />;
    } else {
      return <ArrowDown className="w-4 h-4 text-red-600" />;
    }
  };

  const getGrowthColor = (growth) => {
    if (parseFloat(growth) > 0) {
      return 'text-green-600';
    } else {
      return 'text-red-600';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">METRICS</h1>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-800">{formatCurrency(currentMonth.revenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-800" />
          </div>
          <div className="flex items-center space-x-2">
            {getGrowthIcon(revenueGrowth)}
            <span className={`text-sm font-medium ${getGrowthColor(revenueGrowth)}`}>
              {revenueGrowth}% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-800">{currentMonth.appointments}</p>
            </div>
            <Calendar className="w-8 h-8 text-red-800" />
          </div>
          <div className="flex items-center space-x-2">
            {getGrowthIcon(appointmentGrowth)}
            <span className={`text-sm font-medium ${getGrowthColor(appointmentGrowth)}`}>
              {appointmentGrowth}% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Active Clients</p>
              <p className="text-3xl font-bold text-gray-800">{currentMonth.clients}</p>
            </div>
            <Users className="w-8 h-8 text-red-800" />
          </div>
          <div className="flex items-center space-x-2">
            {getGrowthIcon(clientGrowth)}
            <span className={`text-sm font-medium ${getGrowthColor(clientGrowth)}`}>
              {clientGrowth}% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Avg. Revenue/Appointment</p>
              <p className="text-3xl font-bold text-gray-800">{formatCurrency(averageRevenuePerAppointment)}</p>
            </div>
            <Target className="w-8 h-8 text-red-800" />
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              +5.2% from last month
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Revenue']}
                labelFormatter={(label) => `${label} 2025`}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#dc2626" 
                fill="#dc2626" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {serviceData.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: service.color }}
                ></div>
                <span className="text-sm text-gray-600">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Performance */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locationData.map((location, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-800" />
                      <span className="font-medium text-gray-900">{location.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(location.revenue)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{location.clients}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1">
                      {location.growth > 0 ? (
                        <ArrowUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-600" />
                      )}
                      <span className={`font-medium ${location.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {location.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(location.revenue / 8500) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technician Performance */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Technician Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {technicianPerformance.map((technician, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-red-800" />
                      <span className="font-medium text-gray-900">{technician.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(technician.revenue)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{technician.appointments}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-gray-900">{technician.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{technician.efficiency}%</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${technician.efficiency}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Client Retention Rate</p>
              <p className="text-2xl font-bold text-gray-800">92%</p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center space-x-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">+3% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Average Response Time</p>
              <p className="text-2xl font-bold text-gray-800">2.3 hours</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDown className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">-0.5 hours from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-800">4.7/5.0</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="flex items-center space-x-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">+0.2 from last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsPage; 