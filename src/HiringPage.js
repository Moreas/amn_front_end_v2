import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Download,
  Upload
} from 'lucide-react';

// Sample job postings data
const jobPostings = [
  {
    id: 1,
    title: 'Mobile Nail Technician',
    location: 'Tampa Area',
    type: 'Full-time',
    salary: '$25-35/hour',
    status: 'active',
    source: 'Indeed',
    applications: 12,
    postedDate: '2025-07-15',
    expiresDate: '2025-08-15'
  },
  {
    id: 2,
    title: 'Experienced Nail Artist',
    location: 'Orlando Area',
    type: 'Part-time',
    salary: '$20-30/hour',
    status: 'active',
    source: 'Indeed',
    applications: 8,
    postedDate: '2025-07-20',
    expiresDate: '2025-08-20'
  },
  {
    id: 3,
    title: 'Senior Nail Technician',
    location: 'Jacksonville Area',
    type: 'Full-time',
    salary: '$30-40/hour',
    status: 'paused',
    source: 'Indeed',
    applications: 15,
    postedDate: '2025-07-10',
    expiresDate: '2025-08-10'
  },
  {
    id: 4,
    title: 'Nail Technician Trainee',
    location: 'West Palm Beach Area',
    type: 'Full-time',
    salary: '$18-25/hour',
    status: 'active',
    source: 'Indeed',
    applications: 25,
    postedDate: '2025-07-25',
    expiresDate: '2025-08-25'
  },
  {
    id: 5,
    title: 'Mobile Nail Specialist',
    location: 'Fort Myers Area',
    type: 'Part-time',
    salary: '$22-32/hour',
    status: 'closed',
    source: 'Indeed',
    applications: 6,
    postedDate: '2025-06-30',
    expiresDate: '2025-07-30'
  }
];

// Sample candidates data
const candidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'Tampa Area',
    position: 'Mobile Nail Technician',
    status: 'applied',
    source: 'Indeed',
    experience: '3 years',
    rating: 4.5,
    appliedDate: '2025-07-28',
    lastContact: '2025-07-29'
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '(555) 234-5678',
    location: 'Orlando Area',
    position: 'Experienced Nail Artist',
    status: 'interviewed',
    source: 'Indeed',
    experience: '5 years',
    rating: 4.8,
    appliedDate: '2025-07-25',
    lastContact: '2025-07-30'
  },
  {
    id: 3,
    name: 'Jennifer Smith',
    email: 'jennifer.smith@email.com',
    phone: '(555) 345-6789',
    location: 'Jacksonville Area',
    position: 'Senior Nail Technician',
    status: 'hired',
    source: 'Indeed',
    experience: '7 years',
    rating: 4.9,
    appliedDate: '2025-07-20',
    lastContact: '2025-08-01'
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '(555) 456-7890',
    location: 'West Palm Beach Area',
    position: 'Nail Technician Trainee',
    status: 'rejected',
    source: 'Indeed',
    experience: '1 year',
    rating: 3.8,
    appliedDate: '2025-07-26',
    lastContact: '2025-07-27'
  },
  {
    id: 5,
    name: 'Amanda Wilson',
    email: 'amanda.wilson@email.com',
    phone: '(555) 567-8901',
    location: 'Tampa Area',
    position: 'Mobile Nail Technician',
    status: 'scheduled',
    source: 'Indeed',
    experience: '4 years',
    rating: 4.2,
    appliedDate: '2025-07-27',
    lastContact: '2025-07-28'
  },
  {
    id: 6,
    name: 'Rachel Brown',
    email: 'rachel.brown@email.com',
    phone: '(555) 678-9012',
    location: 'Orlando Area',
    position: 'Experienced Nail Artist',
    status: 'applied',
    source: 'Indeed',
    experience: '2 years',
    rating: 4.0,
    appliedDate: '2025-07-29',
    lastContact: '2025-07-29'
  },
  {
    id: 7,
    name: 'Jessica Davis',
    email: 'jessica.davis@email.com',
    phone: '(555) 789-0123',
    location: 'Fort Myers Area',
    position: 'Mobile Nail Specialist',
    status: 'interviewed',
    source: 'Indeed',
    experience: '6 years',
    rating: 4.7,
    appliedDate: '2025-07-22',
    lastContact: '2025-07-31'
  },
  {
    id: 8,
    name: 'Nicole Taylor',
    email: 'nicole.taylor@email.com',
    phone: '(555) 890-1234',
    location: 'Jacksonville Area',
    position: 'Senior Nail Technician',
    status: 'applied',
    source: 'Indeed',
    experience: '3 years',
    rating: 4.1,
    appliedDate: '2025-07-30',
    lastContact: '2025-07-30'
  }
];

