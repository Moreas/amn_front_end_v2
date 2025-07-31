import React, { useState, useMemo } from 'react';
import { 
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Mail,
  User,
  Building,
  Calendar,
  Star,
  Eye,
  CheckCircle,
  Linkedin,
  MapPin,
  DollarSign
} from 'lucide-react';

// Sample outreach data
const outreachData = [
  // Senior Facilities
  {
    id: 1,
    type: 'senior_facility',
    company: 'Sunset Gardens Assisted Living',
    contact: 'Sarah Johnson',
    title: 'Activities Director',
    email: 'sarah.johnson@sunsetgardens.com',
    phone: '(555) 123-4567',
    location: 'Tampa Area',
    linkedin: 'linkedin.com/in/sarah-johnson-activities',
    status: 'contacted',
    priority: 'high',
    assignedTo: 'Jade',
    lastContact: '2025-08-15',
    nextFollowUp: '2025-08-22',
    notes: 'Interested in weekly nail services for residents. Budget approved for monthly program.',
    potentialRevenue: 2400,
    tags: ['assisted living', 'weekly services', 'budget approved']
  },
  {
    id: 2,
    type: 'senior_facility',
    company: 'Golden Years Memory Care',
    contact: 'Michael Rodriguez',
    title: 'Facility Manager',
    email: 'm.rodriguez@goldenyears.com',
    phone: '(555) 234-5678',
    location: 'Orlando Area',
    linkedin: 'linkedin.com/in/michael-rodriguez-facility',
    status: 'qualified',
    priority: 'high',
    assignedTo: 'Amber',
    lastContact: '2025-08-14',
    nextFollowUp: '2025-08-21',
    notes: 'Memory care facility with 45 residents. Interested in therapeutic nail care services.',
    potentialRevenue: 1800,
    tags: ['memory care', 'therapeutic services', '45 residents']
  },
  {
    id: 3,
    type: 'senior_facility',
    company: 'Palm Beach Senior Living',
    contact: 'Jennifer Smith',
    title: 'Wellness Coordinator',
    email: 'jennifer.smith@palmbeachsenior.com',
    phone: '(555) 345-6789',
    location: 'West Palm Beach Area',
    linkedin: 'linkedin.com/in/jennifer-smith-wellness',
    status: 'new',
    priority: 'medium',
    assignedTo: 'Silvia',
    lastContact: null,
    nextFollowUp: '2025-08-18',
    notes: 'Luxury senior living community. High-end clientele, premium services needed.',
    potentialRevenue: 3200,
    tags: ['luxury', 'premium services', 'high-end']
  },
  // Wedding Planners
  {
    id: 4,
    type: 'wedding_planner',
    company: 'Elegant Events by Maria',
    contact: 'Maria Garcia',
    title: 'Owner & Lead Planner',
    email: 'maria@elegantevents.com',
    phone: '(555) 456-7890',
    location: 'Miami Area',
    linkedin: 'linkedin.com/in/maria-garcia-events',
    status: 'proposal_sent',
    priority: 'high',
    assignedTo: 'Jade',
    lastContact: '2025-08-15',
    nextFollowUp: '2025-08-20',
    notes: 'High-end wedding planner. Interested in bridal party services. 15-20 weddings per year.',
    potentialRevenue: 15000,
    tags: ['bridal services', 'high-end', '15-20 weddings/year']
  },
  {
    id: 5,
    type: 'wedding_planner',
    company: 'Dream Day Weddings',
    contact: 'Lisa Chen',
    title: 'Wedding Coordinator',
    email: 'lisa@dreamdayweddings.com',
    phone: '(555) 567-8901',
    location: 'Tampa Area',
    linkedin: 'linkedin.com/in/lisa-chen-weddings',
    status: 'meeting_scheduled',
    priority: 'medium',
    assignedTo: 'Amber',
    lastContact: '2025-08-13',
    nextFollowUp: '2025-08-19',
    notes: 'Meeting scheduled for next week. Interested in mobile bridal services.',
    potentialRevenue: 8000,
    tags: ['bridal services', 'meeting scheduled', 'mobile services']
  },
  {
    id: 6,
    type: 'wedding_planner',
    company: 'Coastal Celebrations',
    contact: 'Amanda Wilson',
    title: 'Event Director',
    email: 'amanda@coastalcelebrations.com',
    phone: '(555) 678-9012',
    location: 'Jacksonville Area',
    linkedin: 'linkedin.com/in/amanda-wilson-events',
    status: 'contacted',
    priority: 'low',
    assignedTo: 'Silvia',
    lastContact: '2025-08-12',
    nextFollowUp: '2025-08-25',
    notes: 'Beach wedding specialist. Seasonal business, peak in spring/summer.',
    potentialRevenue: 6000,
    tags: ['beach weddings', 'seasonal', 'spring/summer peak']
  },
  // Corporate Clients
  {
    id: 7,
    type: 'corporate',
    company: 'Wellness First Corporate',
    contact: 'David Thompson',
    title: 'HR Director',
    email: 'd.thompson@wellnessfirst.com',
    phone: '(555) 789-0123',
    location: 'Orlando Area',
    linkedin: 'linkedin.com/in/david-thompson-hr',
    status: 'qualified',
    priority: 'high',
    assignedTo: 'Jade',
    lastContact: '2025-08-14',
    nextFollowUp: '2025-08-21',
    notes: 'Corporate wellness program. 200+ employees. Monthly wellness events.',
    potentialRevenue: 12000,
    tags: ['corporate wellness', '200+ employees', 'monthly events']
  },
  {
    id: 8,
    type: 'corporate',
    company: 'Tech Solutions Inc.',
    contact: 'Rachel Brown',
    title: 'Benefits Manager',
    email: 'rachel.brown@techsolutions.com',
    phone: '(555) 890-1234',
    location: 'Tampa Area',
    linkedin: 'linkedin.com/in/rachel-brown-benefits',
    status: 'new',
    priority: 'medium',
    assignedTo: 'Amber',
    lastContact: null,
    nextFollowUp: '2025-08-17',
    notes: 'Tech company with 150 employees. Interested in employee wellness perks.',
    potentialRevenue: 9000,
    tags: ['tech company', '150 employees', 'wellness perks']
  },
  // Hotels & Resorts
  {
    id: 9,
    type: 'hotel',
    company: 'Oceanview Resort & Spa',
    contact: 'Jessica Davis',
    title: 'Spa Director',
    email: 'jessica.davis@oceanviewresort.com',
    phone: '(555) 901-2345',
    location: 'Fort Myers Area',
    linkedin: 'linkedin.com/in/jessica-davis-spa',
    status: 'proposal_sent',
    priority: 'high',
    assignedTo: 'Silvia',
    lastContact: '2025-08-15',
    nextFollowUp: '2025-08-22',
    notes: 'Luxury resort with 200 rooms. Interested in in-room nail services for guests.',
    potentialRevenue: 25000,
    tags: ['luxury resort', '200 rooms', 'in-room services']
  },
  {
    id: 10,
    type: 'hotel',
    company: 'Downtown Business Hotel',
    contact: 'Nicole Taylor',
    title: 'Guest Services Manager',
    email: 'nicole.taylor@downtownhotel.com',
    phone: '(555) 012-3456',
    location: 'Miami Area',
    linkedin: 'linkedin.com/in/nicole-taylor-guest-services',
    status: 'contacted',
    priority: 'medium',
    assignedTo: 'Jade',
    lastContact: '2025-08-13',
    nextFollowUp: '2025-08-20',
    notes: 'Business hotel with conference facilities. Interested in corporate event services.',
    potentialRevenue: 15000,
    tags: ['business hotel', 'conference facilities', 'corporate events']
  }
];

function OutreachPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignedToFilter, setAssignedToFilter] = useState('all');
  const [sortField, setSortField] = useState('lastContact');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = outreachData.filter(contact => {
      const matchesSearch = 
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || contact.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || contact.priority === priorityFilter;
      const matchesAssignedTo = assignedToFilter === 'all' || contact.assignedTo === assignedToFilter;
      
      const matchesTab = activeTab === 'all' || contact.type === activeTab;
      
      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesAssignedTo && matchesTab;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'potentialRevenue') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortField === 'lastContact' || sortField === 'nextFollowUp') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, typeFilter, statusFilter, priorityFilter, assignedToFilter, activeTab, sortField, sortDirection]);

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
      case 'closed_won': return 'bg-green-100 text-green-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'senior_facility': return <Building className="w-4 h-4" />;
      case 'wedding_planner': return <Calendar className="w-4 h-4" />;
      case 'corporate': return <User className="w-4 h-4" />;
      case 'hotel': return <Building className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'senior_facility': return 'Senior Facility';
      case 'wedding_planner': return 'Wedding Planner';
      case 'corporate': return 'Corporate';
      case 'hotel': return 'Hotel/Resort';
      default: return type;
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
    if (!dateString) return 'Not contacted';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalContacts = outreachData.length;
  const totalPotentialRevenue = outreachData.reduce((sum, contact) => sum + contact.potentialRevenue, 0);
  const highPriorityContacts = outreachData.filter(c => c.priority === 'high').length;
  const qualifiedLeads = outreachData.filter(c => c.status === 'qualified' || c.status === 'proposal_sent').length;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">OUTREACH</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-800">{totalContacts}</p>
            </div>
            <User className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPotentialRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-800" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityContacts}</p>
            </div>
            <Star className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Qualified Leads</p>
              <p className="text-2xl font-bold text-green-600">{qualifiedLeads}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Contacts
            </button>
            <button
              onClick={() => setActiveTab('senior_facility')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'senior_facility'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Senior Facilities
            </button>
            <button
              onClick={() => setActiveTab('wedding_planner')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'wedding_planner'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Wedding Planners
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'corporate'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Corporate
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hotel'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Hotels & Resorts
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
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
              <option value="senior_facility">Senior Facilities</option>
              <option value="wedding_planner">Wedding Planners</option>
              <option value="corporate">Corporate</option>
              <option value="hotel">Hotels & Resorts</option>
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
              <option value="closed_won">Closed Won</option>
              <option value="closed_lost">Closed Lost</option>
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

          {/* Contacts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('company')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>COMPANY</span>
                      {sortField === 'company' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONTACT</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOCATION</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRIORITY</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('potentialRevenue')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>POTENTIAL REVENUE</span>
                      {sortField === 'potentialRevenue' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-yellow-100"
                    onClick={() => handleSort('lastContact')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>LAST CONTACT</span>
                      {sortField === 'lastContact' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(contact.type)}
                        <span className="text-gray-900">{getTypeLabel(contact.type)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{contact.company}</div>
                        <div className="text-gray-500">{contact.contact} - {contact.title}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{contact.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                        {contact.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(contact.potentialRevenue)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(contact.lastContact)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Linkedin className="w-4 h-4" />
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

export default OutreachPage; 