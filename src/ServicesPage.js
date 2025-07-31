import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  CheckCircle
} from 'lucide-react';

// Sample services data
const servicesData = [
  // ALF Services
  { id: 1, name: 'ALF - Essential Manicure Buff to Shine', price: 30.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 15.00, active: true, category: 'ALF Essential' },
  { id: 2, name: 'ALF - Essential Pedicure Buff to Shine', price: 35.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 17.50, active: true, category: 'ALF Essential' },
  { id: 3, name: 'ALF - Essential Mani&pedi Polish', price: 55.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 27.50, active: true, category: 'ALF Essential' },
  { id: 4, name: 'ALF - Royale Manicure Polish', price: 45.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 22.50, active: true, category: 'ALF Royale' },
  { id: 5, name: 'ALF - Royale Pedicure Polish', price: 50.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 25.00, active: true, category: 'ALF Royale' },
  { id: 6, name: 'ALF - Royale Mani&pedi Polish', price: 110.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 55.00, active: true, category: 'ALF Royale' },
  { id: 7, name: 'ALF - Royale Gel Manicure', price: 55.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 27.50, active: true, category: 'ALF Royale' },
  { id: 8, name: 'ALF - Royale Gel Pedicure', price: 60.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 30.00, active: true, category: 'ALF Royale' },
  { id: 9, name: 'ALF - Royale Gel Mani&pedi', price: 120.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 60.00, active: true, category: 'ALF Royale' },
  
  // Luxe Services
  { id: 10, name: 'Luxe Manicure Polish', price: 60.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 30.00, active: true, category: 'Luxe' },
  { id: 11, name: 'Luxe Pedicure Polish', price: 65.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 32.50, active: true, category: 'Luxe' },
  { id: 12, name: 'Luxe Mani&pedi Polish', price: 110.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 55.00, active: true, category: 'Luxe' },
  { id: 13, name: 'Luxe Gel Manicure', price: 80.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 40.00, active: true, category: 'Luxe' },
  { id: 14, name: 'Luxe Gel Pedicure', price: 85.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 42.50, active: true, category: 'Luxe' },
  { id: 15, name: 'Luxe Gel Manicure and Luxe Gel Pedicure', price: 160.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 80.00, active: true, category: 'Luxe' },
  
  // Add-on Services
  { id: 16, name: 'Other Add-on Service L1', price: 5.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 2.50, active: true, category: 'Add-ons' },
  { id: 17, name: 'Other Add-on Service L2', price: 10.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 5.00, active: true, category: 'Add-ons' },
  { id: 18, name: 'Other Add-on Service L3', price: 15.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 7.50, active: true, category: 'Add-ons' },
  { id: 19, name: 'Other Add-on Service L4', price: 20.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 10.00, active: true, category: 'Add-ons' },
  { id: 20, name: 'Other Add-on Service L5', price: 25.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 12.50, active: true, category: 'Add-ons' },
  
  // Special Services
  { id: 21, name: 'Princess mani&pedi', price: 55.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 27.50, active: true, category: 'Special' },
  { id: 22, name: 'Restorative Foot Care', price: 15.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 7.50, active: true, category: 'Special' },
  { id: 23, name: 'Therapeutic massage & Nail Care', price: 125.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 62.50, active: true, category: 'Special' },
  
  // Gel Polish Services
  { id: 24, name: 'Gel polish L1', price: 25.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 12.50, active: true, category: 'Gel Polish' },
  { id: 25, name: 'Gel polish L2', price: 50.00, splitType: 'percentage', splitPercent: 50.00, splitAmount: 25.00, active: true, category: 'Gel Polish' },
  
  // Travel Fees
  { id: 26, name: 'Travel Fee L1', price: 10.00, splitType: 'percentage', splitPercent: 100.00, splitAmount: 10.00, active: true, category: 'Travel Fees' },
  { id: 27, name: 'Travel Fee L2', price: 15.00, splitType: 'percentage', splitPercent: 100.00, splitAmount: 15.00, active: true, category: 'Travel Fees' },
  { id: 28, name: 'Travel Fee L3', price: 20.00, splitType: 'percentage', splitPercent: 100.00, splitAmount: 20.00, active: true, category: 'Travel Fees' },
  { id: 29, name: 'Travel Fee L4', price: 30.00, splitType: 'percentage', splitPercent: 100.00, splitAmount: 30.00, active: true, category: 'Travel Fees' },
  { id: 30, name: 'Travel Fee L5', price: 40.00, splitType: 'percentage', splitPercent: 100.00, splitAmount: 40.00, active: true, category: 'Travel Fees' },
  
  // Fees and Other
  { id: 31, name: 'Cancellation Fee', price: null, splitType: 'percentage', splitPercent: null, splitAmount: null, active: true, category: 'Fees' },
  { id: 32, name: 'Event', price: null, splitType: 'percentage', splitPercent: null, splitAmount: null, active: true, category: 'Fees' },
  { id: 33, name: 'Gratuity/tips', price: null, splitType: 'percentage', splitPercent: null, splitAmount: null, active: true, category: 'Fees' }
];

function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 15;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = servicesData.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
      const matchesActive = activeFilter === 'all' || 
        (activeFilter === 'active' && service.active) || 
        (activeFilter === 'inactive' && !service.active);
      
      return matchesSearch && matchesCategory && matchesActive;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'price' || sortField === 'splitAmount') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, categoryFilter, activeFilter, sortField, sortDirection]);

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

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '$null';
    return `$${amount.toFixed(2)}`;
  };

  const formatPercentage = (percent) => {
    if (percent === null || percent === undefined) return 'null%';
    return `${percent.toFixed(2)}%`;
  };

  // Get unique categories for filter
  const categories = [...new Set(servicesData.map(service => service.category))];

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">SERVICES</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>NAME</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center space-x-1">
                    <span>PRICE</span>
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPLIT TYPE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPLIT %</th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('splitAmount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>SPLIT $</span>
                    {sortField === 'splitAmount' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIVE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DETAILS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{service.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(service.price)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 capitalize">{service.splitType}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatPercentage(service.splitPercent)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(service.splitAmount)}</td>
                  <td className="px-4 py-3 text-sm">
                    {service.active ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className="text-gray-400">✗</span>
                    )}
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-4">
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

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default ServicesPage; 