import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Calendar, 
  User, 
  Wrench, 
  DollarSign,
  Plus,
  HelpCircle,
  Mail,
  Users,
  Folder,
  MapPin,
  Headphones,
  TrendingUp,
  Bell
} from 'lucide-react';
import Dashboard from './Dashboard';
import AppointmentsPage from './AppointmentsPage';
import TechniciansPage from './TechniciansPage';
import ClientsPage from './ClientsPage';
import PayrollPage from './PayrollPage';
import HiringPage from './HiringPage';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();



  const getActiveMenu = () => {
    switch (location.pathname) {
      case '/appointments':
        return 'appointments';
      case '/technicians':
        return 'technicians';
      case '/clients':
        return 'clients';
      case '/payroll':
        return 'payroll';
      case '/hiring':
        return 'hiring';
      default:
        return 'home';
    }
  };

  const menuItems = [
    { id: 'home', icon: Home, text: 'Home', path: '/' },
    { id: 'appointments', icon: Calendar, text: 'Appointments', path: '/appointments' },
    { id: 'clients', icon: User, text: 'Clients', path: '/clients' },
    { id: 'technicians', icon: Wrench, text: 'Technicians', path: '/technicians' },
    { id: 'payroll', icon: DollarSign, text: 'Payroll', path: '/payroll' },
    { id: 'hiring', icon: Plus, text: 'Hiring', path: '/hiring' },
    { icon: HelpCircle, text: 'Requests' },
    { icon: Mail, text: 'Outreach' },
    { icon: Users, text: 'Leads' },
    { icon: Folder, text: 'Services' },
    { icon: MapPin, text: 'Locations' },
    { icon: Headphones, text: 'Quality' },
    { icon: TrendingUp, text: 'Metrics' }
  ];

  const activeMenu = getActiveMenu();

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 flex justify-center items-center">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-6">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 py-2 px-3 rounded-lg cursor-pointer ${
                  item.id === activeMenu
                    ? 'bg-yellow-50 text-red-800' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => item.path && navigate(item.path)}
              >
                <item.icon className={`w-5 h-5 ${item.id === activeMenu ? 'text-red-800' : 'text-gray-400'}`} />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-red-800 text-xl">⚙️</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Client..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Jade and Florent Pignaud</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
            <div className="w-5 h-5 text-gray-400 cursor-pointer">⬜→</div>
          </div>
        </div>

        {/* Main Content */}
        <Routes>
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/technicians" element={<TechniciansPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/hiring" element={<HiringPage />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
