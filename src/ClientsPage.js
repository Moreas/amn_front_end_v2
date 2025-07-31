import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// Sample client data (over 30 clients)
const clientData = [
  { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@email.com', phone: '(555) 123-4567', location: 'Tampa Area', status: 'active', lastVisit: '2025-07-28', totalVisits: 12, totalSpent: 850 },
  { id: 2, firstName: 'Maria', lastName: 'Rodriguez', email: 'maria.rodriguez@email.com', phone: '(555) 234-5678', location: 'Orlando Area', status: 'active', lastVisit: '2025-07-29', totalVisits: 8, totalSpent: 620 },
  { id: 3, firstName: 'Jennifer', lastName: 'Smith', email: 'jennifer.smith@email.com', phone: '(555) 345-6789', location: 'Jacksonville Area', status: 'active', lastVisit: '2025-07-30', totalVisits: 15, totalSpent: 1200 },
  { id: 4, firstName: 'Lisa', lastName: 'Chen', email: 'lisa.chen@email.com', phone: '(555) 456-7890', location: 'West Palm Beach Area', status: 'inactive', lastVisit: '2025-06-15', totalVisits: 5, totalSpent: 380 },
  { id: 5, firstName: 'Amanda', lastName: 'Wilson', email: 'amanda.wilson@email.com', phone: '(555) 567-8901', location: 'Tampa Area', status: 'active', lastVisit: '2025-07-31', totalVisits: 20, totalSpent: 1500 },
  { id: 6, firstName: 'Rachel', lastName: 'Brown', email: 'rachel.brown@email.com', phone: '(555) 678-9012', location: 'Orlando Area', status: 'active', lastVisit: '2025-08-01', totalVisits: 10, totalSpent: 750 },
  { id: 7, firstName: 'Jessica', lastName: 'Davis', email: 'jessica.davis@email.com', phone: '(555) 789-0123', location: 'Fort Myers Area', status: 'active', lastVisit: '2025-07-27', totalVisits: 18, totalSpent: 1100 },
  { id: 8, firstName: 'Nicole', lastName: 'Taylor', email: 'nicole.taylor@email.com', phone: '(555) 890-1234', location: 'Jacksonville Area', status: 'inactive', lastVisit: '2025-05-20', totalVisits: 3, totalSpent: 200 },
  { id: 9, firstName: 'Emily', lastName: 'White', email: 'emily.white@email.com', phone: '(555) 901-2345', location: 'Tampa Area', status: 'active', lastVisit: '2025-08-02', totalVisits: 25, totalSpent: 1800 },
  { id: 10, firstName: 'Ashley', lastName: 'Garcia', email: 'ashley.garcia@email.com', phone: '(555) 012-3456', location: 'Orlando Area', status: 'active', lastVisit: '2025-07-26', totalVisits: 14, totalSpent: 950 },
  { id: 11, firstName: 'Michelle', lastName: 'Lee', email: 'michelle.lee@email.com', phone: '(555) 123-4568', location: 'West Palm Beach Area', status: 'active', lastVisit: '2025-07-25', totalVisits: 16, totalSpent: 1200 },
  { id: 12, firstName: 'Stephanie', lastName: 'Kim', email: 'stephanie.kim@email.com', phone: '(555) 234-5679', location: 'Fort Myers Area', status: 'active', lastVisit: '2025-08-03', totalVisits: 22, totalSpent: 1600 },
  { id: 13, firstName: 'Lauren', lastName: 'Anderson', email: 'lauren.anderson@email.com', phone: '(555) 345-6780', location: 'Tampa Area', status: 'inactive', lastVisit: '2025-04-10', totalVisits: 7, totalSpent: 450 },
  { id: 14, firstName: 'Melissa', lastName: 'Martinez', email: 'melissa.martinez@email.com', phone: '(555) 456-7891', location: 'Jacksonville Area', status: 'active', lastVisit: '2025-07-24', totalVisits: 19, totalSpent: 1300 },
  { id: 15, firstName: 'Christina', lastName: 'Lopez', email: 'christina.lopez@email.com', phone: '(555) 567-8902', location: 'Orlando Area', status: 'active', lastVisit: '2025-08-04', totalVisits: 11, totalSpent: 800 },
  { id: 16, firstName: 'Heather', lastName: 'Gonzalez', email: 'heather.gonzalez@email.com', phone: '(555) 678-9013', location: 'West Palm Beach Area', status: 'active', lastVisit: '2025-07-23', totalVisits: 13, totalSpent: 900 },
  { id: 17, firstName: 'Danielle', lastName: 'Perez', email: 'danielle.perez@email.com', phone: '(555) 789-0124', location: 'Tampa Area', status: 'active', lastVisit: '2025-08-05', totalVisits: 17, totalSpent: 1100 },
  { id: 18, firstName: 'Brittany', lastName: 'Torres', email: 'brittany.torres@email.com', phone: '(555) 890-1235', location: 'Fort Myers Area', status: 'inactive', lastVisit: '2025-03-15', totalVisits: 4, totalSpent: 280 },
  { id: 19, firstName: 'Vanessa', lastName: 'Ramirez', email: 'vanessa.ramirez@email.com', phone: '(555) 901-2346', location: 'Jacksonville Area', status: 'active', lastVisit: '2025-07-22', totalVisits: 21, totalSpent: 1400 },
  { id: 20, firstName: 'Samantha', lastName: 'Flores', email: 'samantha.flores@email.com', phone: '(555) 012-3457', location: 'Orlando Area', status: 'active', lastVisit: '2025-08-06', totalVisits: 9, totalSpent: 650 },
  { id: 21, firstName: 'Alexandra', lastName: 'Butler', email: 'alexandra.butler@email.com', phone: '(555) 123-4569', location: 'Tampa Area', status: 'active', lastVisit: '2025-07-21', totalVisits: 24, totalSpent: 1700 },
  { id: 22, firstName: 'Victoria', lastName: 'Simmons', email: 'victoria.simmons@email.com', phone: '(555) 234-5670', location: 'West Palm Beach Area', status: 'active', lastVisit: '2025-08-07', totalVisits: 6, totalSpent: 420 },
  { id: 23, firstName: 'Courtney', lastName: 'Foster', email: 'courtney.foster@email.com', phone: '(555) 345-6781', location: 'Fort Myers Area', status: 'active', lastVisit: '2025-07-20', totalVisits: 15, totalSpent: 1000 },
  { id: 24, firstName: 'Megan', lastName: 'Gonzales', email: 'megan.gonzales@email.com', phone: '(555) 456-7892', location: 'Jacksonville Area', status: 'inactive', lastVisit: '2025-02-28', totalVisits: 2, totalSpent: 150 },
  { id: 25, firstName: 'Kayla', lastName: 'Bryant', email: 'kayla.bryant@email.com', phone: '(555) 567-8903', location: 'Orlando Area', status: 'active', lastVisit: '2025-08-08', totalVisits: 12, totalSpent: 850 },
  { id: 26, firstName: 'Tiffany', lastName: 'Alexander', email: 'tiffany.alexander@email.com', phone: '(555) 678-9014', location: 'Tampa Area', status: 'active', lastVisit: '2025-07-19', totalVisits: 18, totalSpent: 1200 },
  { id: 27, firstName: 'Crystal', lastName: 'Russell', email: 'crystal.russell@email.com', phone: '(555) 789-0125', location: 'West Palm Beach Area', status: 'active', lastVisit: '2025-08-09', totalVisits: 8, totalSpent: 580 },
  { id: 28, firstName: 'Monica', lastName: 'Griffin', email: 'monica.griffin@email.com', phone: '(555) 890-1236', location: 'Fort Myers Area', status: 'active', lastVisit: '2025-07-18', totalVisits: 16, totalSpent: 1100 },
  { id: 29, firstName: 'Erica', lastName: 'Diaz', email: 'erica.diaz@email.com', phone: '(555) 901-2347', location: 'Jacksonville Area', status: 'active', lastVisit: '2025-08-10', totalVisits: 10, totalSpent: 720 },
  { id: 30, firstName: 'Jamie', lastName: 'Hayes', email: 'jamie.hayes@email.com', phone: '(555) 012-3458', location: 'Orlando Area', status: 'inactive', lastVisit: '2025-01-15', totalVisits: 1, totalSpent: 80 },
  { id: 31, firstName: 'Lindsey', lastName: 'Myers', email: 'lindsey.myers@email.com', phone: '(555) 123-4570', location: 'Tampa Area', status: 'active', lastVisit: '2025-07-17', totalVisits: 23, totalSpent: 1600 },
  { id: 32, firstName: 'Katherine', lastName: 'Ford', email: 'katherine.ford@email.com', phone: '(555) 234-5671', location: 'West Palm Beach Area', status: 'active', lastVisit: '2025-08-11', totalVisits: 7, totalSpent: 500 },
  { id: 33, firstName: 'Allison', lastName: 'Hamilton', email: 'allison.hamilton@email.com', phone: '(555) 345-6782', location: 'Fort Myers Area', status: 'active', lastVisit: '2025-07-16', totalVisits: 14, totalSpent: 950 },
  { id: 34, firstName: 'Rebecca', lastName: 'Graham', email: 'rebecca.graham@email.com', phone: '(555) 456-7893', location: 'Jacksonville Area', status: 'active', lastVisit: '2025-08-12', totalVisits: 11, totalSpent: 780 },
  { id: 35, firstName: 'Chelsea', lastName: 'Sullivan', email: 'chelsea.sullivan@email.com', phone: '(555) 567-8904', location: 'Orlando Area', status: 'active', lastVisit: '2025-07-15', totalVisits: 20, totalSpent: 1400 }
];

function ClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortField, setSortField] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = clientData.filter(client => {
      const matchesSearch = 
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesLocation = locationFilter === 'all' || client.location === locationFilter;
      
      return matchesSearch && matchesStatus && matchesLocation;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'totalSpent') {
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
  }, [searchTerm, statusFilter, locationFilter, sortField, sortDirection]);

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
      case 'active': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">CLIENTS</h1>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Locations</option>
            <option value="Tampa Area">Tampa Area</option>
            <option value="Orlando Area">Orlando Area</option>
            <option value="Jacksonville Area">Jacksonville Area</option>
            <option value="West Palm Beach Area">West Palm Beach Area</option>
            <option value="Fort Myers Area">Fort Myers Area</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-end text-sm text-gray-600">
            {filteredAndSortedData.length} clients found
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('firstName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>First Name</span>
                    {sortField === 'firstName' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('lastName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Name</span>
                    {sortField === 'lastName' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('lastVisit')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Visit</span>
                    {sortField === 'lastVisit' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('totalVisits')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Visits</span>
                    {sortField === 'totalVisits' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Total Spent</span>
                    {sortField === 'totalSpent' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{client.firstName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{client.lastName}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{client.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-900">{client.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatDate(client.lastVisit)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{client.totalVisits}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(client.totalSpent)}</td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-gray-400 hover:text-gray-600">👁️</button>
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

export default ClientsPage; 