function HiringPage() {
  const [activeTab, setActiveTab] = useState('candidates');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortField, setSortField] = useState('appliedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 10;

  // Filter and sort candidates data
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      const matchesLocation = locationFilter === 'all' || candidate.location === locationFilter;
      const matchesSource = sourceFilter === 'all' || candidate.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesLocation && matchesSource;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'rating') {
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
  }, [searchTerm, statusFilter, locationFilter, sourceFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedCandidates.slice(startIndex, endIndex);

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
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'interviewed': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-purple-100 text-purple-700';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getJobStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
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
  const totalCandidates = candidates.length;
  const hiredCandidates = candidates.filter(c => c.status === 'hired').length;
  const activeApplications = candidates.filter(c => c.status === 'applied').length;
  const interviewScheduled = candidates.filter(c => c.status === 'scheduled').length;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">HIRING</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-800">{totalCandidates}</p>
            </div>
            <User className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hired</p>
              <p className="text-2xl font-bold text-green-600">{hiredCandidates}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Applications</p>
              <p className="text-2xl font-bold text-blue-600">{activeApplications}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-purple-600">{interviewScheduled}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'candidates'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integrations'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrations
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'candidates' && (
            <div>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                >
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>

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

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                >
                  <option value="all">All Sources</option>
                  <option value="Indeed">Indeed</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral">Referral</option>
                </select>
              </div>

              {/* Candidates Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-yellow-50">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Candidate</span>
                          {sortField === 'name' && (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                        onClick={() => handleSort('rating')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Rating</span>
                          {sortField === 'rating' && (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                        onClick={() => handleSort('appliedDate')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Applied</span>
                          {sortField === 'appliedDate' && (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-gray-500">{candidate.experience} experience</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-900">{candidate.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-900">{candidate.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{candidate.position}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-900">{candidate.location}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-gray-900">{candidate.rating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatDate(candidate.appliedDate)}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Mail className="w-4 h-4" />
                            </button>
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
                          <span className="font-medium">{Math.min(endIndex, filteredAndSortedCandidates.length)}</span> of{' '}
                          <span className="font-medium">{filteredAndSortedCandidates.length}</span> results
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
          )}

          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Job Postings</h3>
                <button className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Job Posting</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-yellow-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobPostings.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{job.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{job.location}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{job.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{job.salary}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{job.applications}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatDate(job.postedDate)}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Hiring Source Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Indeed Integration */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">IN</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Indeed</h4>
                        <p className="text-sm text-gray-500">Job board integration</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Connected</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Jobs Posted:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Applications Received:</span>
                      <span className="font-medium">66</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Sync Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Settings
                    </button>
                  </div>
                </div>

                {/* LinkedIn Integration */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">LI</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">LinkedIn</h4>
                        <p className="text-sm text-gray-500">Professional network</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">Not Connected</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Jobs Posted:</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Applications Received:</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-medium">Never</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Connect LinkedIn
                  </button>
                </div>

                {/* Import/Export */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h4>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      <span>Export Candidates</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Import Candidates</span>
                    </button>
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

export default HiringPage; 