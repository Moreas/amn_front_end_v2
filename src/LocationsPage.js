import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Star
} from 'lucide-react';

// Sample locations data for Florida areas
const locationsData = [
  {
    id: 1,
    area: 'Tampa Area',
    region: 'Central Florida',
    counties: ['Hillsborough', 'Pinellas', 'Pasco'],
    majorCities: ['Tampa', 'St. Petersburg', 'Clearwater', 'Largo'],
    activeTechnicians: 8,
    totalClients: 245,
    monthlyRevenue: 18500,
    averageRating: 4.8,
    status: 'active',
    description: 'Major metropolitan area with high demand for mobile nail services, including assisted living facilities and residential clients.',
    lastUpdated: '2025-08-15'
  },
  {
    id: 2,
    area: 'West Palm Beach - Treasure Coast Area',
    region: 'Southeast Florida',
    counties: ['Palm Beach', 'Martin', 'St. Lucie'],
    majorCities: ['West Palm Beach', 'Jupiter', 'Stuart', 'Port St. Lucie'],
    activeTechnicians: 6,
    totalClients: 180,
    monthlyRevenue: 14200,
    averageRating: 4.7,
    status: 'active',
    description: 'Affluent coastal area with luxury residential communities and upscale assisted living facilities.',
    lastUpdated: '2025-08-14'
  },
  {
    id: 3,
    area: 'Miami Area',
    region: 'Southeast Florida',
    counties: ['Miami-Dade', 'Broward'],
    majorCities: ['Miami', 'Fort Lauderdale', 'Hollywood', 'Coral Gables'],
    activeTechnicians: 10,
    totalClients: 320,
    monthlyRevenue: 25600,
    averageRating: 4.9,
    status: 'active',
    description: 'High-density urban area with diverse clientele, including luxury hotels, residential communities, and senior care facilities.',
    lastUpdated: '2025-08-15'
  },
  {
    id: 4,
    area: 'Orlando Area',
    region: 'Central Florida',
    counties: ['Orange', 'Seminole', 'Osceola'],
    majorCities: ['Orlando', 'Winter Park', 'Kissimmee', 'Sanford'],
    activeTechnicians: 7,
    totalClients: 195,
    monthlyRevenue: 15800,
    averageRating: 4.6,
    status: 'active',
    description: 'Tourist destination with theme parks, hotels, and growing residential communities requiring mobile nail services.',
    lastUpdated: '2025-08-13'
  },
  {
    id: 5,
    area: 'Jacksonville Area',
    region: 'Northeast Florida',
    counties: ['Duval', 'St. Johns', 'Clay'],
    majorCities: ['Jacksonville', 'St. Augustine', 'Orange Park', 'Ponte Vedra Beach'],
    activeTechnicians: 5,
    totalClients: 140,
    monthlyRevenue: 11200,
    averageRating: 4.5,
    status: 'active',
    description: 'Largest city in Florida by area, with diverse neighborhoods and growing senior population requiring mobile services.',
    lastUpdated: '2025-08-12'
  },
  {
    id: 6,
    area: 'Fort Myers - Cape Coral Area',
    region: 'Southwest Florida',
    counties: ['Lee', 'Collier'],
    majorCities: ['Fort Myers', 'Cape Coral', 'Naples', 'Bonita Springs'],
    activeTechnicians: 4,
    totalClients: 95,
    monthlyRevenue: 7800,
    averageRating: 4.7,
    status: 'active',
    description: 'Retirement destination with high concentration of assisted living facilities and luxury residential communities.',
    lastUpdated: '2025-08-11'
  },
  {
    id: 7,
    area: 'Sarasota Area',
    region: 'Southwest Florida',
    counties: ['Sarasota', 'Manatee'],
    majorCities: ['Sarasota', 'Bradenton', 'Venice', 'Longboat Key'],
    activeTechnicians: 3,
    totalClients: 75,
    monthlyRevenue: 6200,
    averageRating: 4.8,
    status: 'expanding',
    description: 'Cultural hub with affluent retirement communities and growing demand for luxury mobile nail services.',
    lastUpdated: '2025-08-10'
  },
  {
    id: 8,
    area: 'Gainesville Area',
    region: 'North Central Florida',
    counties: ['Alachua', 'Marion'],
    majorCities: ['Gainesville', 'Ocala', 'The Villages'],
    activeTechnicians: 2,
    totalClients: 45,
    monthlyRevenue: 3800,
    averageRating: 4.4,
    status: 'developing',
    description: 'University town with The Villages retirement community, offering opportunities for expansion in senior care services.',
    lastUpdated: '2025-08-09'
  }
];

function LocationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('area');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 8;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = locationsData.filter(location => {
      const matchesSearch = 
        location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.majorCities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        location.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = regionFilter === 'all' || location.region === regionFilter;
      const matchesStatus = statusFilter === 'all' || location.status === statusFilter;
      
      return matchesSearch && matchesRegion && matchesStatus;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'monthlyRevenue' || sortField === 'totalClients' || sortField === 'activeTechnicians' || sortField === 'averageRating') {
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
  }, [searchTerm, regionFilter, statusFilter, sortField, sortDirection]);

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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expanding': return 'bg-blue-100 text-blue-800';
      case 'developing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get unique regions for filter
  const regions = [...new Set(locationsData.map(location => location.region))];

  // Calculate summary statistics
  const totalRevenue = locationsData.reduce((sum, location) => sum + location.monthlyRevenue, 0);
  const totalClients = locationsData.reduce((sum, location) => sum + location.totalClients, 0);
  const totalTechnicians = locationsData.reduce((sum, location) => sum + location.activeTechnicians, 0);
  const averageRating = locationsData.reduce((sum, location) => sum + location.averageRating, 0) / locationsData.length;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">LOCATIONS</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Clients</p>
              <p className="text-2xl font-bold text-gray-800">{totalClients}</p>
            </div>
            <Users className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Technicians</p>
              <p className="text-2xl font-bold text-gray-800">{totalTechnicians}</p>
            </div>
            <Calendar className="w-8 h-8 text-red-800" />
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
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
          />
        </div>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="expanding">Expanding</option>
          <option value="developing">Developing</option>
        </select>

        <button className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('area')}
                >
                  <div className="flex items-center space-x-1">
                    <span>AREA</span>
                    {sortField === 'area' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REGION</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAJOR CITIES</th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('activeTechnicians')}
                >
                  <div className="flex items-center space-x-1">
                    <span>TECHNICIANS</span>
                    {sortField === 'activeTechnicians' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('totalClients')}
                >
                  <div className="flex items-center space-x-1">
                    <span>CLIENTS</span>
                    {sortField === 'totalClients' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('monthlyRevenue')}
                >
                  <div className="flex items-center space-x-1">
                    <span>MONTHLY REVENUE</span>
                    {sortField === 'monthlyRevenue' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('averageRating')}
                >
                  <div className="flex items-center space-x-1">
                    <span>RATING</span>
                    {sortField === 'averageRating' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DETAILS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-800" />
                      <span className="font-medium text-gray-900">{location.area}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{location.region}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="max-w-xs">
                      {location.majorCities.slice(0, 3).join(', ')}
                      {location.majorCities.length > 3 && '...'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{location.activeTechnicians}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{location.totalClients}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(location.monthlyRevenue)}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-gray-900">{location.averageRating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                      {location.status}
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

export default LocationsPage; 