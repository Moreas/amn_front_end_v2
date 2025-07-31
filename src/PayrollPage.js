import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  DollarSign,
  User,
  Eye,
  Download,
  Printer
} from 'lucide-react';

// Sample technician data for dropdown
const technicians = [
  'Gladys Hernandez',
  'Silvia Cruz',
  'Tia Johnson',
  'Amber Reed',
  'Julissa Sealy',
  'June Smith',
  'Sequoia Williams',
  'Karen Davis',
  'Elizabeth Fernandes',
  'Dennis Brown',
  'Yuleidy Varona',
  'Evonne Daley',
  'Monica Angulo',
  'Kori Seiler Mcclellan',
  'Brittney Gomez',
  'Roxi Martinez'
];

// Sample payroll data
const payrollData = [
  { id: 1, technician: 'Silvia', week: 1, year: 2025, amount: 362.00, status: 'paid' },
  { id: 2, technician: 'Tia', week: 1, year: 2025, amount: 784.00, status: 'paid' },
  { id: 3, technician: 'Amber', week: 2, year: 2025, amount: 1334.50, status: 'paid' },
  { id: 4, technician: 'Julissa', week: 2, year: 2025, amount: 430.25, status: 'pending' },
  { id: 5, technician: 'June', week: 3, year: 2025, amount: 0.00, status: 'pending' },
  { id: 6, technician: 'Sequoia', week: 3, year: 2025, amount: 892.75, status: 'paid' },
  { id: 7, technician: 'Gladys', week: 4, year: 2025, amount: 567.00, status: 'paid' },
  { id: 8, technician: 'Karen', week: 4, year: 2025, amount: 1234.00, status: 'paid' },
  { id: 9, technician: 'Elizabeth', week: 5, year: 2025, amount: 678.50, status: 'pending' },
  { id: 10, technician: 'Dennis', week: 5, year: 2025, amount: 445.25, status: 'paid' },
  { id: 11, technician: 'Yuleidy', week: 6, year: 2025, amount: 789.00, status: 'paid' },
  { id: 12, technician: 'Evonne', week: 6, year: 2025, amount: 567.75, status: 'paid' },
  { id: 13, technician: 'Monica', week: 7, year: 2025, amount: 923.50, status: 'pending' },
  { id: 14, technician: 'Kori', week: 7, year: 2025, amount: 1123.00, status: 'paid' },
  { id: 15, technician: 'Brittney', week: 8, year: 2025, amount: 456.25, status: 'paid' },
  { id: 16, technician: 'Roxi', week: 8, year: 2025, amount: 678.90, status: 'paid' },
  { id: 17, technician: 'Silvia', week: 9, year: 2025, amount: 445.00, status: 'pending' },
  { id: 18, technician: 'Tia', week: 9, year: 2025, amount: 892.30, status: 'paid' },
  { id: 19, technician: 'Amber', week: 10, year: 2025, amount: 1234.75, status: 'paid' },
  { id: 20, technician: 'Julissa', week: 10, year: 2025, amount: 567.45, status: 'paid' },
  { id: 21, technician: 'June', week: 11, year: 2025, amount: 0.00, status: 'pending' },
  { id: 22, technician: 'Sequoia', week: 11, year: 2025, amount: 789.20, status: 'paid' },
  { id: 23, technician: 'Gladys', week: 12, year: 2025, amount: 634.80, status: 'paid' },
  { id: 24, technician: 'Karen', week: 12, year: 2025, amount: 987.60, status: 'pending' },
  { id: 25, technician: 'Elizabeth', week: 13, year: 2025, amount: 723.40, status: 'paid' },
  { id: 26, technician: 'Dennis', week: 13, year: 2025, amount: 456.90, status: 'paid' },
  { id: 27, technician: 'Yuleidy', week: 14, year: 2025, amount: 834.25, status: 'paid' },
  { id: 28, technician: 'Evonne', week: 14, year: 2025, amount: 612.75, status: 'paid' },
  { id: 29, technician: 'Monica', week: 15, year: 2025, amount: 945.30, status: 'pending' },
  { id: 30, technician: 'Kori', week: 15, year: 2025, amount: 1189.50, status: 'paid' },
  { id: 31, technician: 'Brittney', week: 16, year: 2025, amount: 523.80, status: 'paid' },
  { id: 32, technician: 'Roxi', week: 16, year: 2025, amount: 712.45, status: 'paid' },
  { id: 33, technician: 'Silvia', week: 17, year: 2025, amount: 478.90, status: 'pending' },
  { id: 34, technician: 'Tia', week: 17, year: 2025, amount: 856.20, status: 'paid' },
  { id: 35, technician: 'Amber', week: 18, year: 2025, amount: 1345.60, status: 'paid' },
  { id: 36, technician: 'Julissa', week: 18, year: 2025, amount: 589.75, status: 'paid' },
  { id: 37, technician: 'June', week: 19, year: 2025, amount: 0.00, status: 'pending' },
  { id: 38, technician: 'Sequoia', week: 19, year: 2025, amount: 823.40, status: 'paid' },
  { id: 39, technician: 'Gladys', week: 20, year: 2025, amount: 678.90, status: 'paid' },
  { id: 40, technician: 'Karen', week: 20, year: 2025, amount: 1023.60, status: 'pending' },
  { id: 41, technician: 'Elizabeth', week: 21, year: 2025, amount: 756.30, status: 'paid' },
  { id: 42, technician: 'Dennis', week: 21, year: 2025, amount: 489.45, status: 'paid' },
  { id: 43, technician: 'Yuleidy', week: 22, year: 2025, amount: 867.80, status: 'paid' },
  { id: 44, technician: 'Evonne', week: 22, year: 2025, amount: 634.20, status: 'paid' },
  { id: 45, technician: 'Monica', week: 23, year: 2025, amount: 978.90, status: 'pending' },
  { id: 46, technician: 'Kori', week: 23, year: 2025, amount: 1245.75, status: 'paid' },
  { id: 47, technician: 'Brittney', week: 24, year: 2025, amount: 545.60, status: 'paid' },
  { id: 48, technician: 'Roxi', week: 24, year: 2025, amount: 734.80, status: 'paid' },
  { id: 49, technician: 'Silvia', week: 25, year: 2025, amount: 512.40, status: 'pending' },
  { id: 50, technician: 'Tia', week: 25, year: 2025, amount: 889.30, status: 'paid' }
];

function PayrollPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [technicianFilter, setTechnicianFilter] = useState('all');
  const [weekFilter, setWeekFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('week');
  const [sortDirection, setSortDirection] = useState('desc');
  const [createPayroll, setCreatePayroll] = useState({
    technician: '',
    week: '',
    year: '2025'
  });
  const itemsPerPage = 15;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = payrollData.filter(payroll => {
      const matchesSearch = 
        payroll.technician.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTechnician = technicianFilter === 'all' || payroll.technician === technicianFilter;
      const matchesWeek = weekFilter === 'all' || payroll.week.toString() === weekFilter;
      const matchesYear = yearFilter === 'all' || payroll.year.toString() === yearFilter;
      const matchesStatus = statusFilter === 'all' || payroll.status === statusFilter;
      
      return matchesSearch && matchesTechnician && matchesWeek && matchesYear && matchesStatus;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, technicianFilter, weekFilter, yearFilter, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCreatePayroll = () => {
    if (createPayroll.technician && createPayroll.week && createPayroll.year) {
      // Here you would typically make an API call to create payroll
      console.log('Creating payroll:', createPayroll);
      // Reset form
      setCreatePayroll({
        technician: '',
        week: '',
        year: '2025'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return '$0.00';
    if (!amount) return '$null';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Calculate totals
  const totalAmount = filteredAndSortedData.reduce((sum, payroll) => sum + (payroll.amount || 0), 0);
  const paidAmount = filteredAndSortedData.filter(p => p.status === 'paid').reduce((sum, payroll) => sum + (payroll.amount || 0), 0);
  const pendingAmount = filteredAndSortedData.filter(p => p.status === 'pending').reduce((sum, payroll) => sum + (payroll.amount || 0), 0);

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">PAYROLL</h1>
      </div>

      {/* Create Payroll Section */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Payroll</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={createPayroll.technician}
            onChange={(e) => setCreatePayroll({...createPayroll, technician: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="">Select Technician</option>
            {technicians.map((tech, index) => (
              <option key={index} value={tech}>{tech}</option>
            ))}
          </select>
          
          <select
            value={createPayroll.week}
            onChange={(e) => setCreatePayroll({...createPayroll, week: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="">Select Week</option>
            {Array.from({length: 52}, (_, i) => i + 1).map(week => (
              <option key={week} value={week}>{week}</option>
            ))}
          </select>
          
          <select
            value={createPayroll.year}
            onChange={(e) => setCreatePayroll({...createPayroll, year: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          
          <button
            onClick={handleCreatePayroll}
            className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
          >
            Start
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalAmount)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(paidAmount)}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">✓</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingAmount)}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm">⏳</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Records</p>
              <p className="text-2xl font-bold text-gray-800">{filteredAndSortedData.length}</p>
            </div>
            <User className="w-8 h-8 text-red-800" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search technician..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
            />
          </div>

          {/* Technician Filter */}
          <select
            value={technicianFilter}
            onChange={(e) => setTechnicianFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Technicians</option>
            {technicians.map((tech, index) => (
              <option key={index} value={tech}>{tech}</option>
            ))}
          </select>

          {/* Week Filter */}
          <select
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Weeks</option>
            {Array.from({length: 52}, (_, i) => i + 1).map(week => (
              <option key={week} value={week.toString()}>Week {week}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payrolls Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">PAYROLLS</h3>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('technician')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Technician</span>
                    {sortField === 'technician' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('week')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Week</span>
                    {sortField === 'week' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('year')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Year</span>
                    {sortField === 'year' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Amount</span>
                    {sortField === 'amount' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{payroll.technician}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{payroll.week}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{payroll.year}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{formatCurrency(payroll.amount)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payroll.status)}`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, filteredAndSortedData.length)}</span> of{' '}
                    <span className="font-medium">{filteredAndSortedData.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-red-50 border-red-500 text-red-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default PayrollPage; 