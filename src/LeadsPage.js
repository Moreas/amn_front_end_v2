import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Mail,
  Phone,
  MapPin,
  Eye,
  CheckCircle,
  DollarSign,
  Clock
} from 'lucide-react';

// Sample leads data
const leadsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'Tampa Area',
    source: 'Website Contact Form',
    status: 'new',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-15',
    lastActivity: '2025-08-15',
    nextFollowUp: '2025-08-18',
    notes: 'Interested in mobile nail services for her mother in assisted living facility. Budget: $200-300/month.',
    potentialValue: 3600,
    tags: ['assisted living', 'elderly care', 'monthly service']
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '(555) 234-5678',
    location: 'Orlando Area',
    source: 'Facebook Lead Ad',
    status: 'contacted',
    priority: 'medium',
    assignedTo: 'Amber',
    createdAt: '2025-08-14',
    lastActivity: '2025-08-15',
    nextFollowUp: '2025-08-20',
    notes: 'Looking for bridal party services for wedding in October. 6 bridesmaids + bride.',
    potentialValue: 800,
    tags: ['bridal services', 'wedding', 'group booking']
  },
  {
    id: 3,
    name: 'Jennifer Smith',
    email: 'jennifer.smith@email.com',
    phone: '(555) 345-6789',
    location: 'Jacksonville Area',
    source: 'Google Ads',
    status: 'qualified',
    priority: 'high',
    assignedTo: 'Silvia',
    createdAt: '2025-08-13',
    lastActivity: '2025-08-15',
    nextFollowUp: '2025-08-19',
    notes: 'Corporate wellness coordinator. Interested in monthly employee wellness events. 50+ employees.',
    potentialValue: 12000,
    tags: ['corporate', 'wellness', 'monthly events']
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '(555) 456-7890',
    location: 'West Palm Beach Area',
    source: 'Referral',
    status: 'proposal_sent',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-12',
    lastActivity: '2025-08-15',
    nextFollowUp: '2025-08-22',
    notes: 'Luxury residential community manager. Interested in on-site services for residents.',
    potentialValue: 15000,
    tags: ['luxury', 'residential', 'on-site services']
  },
  {
    id: 5,
    name: 'Amanda Wilson',
    email: 'amanda.wilson@email.com',
    phone: '(555) 567-8901',
    location: 'Tampa Area',
    source: 'Instagram DM',
    status: 'meeting_scheduled',
    priority: 'medium',
    assignedTo: 'Amber',
    createdAt: '2025-08-11',
    lastActivity: '2025-08-14',
    nextFollowUp: '2025-08-19',
    notes: 'Individual client interested in regular manicure services. Prefers gel polish.',
    potentialValue: 600,
    tags: ['individual', 'regular service', 'gel polish']
  },
  {
    id: 6,
    name: 'Rachel Brown',
    email: 'rachel.brown@email.com',
    phone: '(555) 678-9012',
    location: 'Orlando Area',
    source: 'Website Contact Form',
    status: 'new',
    priority: 'low',
    assignedTo: 'Silvia',
    createdAt: '2025-08-15',
    lastActivity: '2025-08-15',
    nextFollowUp: '2025-08-25',
    notes: 'Inquiry about pricing for basic manicure services. Budget conscious.',
    potentialValue: 300,
    tags: ['basic services', 'budget conscious', 'pricing inquiry']
  },
  {
    id: 7,
    name: 'Jessica Davis',
    email: 'jessica.davis@email.com',
    phone: '(555) 789-0123',
    location: 'Fort Myers Area',
    source: 'LinkedIn',
    status: 'contacted',
    priority: 'high',
    assignedTo: 'Jade',
    createdAt: '2025-08-10',
    lastActivity: '2025-08-14',
    nextFollowUp: '2025-08-17',
    notes: 'Hotel spa director. Interested in in-room nail services for guests.',
    potentialValue: 20000,
    tags: ['hotel', 'spa', 'in-room services']
  },
  {
    id: 8,
    name: 'Nicole Taylor',
    email: 'nicole.taylor@email.com',
    phone: '(555) 890-1234',
    location: 'Jacksonville Area',
    source: 'Referral',
    status: 'qualified',
    priority: 'medium',
    assignedTo: 'Amber',
    createdAt: '2025-08-09',
    lastActivity: '2025-08-13',
    nextFollowUp: '2025-08-20',
    notes: 'Wedding planner referral. Interested in bridal party services for spring weddings.',
    potentialValue: 5000,
    tags: ['wedding planner', 'bridal services', 'spring weddings']
  },
  {
    id: 9,
    name: 'Emily White',
    email: 'emily.white@email.com',
    phone: '(555) 901-2345',
    location: 'Miami Area',
    source: 'Facebook Lead Ad',
    status: 'new',
    priority: 'high',
    assignedTo: 'Silvia',
    createdAt: '2025-08-15',
    lastActivity: '2025-08-15',
    nextFollowUp: '2025-08-18',
    notes: 'Luxury residential client. Interested in premium nail services. High-end budget.',
    potentialValue: 2400,
    tags: ['luxury', 'premium services', 'high-end']
  },
  {
    id: 10,
    name: 'Ashley Garcia',
    email: 'ashley.garcia@email.com',
    phone: '(555) 012-3456',
    location: 'Tampa Area',
    source: 'Google Ads',
    status: 'contacted',
    priority: 'medium',
    assignedTo: 'Jade',
    createdAt: '2025-08-08',
    lastActivity: '2025-08-12',
    nextFollowUp: '2025-08-19',
    notes: 'Corporate event planner. Interested in on-site services for company events.',
    potentialValue: 8000,
    tags: ['corporate events', 'on-site services', 'company events']
  },
  {
    id: 11,
    name: 'Michelle Lee',
    email: 'michelle.lee@email.com',
    phone: '(555) 123-4568',
    location: 'West Palm Beach Area',
    source: 'Website Contact Form',
    status: 'qualified',
    priority: 'high',
    assignedTo: 'Amber',
    createdAt: '2025-08-07',
    lastActivity: '2025-08-11',
    nextFollowUp: '2025-08-18',
    notes: 'Assisted living facility activities director. Interested in weekly nail services for residents.',
    potentialValue: 4800,
    tags: ['assisted living', 'weekly services', 'activities director']
  },
  {
    id: 12,
    name: 'Stephanie Kim',
    email: 'stephanie.kim@email.com',
    phone: '(555) 234-5679',
    location: 'Orlando Area',
    source: 'Instagram DM',
    status: 'proposal_sent',
    priority: 'medium',
    assignedTo: 'Silvia',
    createdAt: '2025-08-06',
    lastActivity: '2025-08-10',
    nextFollowUp: '2025-08-17',
    notes: 'Individual client interested in therapeutic nail care services.',
    potentialValue: 900,
    tags: ['individual', 'therapeutic', 'nail care']
  }
];

function LeadsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignedToFilter, setAssignedToFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = leadsData.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
      const matchesAssignedTo = assignedToFilter === 'all' || lead.assignedTo === assignedToFilter;
      
      return matchesSearch && matchesSource && matchesStatus && matchesPriority && matchesAssignedTo;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'potentialValue') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortField === 'createdAt' || sortField === 'lastActivity' || sortField === 'nextFollowUp') {
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
  }, [searchTerm, sourceFilter, statusFilter, priorityFilter, assignedToFilter, sortField, sortDirection]);

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
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-purple-100 text-purple-700';
      case 'proposal_sent': return 'bg-indigo-100 text-indigo-700';
      case 'meeting_scheduled': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-700';
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalLeads = leadsData.length;
  const totalPotentialValue = leadsData.reduce((sum, lead) => sum + lead.potentialValue, 0);
  const newLeads = leadsData.filter(l => l.status === 'new').length;
  const qualifiedLeads = leadsData.filter(l => l.status === 'qualified' || l.status === 'proposal_sent').length;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">LEADS</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-gray-800">{totalLeads}</p>
            </div>
            <User className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Potential Value</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPotentialValue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Leads</p>
              <p className="text-2xl font-bold text-blue-600">{newLeads}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Qualified</p>
              <p className="text-2xl font-bold text-green-600">{qualifiedLeads}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
          />
        </div>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Sources</option>
          <option value="Website Contact Form">Website Contact Form</option>
          <option value="Facebook Lead Ad">Facebook Lead Ad</option>
          <option value="Google Ads">Google Ads</option>
          <option value="Referral">Referral</option>
          <option value="Instagram DM">Instagram DM</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal_sent">Proposal Sent</option>
          <option value="meeting_scheduled">Meeting Scheduled</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={assignedToFilter}
          onChange={(e) => setAssignedToFilter(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          <option value="all">All Assignees</option>
          <option value="Jade">Jade</option>
          <option value="Amber">Amber</option>
          <option value="Silvia">Silvia</option>
        </select>
      </div>

      {/* Leads Table */}
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
                    <span>LEAD</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONTACT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOCATION</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOURCE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRIORITY</th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('potentialValue')}
                >
                  <div className="flex items-center space-x-1">
                    <span>POTENTIAL VALUE</span>
                    {sortField === 'potentialValue' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center space-x-1">
                    <span>CREATED</span>
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-gray-500 text-xs">{lead.assignedTo}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-900">{lead.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{lead.source}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(lead.potentialValue)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
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

export default LeadsPage; 