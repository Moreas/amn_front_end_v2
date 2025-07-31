import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

// Sample quality data
const qualityData = [
  // Technician Performance
  {
    id: 1,
    type: 'technician',
    name: 'Silvia Cruz',
    metric: 'Customer Satisfaction',
    value: 4.8,
    target: 4.5,
    status: 'exceeding',
    period: 'August 2025',
    reviews: 24,
    positiveReviews: 22,
    negativeReviews: 2,
    lastUpdated: '2025-08-15'
  },
  {
    id: 2,
    type: 'technician',
    name: 'Amber Reed',
    metric: 'Customer Satisfaction',
    value: 4.6,
    target: 4.5,
    status: 'meeting',
    period: 'August 2025',
    reviews: 18,
    positiveReviews: 16,
    negativeReviews: 2,
    lastUpdated: '2025-08-15'
  },
  {
    id: 3,
    type: 'technician',
    name: 'Jade Smith',
    metric: 'Customer Satisfaction',
    value: 4.9,
    target: 4.5,
    status: 'exceeding',
    period: 'August 2025',
    reviews: 31,
    positiveReviews: 30,
    negativeReviews: 1,
    lastUpdated: '2025-08-15'
  },
  {
    id: 4,
    type: 'technician',
    name: 'Elizabeth Fernandes',
    metric: 'Customer Satisfaction',
    value: 4.3,
    target: 4.5,
    status: 'below',
    period: 'August 2025',
    reviews: 15,
    positiveReviews: 12,
    negativeReviews: 3,
    lastUpdated: '2025-08-15'
  },
  {
    id: 5,
    type: 'technician',
    name: 'Tia Johnson',
    metric: 'Customer Satisfaction',
    value: 4.7,
    target: 4.5,
    status: 'meeting',
    period: 'August 2025',
    reviews: 22,
    positiveReviews: 20,
    negativeReviews: 2,
    lastUpdated: '2025-08-15'
  },
  // Google Reviews
  {
    id: 6,
    type: 'review',
    platform: 'Google',
    rating: 5,
    reviewer: 'Sarah Johnson',
    date: '2025-08-15',
    content: 'Amazing service! Silvia was professional, punctual, and did an excellent job on my mother\'s nails. Highly recommend for assisted living facilities.',
    sentiment: 'positive',
    technician: 'Silvia Cruz',
    location: 'Tampa Area',
    status: 'published'
  },
  {
    id: 7,
    type: 'review',
    platform: 'Google',
    rating: 4,
    reviewer: 'Maria Rodriguez',
    date: '2025-08-14',
    content: 'Good service overall. Amber was friendly and did a nice job. Would use again.',
    sentiment: 'positive',
    technician: 'Amber Reed',
    location: 'Orlando Area',
    status: 'published'
  },
  {
    id: 8,
    type: 'review',
    platform: 'Google',
    rating: 5,
    reviewer: 'Jennifer Smith',
    date: '2025-08-13',
    content: 'Jade is absolutely wonderful! She came to our assisted living facility and provided excellent care for all our residents. Professional and caring.',
    sentiment: 'positive',
    technician: 'Jade Smith',
    location: 'Jacksonville Area',
    status: 'published'
  },
  {
    id: 9,
    type: 'review',
    platform: 'Google',
    rating: 3,
    reviewer: 'Lisa Chen',
    date: '2025-08-12',
    content: 'Service was okay but Elizabeth seemed rushed. Nail polish chipped after 2 days.',
    sentiment: 'negative',
    technician: 'Elizabeth Fernandes',
    location: 'West Palm Beach Area',
    status: 'published'
  },
  {
    id: 10,
    type: 'review',
    platform: 'Google',
    rating: 5,
    reviewer: 'Amanda Wilson',
    date: '2025-08-11',
    content: 'Tia did an amazing job for my bridal party! Everyone loved their nails. Professional, on-time, and beautiful work.',
    sentiment: 'positive',
    technician: 'Tia Johnson',
    location: 'Tampa Area',
    status: 'published'
  },
  // Performance Metrics
  {
    id: 11,
    type: 'metric',
    name: 'Overall Customer Satisfaction',
    value: 4.7,
    target: 4.5,
    status: 'exceeding',
    period: 'August 2025',
    change: '+0.2',
    changeDirection: 'up',
    lastUpdated: '2025-08-15'
  },
  {
    id: 12,
    type: 'metric',
    name: 'Response Time',
    value: 2.3,
    target: 3.0,
    status: 'exceeding',
    period: 'August 2025',
    change: '-0.5',
    changeDirection: 'up',
    lastUpdated: '2025-08-15'
  },
  {
    id: 13,
    type: 'metric',
    name: 'Service Quality Score',
    value: 4.6,
    target: 4.5,
    status: 'meeting',
    period: 'August 2025',
    change: '+0.1',
    changeDirection: 'up',
    lastUpdated: '2025-08-15'
  },
  {
    id: 14,
    type: 'metric',
    name: 'Client Retention Rate',
    value: 92,
    target: 85,
    status: 'exceeding',
    period: 'August 2025',
    change: '+3%',
    changeDirection: 'up',
    lastUpdated: '2025-08-15'
  }
];

function QualityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [technicianFilter, setTechnicianFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = qualityData.filter(item => {
      const matchesSearch = 
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.reviewer && item.reviewer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesTechnician = technicianFilter === 'all' || 
        (item.technician && item.technician === technicianFilter) ||
        (item.name && item.name === technicianFilter);
      
      return matchesSearch && matchesType && matchesStatus && matchesTechnician;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'value' || sortField === 'rating') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortField === 'date' || sortField === 'lastUpdated') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, typeFilter, statusFilter, technicianFilter, sortField, sortDirection]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeding': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'below': return 'bg-red-100 text-red-800';
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getChangeIcon = (direction) => {
    if (direction === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalReviews = qualityData.filter(item => item.type === 'review').length;
  const averageRating = qualityData.filter(item => item.type === 'review')
    .reduce((sum, item) => sum + item.rating, 0) / totalReviews;
  const positiveReviews = qualityData.filter(item => item.type === 'review' && item.sentiment === 'positive').length;
  const negativeReviews = qualityData.filter(item => item.type === 'review' && item.sentiment === 'negative').length;

  // Get unique technicians for filter
  const technicians = [...new Set(qualityData
    .filter(item => item.type === 'technician')
    .map(item => item.name))];

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">QUALITY</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{totalReviews}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
            </div>
            <Star className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Positive Reviews</p>
              <p className="text-2xl font-bold text-green-600">{positiveReviews}</p>
            </div>
            <ThumbsUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Negative Reviews</p>
              <p className="text-2xl font-bold text-red-600">{negativeReviews}</p>
            </div>
            <ThumbsDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('technicians')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'technicians'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Technician Performance
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'metrics'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance Metrics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search quality data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Types</option>
              <option value="technician">Technician Performance</option>
              <option value="review">Reviews</option>
              <option value="metric">Performance Metrics</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Status</option>
              <option value="exceeding">Exceeding</option>
              <option value="meeting">Meeting</option>
              <option value="below">Below Target</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>

            <select
              value={technicianFilter}
              onChange={(e) => setTechnicianFilter(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Technicians</option>
              {technicians.map(technician => (
                <option key={technician} value={technician}>{technician}</option>
              ))}
            </select>
          </div>

          {/* Quality Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>NAME/REVIEWER</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('value')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>RATING/SCORE</span>
                      {sortField === 'value' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DETAILS</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>DATE</span>
                      {sortField === 'date' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        {item.type === 'technician' && <User className="w-4 h-4 text-blue-600" />}
                        {item.type === 'review' && <MessageSquare className="w-4 h-4 text-green-600" />}
                        {item.type === 'metric' && <TrendingUp className="w-4 h-4 text-purple-600" />}
                        <span className="capitalize text-gray-900">{item.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.name || item.reviewer}
                        </div>
                        {item.technician && (
                          <div className="text-gray-500 text-xs">{item.technician}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < (item.value || item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-gray-900">{item.value || item.rating}</span>
                        {item.change && (
                          <div className="flex items-center space-x-1">
                            {getChangeIcon(item.changeDirection)}
                            <span className={`text-xs ${item.changeDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.change}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="max-w-xs">
                        {item.content && (
                          <div className="text-gray-900 text-xs truncate">{item.content}</div>
                        )}
                        {item.metric && (
                          <div className="text-gray-500 text-xs">{item.metric}</div>
                        )}
                        {item.reviews && (
                          <div className="text-gray-500 text-xs">{item.reviews} reviews</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatDate(item.date || item.lastUpdated)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.type === 'review' && (
                          <button className="text-gray-400 hover:text-gray-600">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

export default QualityPage; 